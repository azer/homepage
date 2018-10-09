---
title: "iA Writer Mode for Emacs"
desc: "Making Emacs look and feel like iA Writer when editing documents"
image: https://c2.staticflickr.com/2/1935/43239104260_4a26ceb627_b.jpg
imageHeight: 500px
hideImage: true
date: "2018-10-02T16:00:00.000Z"
path: "/journal/ia-writer-mode-for-emacs"
---

![](https://cldup.com/i5wC48wnpx.gif)
<span class="img-alt">Emacs, as an iA Writer competitor this time :)</span>

Before switching back to Linux, I had used [iA writer](https://ia.net/writer) quite often in my Macbook Air. It's an excellent product that does one thing: helping you focus on what you think. I enjoyed it a lot, although it'd save my documents to iCloud (or Dropbox), and it doesn't work in Linux.

In Linux, Emacs is my home for writing. I put all my notes in two Git repositories; one private, and one [public notebook](https://github.com/azer/notebook). Anything important that I can't remember is a Markdown file. It's like my mind's hard drive.

Recently, I wanted to change my Emacs configuration just for Markdown files, so I can have similar experience with iA Writer. Here is the outline of the changes that got Emacs to look like it was born to be an iA Writer competitor:

* Define a mode-hook for `markdown-mode`, so our changes will only apply to markdown documents.
* Use different font family and size in markdown-mode.
* Center the content
* Turn off line numbers
* Increase line-spacing

Let's look at these changes individually;

# writing-mode

We'll define a function that will be triggered whenever we want to enable it. Here is an empty function and a hook for `markdown-mode`:

```lisp
(defun writing-mode ())
(add-hook 'markdown-mode-hook 'writing-mode)
```

# Custom Fonts

It makes more sense to use different font family and font size for taking notes. We can use the same font with iA Writer as they [open sourced their font](https://github.com/iaolo/iA-Fonts).

Personally, I preferred a simple "Sans" font that existed in my system. If you're a Linux user, you can list the available fonts by running:

```bash
$ fc-list : family
```

Once you selected the font, you can set custom font family and size like in the following example:"

```lisp
(defun writing-mode ()
  (interactive)
  (setq buffer-face-mode-face '(:family "dejavu sans mono" :height 150))
  (buffer-face-mode))
```

You might probably want to check if your changes was applied. Open a random Markdown document, enable `writing-mode` and run `describe-char` command to see what font is being used in the document.

# Centering

I tried various modes that allows centering the content, [writing-room mode](https://github.com/joostkremers/writeroom-mode) worked best. We'll just enable it whenever `writing-mode` is called:

```lisp
(defun writing-mode ()
  (interactive)
  (setq buffer-face-mode-face '(:family "dejavu sans mono" :height 150))
  (buffer-face-mode)
  (writeroom-mode 1))
```

# Final Version

On top of these general changes, I made some personal additions such as turning off line numbers, making cursor blink, etc.

Below is the final version that I came up with. ([Github Copy](https://github.com/azer/spacemacs-files/blob/master/writing-mode/funcs.el#L3)):

```lisp
(defun writing-mode ()
  (interactive)
  (setq buffer-face-mode-face '(:family "dejavu sans mono" :height 150))
  (buffer-face-mode)
  (linum-mode 0)
  (writeroom-mode 1)
  (blink-cursor-mode)
  (visual-line-mode 1)
  (setq truncate-lines nil)
  (setq-default line-spacing 5)
  (setq global-hl-line-mode nil)
  )
```

Optionally, you can tell Emacs to use `markdown-mode` in `*scratch*` to bring up the writing mode easily:

```lisp
(setq initial-major-mode 'markdown-mode)
```

That's all. Feel free to share your recommendations with me by [e-mail](mailto:azer@roadbeats.com).

![](https://c2.staticflickr.com/2/1935/43239104260_4a26ceb627_b.jpg)
