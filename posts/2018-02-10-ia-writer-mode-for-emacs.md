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

Recently I wanted to configure Emacs to be a nice text editor that helps me focus on what I'm writing. Before switching back to Linux, I used iA writer quite often in my Macbook Air. It's great as an editor, but saves to iCloud, and it doesn't work in Linux.

Instead of depending on the iCloud mess, I just use Git to maintain my private and [public notebooks](https://github.com/azer/notebook) where I write down and organize my markdown documents. Anything important that I can't remember, I just put it there. And I use Emacs for editing them.

Here is the outline of the changes that got Emacs to look like it was born to be an iA Writer competitor:

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

It makes more sense to use different font family for taking notes. In my system, the nicest sans font was "Dejavu Sans Mono" (Run `fc-list : family` to list available fonts in Linux):

```lisp
(defun writing-mode ()
  (interactive)
  (setq buffer-face-mode-face '(:family "dejavu sans mono" :height 150))
  (buffer-face-mode))
```

As you've noticed, I also set the font height to 150. I prefer higher font size just for the markdown mode.

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
