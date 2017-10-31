---
title: Monitoring Slow SQL Queries via Slack
desc: A simple Go recipe for getting notified about slow SQL queries, unexpected errors and other important logs.
image:  https://c1.staticflickr.com/5/4466/37053205213_2ee912141c_b.jpg
imageHeight: 400px
imageSize: cover
imageCaption: My Slack bot notifying me about a SQL query taking long time to execute. I should fix that soon.
date: "2017-10-15T07:00:00.000Z"
path: "/journal/monitoring-slow-sql-queries-via-slack"
---

**We can't manage what we don't measure**. Every backend application needs our eyes on the database performance.
If a specific query gets slower as the data grows, you have to optimize it
before it's too late.

As Slack has became a central to work, it's changing how we monitor our systems, too. Although there are quite nice monitoring tools existing,
it's nice to have a Slack bot telling us if there is anything going wrong in the system; an SQL query taking too long to finish for example, or fatal errors
in a specific Go package.

In this blog post, I'll tell how we can achieve this setup by using [a simple logging system](#logger),
and [an existing database library](#crud) that already supports this feature.

<a name="logger"></a>
# Using Logger

[logger](https://github.com/azer/logger) is a tiny library designed for both Go libraries and applications.
It has three important features useful for this case;

* It provides a simple **timer for measuring performance**.
* Supports **complex output filters**, so you can choose logs from specific packages. For example, you can tell logger to output only from database package, and only the timer logs which took more than 500ms.
* It has a Slack hook, so you can filter and **stream logs into Slack**.

Let's look at this example program to see how we use timers, later we'll get to filters, as well:

```go
package main

import (
	"github.com/azer/logger"
    "time"
)

var (
  users = logger.New("users")
  database = logger.New("database")
)

func main () {
  users.Info("Hi!")

  timer := database.Timer()
  time.Sleep(time.Millisecond * 250) // sleep 250ms
  timer.End("Connected to database")

  users.Error("Failed to create a new user.", logger.Attrs{
    "e-mail": "foo@bar.com",
  })

  database.Info("Just a random log.")

  fmt.Println("Bye.")
}
```

Running this program will give no output:

```bash
$ go run example-01.go
Bye
```

Logger is [silent by default](http://www.linfo.org/rule_of_silence.html), so it can be used by libraries internally.
We simply pass an environment variable to see the logs:

For example;

```bash
$ LOG=database@timer go run example-01.go
01:08:54.997 database(250.095587ms): Connected to database.
Bye
```

The above example we used `database@timer` filter to see timer logs from `database` package.
You can try different filters such as;
* `LOG=*`: enables all logs
* `LOG=users@error,database`: enables errors from `users`, all logs from `database`.
* `LOG=*@timer,database@info`: enables timer and error logs from all packages, any logs from `database`.
* `LOG=*,users@mute`: Enables all logs except from `users`.

<a name="sending-logs-to-slack"></a>
## Sending Logs to Slack

Logging in console is useful in development environment, but we need a human-friendly interface for
production. Thanks to the [slack-hook](https://github.com/azer/logger-slack-hook), we can easily
integrate the above example with Slack:

```go
import (
  "github.com/azer/logger"
  "github.com/azer/logger-slack-hook"
)

func init () {
  logger.Hook(&slackhook.Writer{
    WebHookURL: "https://hooks.slack.com/services/...",
    Channel: "slow-queries",
    Username: "Query Person",
    Filter: func (log *logger.Log) bool {
      return log.Package == "database" && log.Level == "TIMER" && log.Elapsed >= 200
    }
  })
}
```

Let's explain what we've done in the above example:

* **Line #5:** Set the incoming webhook url. You can get this URL [here](https://my.slack.com/services/new/incoming-webhook/).
* **Line #6:** Choose the channel to stream the logs into.
* **Line #7:** The username that will appear as sender.
* **Line #11:** Filter for streaming only timer logs which took longer than 200ms.

Hope this gave you the general idea. Have a look at [logger](https://github.com/azer/logger)'s documentation if you got more questions.

<a name="crud"></a>
# A Real-World Example: CRUD

One of the hidden features of [crud](https://github.com/azer/crud) -an ORM-ish database library
for Go- is an internal logging system using [logger](https://github.com/azer/logger). This allows us to
monitor SQL queries being executed easily.

## Querying

Let's say you have a simple SQL query which returns username by given e-mail:

```go
func GetUserNameByEmail (email string) (string, error) {
  var name string
  if err := DB.Read(&name, "SELECT name FROM user WHERE email=?", email); err != nil {
    return "", err
  }

  return name, nil
}
```

Ok, this is too short, feels like something missing here. Let's add the full context:

```go
import (
  "github.com/azer/crud"
  _ "github.com/go-sql-driver/mysql"
  "os"
)

var db *crud.DB

func main () {
  var err error

  DB, err = crud.Connect("mysql", os.Getenv("DATABASE_URL"))
  if err != nil {
    panic(err)
  }

  username, err := GetUserNameByEmail("foo@bar.com")
  if err != nil {
    panic(err)
  }

  fmt.Println("Your username is: ", username)
}
```

So we have a [crud](https://github.com/azer/crud) instance that connects to the MySQL database
passed through env variable `DATABASE_URL`. If we run this program, we'll see one-line output:

```bash
$ DATABASE_URL=root:123456@/testdb go run example.go
Your username is: azer
```

As I mentioned previously, logs are [silent by default](http://www.linfo.org/rule_of_silence.html).
Let's see internal logs of crud:

```bash
$ LOG=crud go run example.go
22:56:29.691 crud(0): SQL Query Executed: SELECT username FROM user WHERE email='foo@bar.com'
Your username is: azer
```

This is simple and useful enough for seeing how our queries perform in our development environment.

## CRUD and Slack Integration

Logger is designed for configuring dependencies' internal logging systems from the application level.
This means, you can stream crud's logs into Slack by configuring logger in your application level:

```go
import (
  "github.com/azer/logger"
  "github.com/azer/logger-slack-hook"
)

func init () {
  logger.Hook(&slackhook.Writer{
    WebHookURL: "https://hooks.slack.com/services/...",
    Channel: "slow-queries",
    Username: "Query Person",
    Filter: func (log *logger.Log) bool {
      return log.Package == "mysql" && log.Level == "TIMER" && log.Elapsed >= 250
    }
  })
}
```

In the above code:

* We imported [logger](https://github.com/azer/logger) and [logger-slack-hook](https://github.com/azer/logger-slack-hook) libraries.
* We configured the logger library to stream some logs into Slack. This configuration covers all usages of [logger](https://github.com/azer/logger) in the codebase, including third-party dependencies.
* We used a filter to stream only timer logs taking longer than 250 in the MySQL package.

This usage can be extended beyond just slow query reports. I personally use it for tracking critical errors in specific packages,
also statistical logs like a new user signs up or make payments.

### Packages I mentioned in this post:

* [crud](https://github.com/azer/crud)
* [logger](https://github.com/azer/logger)
* [logger-slack-hook](https://github.com/azer/logger)

[Let me know](https://twitter.com/afrikaradyo) if you have any questions or comments.
