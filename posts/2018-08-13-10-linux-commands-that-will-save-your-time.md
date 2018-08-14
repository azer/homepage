---
title: "10 Linux Commands That Will Save Your Time"
desc: "Less known, time-saver Linux commands"
image: https://cldup.com/HAaZ8e3tFa.jpg
imageSize: contain
imageHeight: 500px
imageCaption: "Chuck Close in his studio during the 70s"
date: "2018-08-13T00:00:00.000Z"
path: "/journal/10-linux-commands-that-will-save-your-time"
---

When a task takes more time than I expected, I find myself wondering if I'm not aware of the Linux command that could save my time there. This was a common case
when I was new in Linux world, and I remember spending hours
trying to solve problems using wrong tools. In this blog post, I'll share the Linux commands that saved a lot of time
when I get complicated tasks done.

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

</div>

# <a name="mount"></a> 10. mount

Are you one of those spending hours to configure Nginx to serve static website
from your home folder ? You haven't met `mount` yet, then;

```bash
$ mount --bind ~/my-new-website /var/www
```

It's could resemble `ln`, but it's quite different. The above command
basically binds a folder in your home dir to `/var/www` which nginx has
full access, so your time spent on configuring Nginx user permissions is
saved for calling parents, taking walk in a nearby park!

Thanks `mount` !

# <a name="nl"></a> 9. nl

`nl` adds line numbers to beginning of lines.


```bash
  $  nl foobar.py
1  print "Hello World!"

2  print "Hello Again"
3  print "I like typing this."
```

Notice that it doesn't count empty lines by default. You can optionally apply more conditions such as counting lines matching regular expressions. This is the main difference of `nl` and
`cat -n` and `less -N`.

# <a name="ufw"></a> 8. ufw

Uncomplicated Firawall (ufw) makes firewall configuration easier than exitting Vim. For example, you can allow a specific port to be accessible by any IP;

```bash
  $  ufw allow 22
```

If you want to allow only specific IPs:

```bash
  $  ufw allow from $trustedIP to any port 22
```

# <a name="sort"></a> 7. sort

As the name suggests, it sorts the content of given file(s). Let's create an empty file with some numbers:

```bash
  $  cat > foobar.txt
5 Foo
3 Bar
4 Qux
2 Quux
1 Span
```

`sort` will sort the input by the begining of line by default;

```bash
  $  sort foobar.txt
1 Span
2 Quux
3 Bar
4 Qux
5 Foo
```

# <a name="column"></a> 6. column

`column` is great for making command-line output less messy. Let's say your bash script has `help`
option, and it looks like as following:

```
  $  cat help.txt
start: Start development mode.
stop: Stop development mode.
compile: Compile the binary.
```

It's hard to read that! We can add some spacing with `column`:

```bash
  $  column -t -s ':' help.txt
start     Start development mode.
stop      Stop development mode.
compile   Compile the binary.
```

# <a name="yes"></a> 5. yes

`yes` basically automatically approves all confirmations. This is quite useful
when you're automating some tasks that involves running commands that requires confirmation,
such as installations.

Here is an example;

```bash
  $  yes | pacman -S wtf
```

# <a name="uniq"></a> 4. uniq

Filters duplicate lines as its name suggests.  Let's create a file with duplicate lines first;


```bash
  $  cat > file.txt
foo
bar
foo
qux
foo
qux
```

We can output it without the duplicates, adding counts to the beginning of line;

```bash
  $  cat file.txt | uniq -c
3 foo
2 qux
1 bar
```

# <a name="awk"></a> 3. awk

Awk is a data manipulation language, and it's probably one of the most powerful command-line
tools ever. In this post I'll only cover basic use cases of it, for example, let's say
we want to get the list of disks in our system;

```bash
  $  lsblk -l
NAME      MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
nvme0n1   259:0    0   477G  0 disk
nvme0n1p1 259:1    0   511M  0 part /boot
nvme0n1p2 259:2    0 476.5G  0 part /
```

This looks too verbose to my eyes. I only want to see the name of the disk, and the size. `awk` can help me:

```bash
  $  lsblk -l | awk '{print $1,$4}'
NAME       SIZE
nvme0n1    477G
nvme0n1p1  511M
nvme0n1p2  476.5G
```

In the example above, we asked awk to select & print 1st and 4th columns with `'{print $1,$4}'`.

We can apply some conditions, too. Let's list the disks that are bigger than 250gb:

```bash
  $  lsblk -bl | awk '$4 > 268435456000  {print ;}'
NAME      MAJ:MIN RM         SIZE RO TYPE MOUNTPOINT
nvme0n1   259:0    0 512110190592  0 disk
nvme0n1p2 259:2    0 511572967424  0 part /
```

This time we filtered 4th column in the output by checking if the value is bigger than 250gb, with `'$4 > 268435456000  {print ;}'`.

# <a name="convert"></a> 2. convert

`convert` is a powerful command-line image manipulation utility. You can get simple tasks such as converting between formats
done easily, but it does more than that.

Here is an example; we downloaded a high resolution wallpaper and want to scale it to 2000px, keeping its original proportions.

```bash
  $  convert -scale 2000 ~/wallpaper.jpg  /tmp/wallpaper.png
```

Let's do something more complicated than just resizing; we'll add a transparent & black overlay on top of the wallpaper,
and write a Goethe quote in the middle of the wallpaper, to make it look cooler.

```
  $  convert ~/wallpaper.jpg \
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

I remember spending hours looking for a simple audio or video editing tool when I was not using Linux. `ffmpeg` is one amazing
command that can be used for editing both sound and video files.

For example, you could trim an mp3 file with it:

```bash
  $  ffmpeg -i input.mp3 -ss 00:00:20 -to 00:00:40 -c copy output.mp3
```

Above command will simply create a new mp3 file from between 20 (`--ss`) and 40 (`--t`) seconds. You could apply the same command
into a video file, too:

```bash
  $  ffmpeg -i input.mp4 -ss 00:00:30 -t 00:00:11 output.mp4
```

`ffmpeg` can record video, too. If you wanted to record your screen to share with others, here is the command to do that;

```bash
  $  ffmpeg -video_size 1200x600 -f x11grab -i :0.0 output.mp4
```

Let's explain the parameters above:

* `-f x11grab` selects the encoder. This is required.
* `-i :0.0`  selets the X server $DISPLAY, this is also required.

Optionally, we can choose a specific x/y value instead of the left/top of the screen;

```bash
  $  ffmpeg -video_size 1200x600 -f x11grab -i :0.0+250,150 output.mp4
```

How would you know the coordinate of where you want to point left/top of the video though ? `xdotool` has an option to
output mouse location:

```bash
  $   xdotool getmouselocation --shell
X=2096
Y=1353
```

Hopefully this post had some commands that you found useful. You can share your feedback with me by [e-mail](mailto:azer@roadbeats.com).

Cheers.
