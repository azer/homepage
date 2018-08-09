---
title: "A Good Makefile for Go"
desc: "A refined Makefile to simplify building and managing web servers written in Go"
image: https://cldup.com/DPD9Lm2Xmf.jpg
hideImage: true
date: "2018-08-09T16:00:00.000Z"
path: "/journal/a-good-makefile-for-go"
---

I occasionally tweak my Makefiles to speed up my development process, this morning
was one of those times and I decided to share the result with others.

To summarize, I use Go for building servers and my expectation from a Makefile is as following:

* Simplicity.
* High-level, simple commands. Such as; `compile` `start` `stop`, etc.
* Managing project-specific environment variables. It should inclide `.env` file.
* Development-mode that auto-compiles on change.
* Development-mode that shows compile error without verbosity around it.
* Project-specific GOPATH, so I can keep dependencies in `vendor` folder.

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
 clean     Clean build files. Runs `go clean` internally.
```

# Makefile; step by step

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

Our first command will be `start`; it basically starts running the server on background, and watches for changes
in your files. It cleans up the background process if developer press `Control-C` to stop the main development mode process:

```makefile
start:
	bash -c "trap 'make stop' EXIT; $(MAKE) compile start-server watch"

stop: stop-server
```

If we look closer, `start` command compiles Go binaries, starts server and launches file-watcher.

## Compiling

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

## Starting/stopping Server

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

## Watching for Changes

We need a file watcher for watching for changes. I tried many of them and didn't feel satisfied, so ended up creating my own file watcher tool,
[yolo](https://github.com/azer/yolo). Install it in your system by;

```bash
$  go get github.com/azer/yolo
```

Once it's installed, we can basically start watching changes in the project directory, excluding folders like `vendor` and `bin`. Here it is;

```makefile
watch:
	@yolo -i . -e vendor -e bin -c 'make compile restart-server'
```

Yolo has a minimalistic interface that basically takes glob patterns for what to include (`-i`), and exclude (`-e`). If enabled, it can also
provide a web interface and you can see the build status or compile errors in a nicer screen like in the gif below:

![](https://camo.githubusercontent.com/3b39472e26f12a9b25c5f9eba6df44db6728fb43/68747470733a2f2f636c6475702e636f6d2f4730566d6d4d574d6e7a2e676966)

## Installing Dependencies

As we make changes in the code, we'd like missing dependencies to be downloaded before compiling. `install` command will do that job for us;

```makefile
install: go-get
```

It's basically an alias to `go-get` command. We'll implement all the internal Go commands in the next section.

## Running Go Commands

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

If you'd like to install a dependency manually, you can run:

```bash
$ make install get=github.com/foo/bar
```

The makefile will run:

```bash
$ GOPATH=~/my-web-server GOBIN=~/my-web-server/bin go get github.com/foo/bar
```

## Help

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

# Final Version

Here is the all combined & final version of what I've shared above. It's the exact copy from a new project that
I've started this morning:


```makefile
include .env

PROJECTNAME=$(shell basename "$(PWD)")

# Go related variables.
GOBASE=$(shell pwd)
GOPATH=$(GOBASE)/vendor:$(GOBASE):/home/azer/code/golang # You can remove or change the path after last colon.
GOBIN=$(GOBASE)/bin
GOFILES=$(wildcard *.go)

# Redirect error output to a file, so we can show it in development mode.
STDERR=/tmp/.$(PROJECTNAME)-stderr.txt

# PID files will help us manage process Ids
PID=/tmp/.$(PROJECTNAME)-api-server.pid
WATCH_PID=/tmp/.$(PROJECTNAME)-api-watch.pid

# Make is verbose in Linux. Make it silent.
MAKEFLAGS += --silent

all: help

## install: Install missing dependencies. Runs `go get` internally. e.g: make install get=github.com/foo/bar
install: go-get

## start: Start in development mode. Auto-starts when code changes.
start:
	bash -c "trap 'make stop' EXIT; $(MAKE) compile start-server watch"

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

watch:
	@yolo -i . -e vendor -e bin -c 'make compile restart-server'  -a localhost:9001

restart-server: stop-server start-server

## compile: Compile the binary.
compile:
	@-touch $(STDERR)
	@-rm $(STDERR)
	@-$(MAKE) -s go-compile 2> $(STDERR)
	@cat $(STDERR) | sed -e '1s/.*/\nError:\n/'  | sed 's/make\[.*/ /' | sed "/^/s/^/     /" 1>&2

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
shoot me e-mail! Cheers.
