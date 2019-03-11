---
title: 10 Linux Commands Every Developer Should Know
desc: Less popular Linux commands that will make your life easier
image: https://cldup.com/DPD9Lm2Xmf.jpg
hideImage: true
date: "2017-10-08T07:00:00.000Z"
path: "/journal/10-linux-commands-every-developer-should-know"
---

<div class="left">

  ![](https://cldup.com/DPD9Lm2Xmf.jpg)
  <span class="img-alt">My setup. Happy Hacking Linux installed in a Macbook Air 2013.</span>

</div>

As a software engineer, learning Linux was the best time investment I've made. Since it's a system that user
has to understand and maintain, daily experience feels like adding a drop to the puddle. After long time,
the puddle becomes a lake, or even an ocean.

Today as a 30 years old engineer, I still benefit from little chunks of knowledge that I happened to learn years ago,
when I was an ambitious beginner. In [another blog post](/journal/pin-factory), I explain more about why Linux is more
pragmatic option for software developers.

In this blog post I'll share **less popular but very useful Linux commands** I personally use and recommend.
If you're on a Macbook, that's fine, because most of the commands I'll mention also exist in OSX.

# 10. file

Returns information for given file. For example, you can print the size information of an image:

`file logo.png`

Returns:
```
> PNG image data, 16 x 16, 8-bit/color RGBA, non-interlaced
```

# 9. iotop, powertop, nethogs

How would you monitor what's happening in a Linux system ? These three commands are life savers;

* `iotop`: Sorts processes by disk writes, and show how much and how frequently programs are writing to the disk.

* `powertop`: Lists processes by their energy consume. It's a vital command when you're outside, somewhere you can't charge your laptop.

* `nethogs`: Lists processes by their network traffic.

# 8. tee

It splits the output of a program, so we can both print & save it. For example, add a new entry to hosts file;

`echo "127.0.0.1 foobar" | sudo tee -a /etc/hosts`

# 7. pidof, kill and pkill

These three important commands help you control running programs in your system.

`pidof` prints out the process id of a running program. For example, below command will output the process ID of nginx:

`pidof nginx`

You can kill nginx by taking that number and giving to `kill` command:

`kill -USR2 $(pidof nginx)'`

`pkill` is a shortcut command that kills the process matching pattern:

`pkill -f nginx`

# 6. tmux

You gotta install tmux if you haven't yet. Tmux is an excellent window and session manager for your terminal.


# 5. tree

Lists contents of a directory in tree-like format. It has neat options like showing only directories;

`tree -d`

# 4. find

This command is a life-saver when we are looking for specific files around dozens of others.
I'll cover a few simple use cases of it here.

Example 1: List all CSS files (including subdirectories):

`find . -type f -name "*.css"`

Example 2: List all CSS or HTML files:

`find . -type f \( -name "*.css" -or -name "*.html" \)`

# 3. htop

Famous process monitor. It has a nice, colorful command-line UI.
Some useful keybindings:

* `\` Filter
* `/` Search
* `,` Choose sorting criteria
* `k` Send kill signal
* `u` Filter results by user
* `t` Open/close tree mode
* `-` and `+` Collabse / uncollapse selected process tree
* `H` Turn off displaying threads


# 2. chroot

Magicians love this command because it opens up a new TTY in given directory.
Which means, you can create a folder, set up a new Linux system inside, and switch to that "child system" whenever you want.

Isn't it powerful ?

# 1. dialog

A very simple and nice way to interact with the user on command-line. For example, this command below shows a nice input box:

`dialog --title "Oh hey" --inputbox "Howdy?" 8 55`

<div class="center-img">

![](https://cldup.com/3dGal0igLi.png)
</div>

It exists on both Linux and OSX systems, and supports many other kind of dialogs; message boxes, menus, confirms, progress bars...
The installation wizard I coded for [Happy Hacking Linux](https://kodfabrik.com/happy-hacking-linux) is made with this amazing command!
