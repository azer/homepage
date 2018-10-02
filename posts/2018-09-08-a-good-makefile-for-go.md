---
title: "A Good Makefile for Go"
desc: "A refined Makefile to simplify building and managing web servers written in Go"
image: https://cldup.com/DPD9Lm2Xmf.jpg
hideImage: true
date: "2018-08-09T16:00:00.000Z"
path: "/journal/a-good-makefile-for-go"
---

![](https://cldup.com/4QDe06otkG.gif)

I occasionally tweak my Makefiles to speed up my development process, this morning
was one of those times and I decided to share the result with others.

To summarize, I use Go for building web servers and my expectation from a Makefile is as following:

* High-level, simple commands. Such as; `compile` `start` `stop` `watch`, etc.
* Managing project-specific environment variables. It should inclide `.env` file.
* Development-mode that auto-compiles on change.
* Development-mode that shows compile error without verbosity around it.
* Project-specific GOPATH, so I can keep dependencies in `vendor` folder.
* Simplified file watching. e.g `make watch run="go test ./..."`

And here is the typical directory layout I prefer:

```bash
.env
Makefile
main.go
bin/
src/
vendor/
```

Typing  `make` command in this file structure gives following output:

```
 $  make

 Choose a command run in my-web-server:

 install   Install missing dependencies. Runs `go get` internally.
 start     Start in development mode. Auto-starts when code changes.
 stop      Stop development mode.
 compile   Compile the binary.
 watch     Run given command when code changes. e.g; make watch run="go test ./..."
 exec      Run given command, wrapped with custom GOPATH. e.g; make exec run="go test ./..."
 clean     Clean build files. Runs `go clean` internally.
```

<div class="toc">

# Index of Contents

* **[1. Step-by-step](#step-by-step)**
  * [Environment Variables](#environment-variables)
  * [Develoment-mode](#development-mode)
  * [Compiling](#compiling)
  * [Start-stop-server](#start-stop-server)
  * [Watching for Changes](#watching)
  * [Installing Dependencies](#install)
  * [Go Commands](#go-commands)
  * [Help](#help)
* **[2. Final Version](#final-version)**

</div>

# <a name="step-by-step"></a>1. Step by step

## <a name="environment-variables"></a> Environment Variables

The very first thing we want from our `Makefile` to include the environment variables we define for our project.
So, here is our line #1:

```makefile
include .env
```

On top of the project-specific environment variables; we'll define some more; project name, Go folders/files, pid filepaths...


```makefile
PROJECTNAME=$(shell basename "$(PWD)")

# Go related variables.
GOBASE=$(shell pwd)
GOPATH=$(GOBASE)/vendor:$(GOBASE):/home/azer/code/golang # You can remove or change the path after last colon.
GOBIN=$(GOBASE)/bin
GOFILES=$(wildcard *.go)

# Redirect error output to a file, so we can show it in development mode.
STDERR=/tmp/.$(PROJECTNAME)-stderr.txt

# PID file will store the server process id when it's running on development mode
PID=/tmp/.$(PROJECTNAME)-api-server.pid

# Make is verbose in Linux. Make it silent.
MAKEFLAGS += --silent
```

In the rest of the Makefile, we'll be using especially GOPATH variable heavily. All our commands should be wrapped
with the project specific GOPATH, otherwise they won't work. This provides a clear isolation between our
Go projects, and brings some complexity. To make things easier, we can add an `exec` command that takes
executes any given command with custom GOPATH defined above.

```makefile
## exec: Run given command, wrapped with custom GOPATH. e.g; make exec run="go test ./..."
exec:
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) $(run)
```

This is not high-level enough though. We should cover some common cases with simple commands,
and only use `exec` if we're doing something not covered by the makefile.

## <a name="development-mode"></a> Development-mode

Development-mode should;

* Clean up the build cache
* Compile the code
* Run server on background
* Repeat the steps above when code changes.

It sounds simple, but gets complicated quickly, as we'll run server and file watcher at same time.
We need to make sure stopping properly before starting a new process, and also not to break
common command-line behavior like stopping when Control-C or Control-D is pressed.

```makefile
start:
	bash -c "trap 'make stop' EXIT; $(MAKE) compile start-server watch run='make compile start-server'"

stop: stop-server
```

Here is the problems above code solves:

* Compiles and runs server on background.
* Main process doesn't run on background. So we can interrupt when we want, using Control-C.
* Stops background processes when the main process is interrupted. We need `trap` mainly for this.
* Recompiles and restarts the server when code changes.

In the below sections I'll explain these commands in detail.

## <a name="compiling"></a> Compiling

`compile` command does more than just calling `go compile` in the background; it cleans up the error
output and prints the simplified version.

Here is how making a breaking change looks like in the command-line:

![](https://cldup.com/8xIml0Da_5.png)

```makefile
compile:
	@-touch $(STDERR)
	@-rm $(STDERR)
	@-$(MAKE) -s go-compile 2> $(STDERR)
	@cat $(STDERR) | sed -e '1s/.*/\nError:\n/'  | sed 's/make\[.*/ /' | sed "/^/s/^/     /" 1>&2
```

## <a name="start-stop-server"></a> Starting/stopping Server

`start-server` basically runs the binary it compiled in background, saving its PID to a temporary file.
`stop-server` reads the PID and kills the process when needed.

```makefile
start-server:
	@echo "  >  $(PROJECTNAME) is available at $(ADDR)"
	@-$(GOBIN)/$(PROJECTNAME) 2>&1 & echo $$! > $(PID)
	@cat $(PID) | sed "/^/s/^/  \>  PID: /"

stop-server:
	@-touch $(PID)
	@-kill `cat $(PID)` 2> /dev/null || true
	@-rm $(PID)

restart-server: stop-server start-server
```

## <a name="watching"></a> Watching for Changes

We need a file watcher for watching for changes. I tried many of them and didn't feel satisfied, so ended up creating my own file watcher tool,
[yolo](https://github.com/azer/yolo). Install it in your system by;

```bash
$  go get github.com/azer/yolo
```

Once it's installed, we can basically start watching changes in the project directory, excluding folders like `vendor` and `bin`. Here it is;

```makefile
## watch: Run given command when code changes. e.g; make watch run="echo 'hey'"
watch:
	@yolo -i . -e vendor -e bin -c $(run)
```

Now we got a `watch` command that watches for changes recursively in the project directory excluding `vendor` directory.
We can simply pass any `run` command we want. For example, `start` command basically calls `make compile start-server` when code changes:

```makefile
make watch run="make compile start-server"
```

We can use it for running tests, or checking if there is any race condition automatically. Environment variables will be set for the execution,
so you don't have to worry about GOPATH at all:

```makefile
make watch run="go test ./..."
```

A nice thing about Yolo is its web interface. If you enable it, you can see the output of your command in a web interface instantly.
All you need is to pass `-a` option to enable it:

```bash
yolo -i . -e vendor -e bin -c "go run foobar.go" -a localhost:9001
```

Then you can open `localhost:9001` in your browser and start seeing results in your browser instantly:

![](https://camo.githubusercontent.com/3b39472e26f12a9b25c5f9eba6df44db6728fb43/68747470733a2f2f636c6475702e636f6d2f4730566d6d4d574d6e7a2e676966)

## <a name="install"></a> Installing Dependencies

As we make changes in the code, we'd like missing dependencies to be downloaded before compiling. `install` command will do that job for us;

```makefile
install: go-get
```

We'll automate calling `install` on file change before compiling, so dependencies will get installed automatically.
If you'd like to install a dependency manually, you can run;

```makefile
make install get="github.com/foo/bar"
```

Internally, this command will be converted to;

```bash
$ GOPATH=~/my-web-server GOBIN=~/my-web-server/bin go get github.com/foo/bar
```

How does it work though ? See the next section where we actually add the Go commands that we use for implementing
the higher level commands.


<div class="zigzag"></div>
<div class="newsletter inline">
  <h1 class="rainbow">Finding this post useful?</h1>
  <h2>You should sign up my newsletter. I occasionally ping the subscribers about this kind of stuff.</h2>
  <form action="//roadbeats.us14.list-manage.com/subscribe/post?u=9fe3d3623b0c1f52fa42d45f3&amp;id=bdb32a67af" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
	          <input type="email" name="EMAIL" class="email" id="mce-EMAIL" placeholder="your@email.com" required />
            <div class="hidden" aria-hidden="true">
              <input type="text" name="b_9fe3d3623b0c1f52fa42d45f3_bdb32a67af" tabindex="-1" value="" />
            </div>
            <div>
              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button" />
            </div>
          </div>
  </form>
</div>

## <a name="go-commands"></a> Go Commands

As we want to set the GOPATH to the project directory to simplify dependency management which is still not solved officially in Go ecosystem,
we need to wrap all Go commands in the Makefile.

```makefile
go-compile: go-clean go-get go-build

go-build:
	@echo "  >  Building binary..."
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go build -o $(GOBIN)/$(PROJECTNAME) $(GOFILES)

go-generate:
	@echo "  >  Generating dependency files..."
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go generate $(generate)

go-get:
	@echo "  >  Checking if there is any missing dependencies..."
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go get $(get)

go-install:
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go install $(GOFILES)

go-clean:
	@echo "  >  Cleaning build cache"
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go clean
```

## <a name="help"></a> Help

Finally, we need a help command to see the overview available commands. We can auto-generate nicely formatted
help output using `sed` and `column` commands. See below:

```
help: Makefile
	@echo " Choose a command run in "$(PROJECTNAME)":"
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
```

The command below basically scans the Makefile for lines starting with `##` and outputs them. So, you can simply
comment the commands that you defined, and those comments will be used by the `help` command.

If we add some comments like below:

```makefile
## install: Install missing dependencies. Runs `go get` internally.
install: go-get

## start: Start in development mode. Auto-starts when code changes.
start:

## stop: Stop development mode.
stop: stop-server
```

We'll get:

```
 $  make help

 Choose a command run in my-web-server:

 install   Install missing dependencies. Runs `go get` internally.
 start     Start in development mode. Auto-starts when code changes.
 stop      Stop development mode.
```

# <a name="final-version"></a> Final Version

Here is the all combined & final version of what I've shared above. It's the exact copy from a new project that
I've started this morning:


```makefile
include .env

PROJECTNAME=$(shell basename "$(PWD)")

# Go related variables.
GOBASE=$(shell pwd)
GOPATH="$(GOBASE)/vendor:$(GOBASE)"
GOBIN=$(GOBASE)/bin
GOFILES=$(wildcard *.go)

# Redirect error output to a file, so we can show it in development mode.
STDERR=/tmp/.$(PROJECTNAME)-stderr.txt

# PID file will keep the process id of the server
PID=/tmp/.$(PROJECTNAME).pid

# Make is verbose in Linux. Make it silent.
MAKEFLAGS += --silent

## install: Install missing dependencies. Runs `go get` internally. e.g; make install get=github.com/foo/bar
install: go-get

## start: Start in development mode. Auto-starts when code changes.
start:
    bash -c "trap 'make stop' EXIT; $(MAKE) compile start-server watch run='make compile start-server'"

## stop: Stop development mode.
stop: stop-server

start-server: stop-server
	@echo "  >  $(PROJECTNAME) is available at $(ADDR)"
	@-$(GOBIN)/$(PROJECTNAME) 2>&1 & echo $$! > $(PID)
	@cat $(PID) | sed "/^/s/^/  \>  PID: /"

stop-server:
	@-touch $(PID)
	@-kill `cat $(PID)` 2> /dev/null || true
	@-rm $(PID)

## watch: Run given command when code changes. e.g; make watch run="echo 'hey'"
watch:
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) yolo -i . -e vendor -e bin -c "$(run)"

restart-server: stop-server start-server

## compile: Compile the binary.
compile:
	@-touch $(STDERR)
	@-rm $(STDERR)
	@-$(MAKE) -s go-compile 2> $(STDERR)
	@cat $(STDERR) | sed -e '1s/.*/\nError:\n/'  | sed 's/make\[.*/ /' | sed "/^/s/^/     /" 1>&2

## exec: Run given command, wrapped with custom GOPATH. e.g; make exec run="go test ./..."
exec:
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) $(run)

## clean: Clean build files. Runs `go clean` internally.
clean:
	@(MAKEFILE) go-clean

go-compile: go-clean go-get go-build

go-build:
	@echo "  >  Building binary..."
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go build -o $(GOBIN)/$(PROJECTNAME) $(GOFILES)

go-generate:
	@echo "  >  Generating dependency files..."
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go generate $(generate)

go-get:
	@echo "  >  Checking if there is any missing dependencies..."
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go get $(get)

go-install:
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go install $(GOFILES)

go-clean:
	@echo "  >  Cleaning build cache"
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go clean

.PHONY: help
all: help
help: Makefile
	@echo
	@echo " Choose a command run in "$(PROJECTNAME)":"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
```


That was it! If you have any questions, thoughts or some recommendations to make it better,
shoot me [e-mail](mailto:azer@roadbeats.com)!

Cheers.
