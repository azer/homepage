---
title: "10 Linux Commands That Will Save Your Time"
desc: "Selection of Linux commands known for saving time"
image: https://cldup.com/HAaZ8e3tFa.jpg
imageSize: contain
imageHeight: 500px
imageCaption: "Chuck Close in his studio during the 70s"
date: "2018-08-13T00:00:00.000Z"
path: "/journal/10-linux-commands-that-will-save-your-time"
---

In this blog post, I'll share the Linux commands that saved a lot of my time when getting complicated tasks done. This is a personal list &mdash; I basically [selected them from my digital notebook](https://github.com/azer/notebook/blob/master/linux/useful-commands.md).  Hopefully it's useful for you as well. If you see anything that needs improvement please [send a pull request](https://github.com/azer/homepage)!

*P.S. Thanks [Mattia](http://mrzool.cc/) making corrections in this post.*

<div class="toc">

# Index of Contents

* [10. mount](#mount)
* [9. nl](#nl)
* [8. ufw](#ufw)
* [7. sort](#sort)
* [6. column](#column)
* [5. yes](#yes)
* [4. uniq](#uniq)
* [3. awk](#awk)
* [2. convert](#convert)
* [1. ffmpeg](#ffmpeg)
* [Bonus: slop](#slop)

</div>

# <a name="mount"></a> 10. mount

Are you one of those spending hours configuring NGINX to serve static websites
from your home folder? If you haven't met `mount` yet, then:

```bash
$ mount --bind ~/my-new-website /var/www
```

It could resemble `ln`, but it's quite different. The above command
basically binds a folder in your home directory to `/var/www`, which NGINX has
full access to, so the time spent on configuring NGINX user permissions is
saved for calling parents, taking walk in a nearby park :)

# <a name="nl"></a> 9. nl

`nl` adds line numbers to the beginning of lines. It skips empty lines by default, unlike `cat -n` or `less -N`:


```bash
$ nl foobar.py
1  print "Hello World!"
2  print "Hello Again"
3  print "I like typing this."
```

You can optionally apply more conditions, such as counting lines matching regular expressions.

# <a name="ufw"></a> 8. ufw

Uncomplicated Firewall (ufw) makes firewall configuration easier than exiting Vim. For example, you can allow a specific port to be accessible by any IP:

```bash
$ ufw allow 22
```

Or, if you want to allow only specific IPs:

```bash
$ ufw allow from $trustedIP to any port 22
```

# <a name="sort"></a> 7. sort

As the name suggests, this command sorts the content of a given file or files. Let's create an empty file with some numbers:

```bash
$ cat > foobar.txt
5 Foo
3 Bar
4 Qux
2 Quux
1 Span
```

`sort` will, by default, sort the input by the number found at the beginning of every line:

```bash
$ sort foobar.txt
1 Span
2 Quux
3 Bar
4 Qux
5 Foo
```

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
              <div class="button" onClick="document.body.querySelector('form.newsletter').submit()">Subscribe</div>
            </div>
          </div>
  </form>
</div>

# <a name="column"></a> 6. column

`column` is great for making command-line output less messy. Let's say your bash script has a `help` option, and it looks like this:

```
  $ cat help.txt
start: Start development mode.
stop: Stop development mode.
compile: Compile the binary.
```

It's hard to read that! We can add some spacing with `column`:

```bash
  $ column -t -s ':' help.txt
start     Start development mode.
stop      Stop development mode.
compile   Compile the binary.
```

# <a name="yes"></a> 5. yes

`yes` automatically approves all confirmations. This is quite useful
when you're automating some tasks that involve running commands that require confirmation, such as installations.

Here is an example:

```bash
  $ yes | pacman -S wtf
```

# <a name="uniq"></a> 4. uniq

Filters duplicate lines, as its name suggests. Let's create a file with duplicate lines first:

```bash
$ cat > file.txt
foo
bar
foo
qux
foo
qux
```

We can output the file without the duplicates, adding counts to the beginning of each line:

```bash
$ sort file.txt | uniq -c
1 bar
3 foo
2 qux
```

# <a name="awk"></a> 3. awk

Awk is a data manipulation language, and it's probably one of the most powerful command-line tools ever. In this post I'll only cover some basic use cases for it. For example, let's say we want to get the list of disks in our system:

```bash
  $  lsblk -l
NAME      MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
nvme0n1   259:0    0   477G  0 disk
nvme0n1p1 259:1    0   511M  0 part /boot
nvme0n1p2 259:2    0 476.5G  0 part /
```

This looks too verbose to my eyes. I only want to see the name and the size of the disks. `awk` can help me:

```bash
$ lsblk -l | awk '{print $1,$4}'
NAME       SIZE
nvme0n1    477G
nvme0n1p1  511M
nvme0n1p2  476.5G
```

In the example above, we asked `awk` to select and print the 1st and the 4th column with `'{print $1,$4}'`.

We can apply some conditions, too. Let's list the disks that are bigger than 250 GB:

```bash
$ lsblk -bl | awk '$4 > 268435456000  {p about `sloprint ;}'
NAME      MAJ:MIN RM         SIZE RO TYPE MOUNTPOINT
nvme0n1   259:0    0 512110190592  0 disk
nvme0n1p2 259:2    0 511572967424  0 part /
```

This time we filtered the 4th column in the output by checking if the value is bigger than 250 GB with `'$4 > 268435456000  {print ;}'`.

# <a name="convert"></a> 2. convert

`convert` is a powerful command-line image manipulation utility. You can get simple tasks done easily, like converting between formats, but this utility does more than that.

Here is an example: We downloaded a high-resolution wallpaper and want to scale it down to 2000 px, keeping its original proportions.

```bash
$ convert -scale 2000 ~/wallpaper.jpg  /tmp/wallpaper.png
```

Let's do something more complicated than just resizing: We'll add a black, transparent overlay on top of the wallpaper and write a Goethe's quote in the middle of it, just to make it look cool.

```
$ convert ~/wallpaper.jpg \
       -scale 1500 \
       -fill black -colorize 50% \
       -font System-San-Francisco-Display \
       -fill "#ffffff33" \
       -gravity center -pointsize 30 -annotate +0-200 'A man sees in the world what he carries in his heart. — Goethe' \
       result.jpg
```

Here is the result:

![](https://cldup.com/zOJAo9_hZJ.jpg)

# <a name="ffmpeg"></a>  1. ffmpeg

I remember spending hours looking for a simple audio or video editing tool when I was not using Linux. `ffmpeg` is one amazing command that can be used for editing both audio and video files.

For example, you could trim an mp3 file with it:

```bash
$ ffmpeg -i input.mp3 -ss 00:00:20 -to 00:00:40 -c copy output.mp3
```

The above command will simply create a new mp3 file between 20 (`--ss`) and 40 (`--t`) seconds. You could apply the same command to a video file, too:

```bash
  $  ffmpeg -i input.mp4 -ss 00:00:30 -t 00:00:11 output.mp4
```

`ffmpeg` can record video, too. If you wanted to record your screen to share with others, here is the command to do that;

```bash
$ ffmpeg -video_size 1200x600 -f x11grab -i :0.0 output.mp4
```

Let's explain the parameters above:

* `-f x11grab` selects the encoder. This is required.
* `-i :0.0`  selets the X server $DISPLAY, this is also required.

Optionally, we can choose a specific x/y value instead of the left/top of the screen:

```bash
  $  ffmpeg -video_size 1200x600 -f x11grab -i :0.0+250,150 output.mp4
```

How would you know the coordinates of where you want to point the left and top of the video though? `xdotool` has an option to output mouse location:

```bash
$ xdotool getmouselocation --shell
X=2096
Y=1353
```

This is not handy enough though. Check out `slop` below.

# <a name="slop"></a> slop

Someone who saw this article on HN recommended using [slop](https://github.com/naelstrof/slop) instead of `xdotool`, and I really liked it. `slop` basically lets you select a region in your screen, then outputs that region. Really cool:

```
$ slop
492x343+846+493
```

This is great. I created my custom screen recording command that first lets me select the part of the screen I want to record, and saves the result to `~/screenshots/{date-time}.mp4` in my system.

Here is the script:

```bash
#!/bin/bash
slop=$(slop -f "%x %y %w %h %g %i") || exit 1
read -r X Y W H G ID < <(echo $slop)
ffmpeg -f x11grab -s "$W"x"$H" -i :0.0+$X,$Y -f alsa -i pulse ~/screenshots/`date +%Y-%m-%d.%H:%M:%S`.mp4
```

The only limitation is, you need to interrupt the script to stop the recording. Check out [maim](https://github.com/naelstrof/maim) if you're interested in a screenshot command based on slop.

Hopefully this post had some commands that you found useful. You can share your feedback with me by [e-mail](mailto:azer@roadbeats.com), or [send a pull request](https://github.com/azer/homepage) if you think there could be some improvements!

Cheers.
