---
title: "Building An Elm App From Scratch"
desc: "Basics of Elm language and building a simple app with it"
image: https://cldup.com/KhKz_t3P9Z.png
imageHeight: 500px
imageSize: contain
imageCaption: Building ListenParadise.org with Elm
date: "2018-05-16T00:00:00.000Z"
path: "/journal/building-an-elm-app-from-scratch"
---

# Intro

Before deciding to use Elm, I built projects with Redux and P(React). Although they're all good libraries,
building and maintaining JavaScript has always been not a pleasant experience. JavaScript programs are
so brittle. Although I've been programming it for 12 years, I feel like a stranger in the current

- no runtime exceptions
- beautiful error messages


Back in 2006, JavaScript was a simple, imperfect language. Despite its famous flaws, I was very excited about
building apps on web browsers. It's been 12 years though, and it feels like we should start benefiting from
the advances in programming language design in front-end projects, too.

I've been using Go in backend projects past 5 years, and have been
seeking and alternative for JavaScript in the frontend. Finally, I believe I found what I was looking for; Elm.
Just like 12 years ago when we began building first web apps, I'm excited again.

Back in 2012, a Harvard student named Evan Czaplicki thought that GUI programming doesn't have to be painful, and
designed a new, functional reactive programming language called Elm [as his thesis project](https://www.seas.harvard.edu/sites/default/files/files/archived/Czaplicki.pdf).
He also implemented this language and [shared with rest of the world](https://www.reddit.com/r/haskell/comments/rkyoa/my_thesis_is_finally_complete_elm_concurrent_frp/).
Elm gained some popularity since then, even inspired JavaScript community to build libraries such as Redux.
In this blog post, I'll introduce Elm to those who haven't heard yet, also tell how I built [a radio app](https://listenparadise.or) using it.

<div class="toc">

# Index of Contents

* [What is Elm ?](#what-is-elm)
  * [Example Code](#example-code)
  * [Why is it different?](#why-different)
  * [Tools](#tools)
* [Core Language](#core-language)
  * [Functions](#functions)
  * [Lists](#lists)
  * [Records](#records)
  * [Types](#types)
* [Making Apps](#building-app)
  * [A simple one](#simple-app)
  * [CSS](#css)
  * [Structuring Larger Apps](#structure)
* [Final Notes](#final-notes)

</div>

<a name="what-is-elm"></a>
# What is Elm?

Elm is a statically typed functional programming language specifically designed for building web apps.
[It's really fast](http://elm-lang.org/blog/blazing-fast-html-round-two), and got an excellent compiler that makes it possible to have no runtime errors.
There is no `undefined` or `null`. Its core language is minimalistic and simple that [you can walk through in half an hour](https://guide.elm-lang.org/core_language.html).

## Example Code

Before exploring Elm more in the further sections, here is a piece of Elm and JavaScript code.
Both code are identical; we define a function named `double`, it returns the double of given argument `n`.

<div class="code-comp">

```elm
-- Elm

double : Int -> Int
double n = n * 2

double 5
-- 10
```

```js
// JavaScript

function double (n) {
  return n * 2
}

double(5)
// 10
```

</div>

## Why is it different?

Elm is not an evolution of JavaScript, it's a complete replacement that improves GUI development holistically.
It simplifies a complex problem for us and makes GUI development an enjoyable experience, because
it's intentionally not an incremental improvement on top of the existing ecosystem.

**No runtime errors.** elm-make catches errors in your code in compile time and explains them beautifully.

Here is an example error message if we try to compile `double n = n * "2"`:

```
$  elm-make double.elm
-- TYPE MISMATCH ---------------------------------------------------- double.elm

The right side of (*) is causing a type mismatch.

2|            n * "2"
                  ^^^
(*) is expecting the right side to be a:

    Int

But the right side is:

    String

Hint: With operators like (*) I always check the left side first. If it seems
fine, I assume it is correct and check the right side. So the problem may be in
how the left and right arguments interact.

Detected errors in 1 module.
```

Elm

## Tools

Elm provides a standard toolset, so you don't have to spend hours bruteforcing third party tools until getting a basic setup work.

| Tool        | Desc                                                    | Standard | Community |
|-------------|---------------------------------------------------------|----------|-----------|
| elm-make    | Compiler                                                | ✓         |           |
| elm-package | Package manager. [Example Package](http://package.elm-lang.org/packages/rtfeldman/elm-css/latest)                     | ✓        |           |
| elm-format  | Code formatter. No config files, no minor style issues. | ✓        |           |
| elm-reactor | A local server auto-compiles elm files.                 | ✓        |           |
| elm-test    | Testing library widely preferred by community  |          | ✓          |
| elm-css | CSS library and compiler | | ✓ |
