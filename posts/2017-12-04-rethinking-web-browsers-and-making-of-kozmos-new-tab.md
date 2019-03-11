---
title: "Rethinking Web Browsers and Bookmarking"
desc: "Designing a better dialog between users and web browsers, with better bookmarking systems."
image: https://cldup.com/8tj3oyfR4E.png
imageSize: contain
imageHeight: 500px
date: "2017-12-03T16:00:00.000Z"
path: "/journal/rethinking-web-browsers-and-bookmarking"
aliasPath: "/journal/rethinking-web-browsers-and-making-of-kozmos-new-tab"
highlighted: true
highlightImage: https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80
highlightImagePosition: center center
highlightImageSize: cover
---

I've made number of web browsers in last 10 years. The oldest one was called "[Delicious Surf](https://github.com/azer/delicious-surf)";
it was a minimal, single-tab web browser that let me search my bookmarks very fast, with single key combination. It was only
available in Linux and required tiling window manager with tabbing view (like Xmonad) though. It also didn't
have any user interface (like you're always in full-screen mode), but Delicious Surf was more productive
than any other web browser because: **it was designed for helping the user find things, not for
sending the user to Google (or other search engine)**.

# Studying Users and Web Browsers

My later web browser making experiments targeted OSX platforms rather than Linux and I tried to accomplish
the same goal; **designing a web browser for making users find what they're looking for easier and faster**.
For example, the latest web browser I've made was called [Kaktüs](https://github.com/kaktus/kaktus) and it designed tabbing as a drop-down menu.

<div class="left">

  ![](https://cldup.com/qsYAu0F-ja.png)

  <span class="img-alt">Dropdown Tabbing in Kaktüs</span>
</div>

The Kaktüs experiment included bunch of user tests. I wanted to understand how I can save people's time
from visiting Google for reasons Google sometimes does the job, but there is at least 10-15 seconds of friction.
I did tests with friends, family members, young people and old people... At the end, it was too obvious that **people hate URLs and they
want a web browser that speaks the same language them**. When they type something that is not a URL,
web browsers take them to Google.

For millions of people, **the way to visit Facebook starts with googling it and ends with clicking the first result in Google,
among 16 billion other results**. People also go to their bank website by googling it instead of typing the URL.
It's a habit for millions of people and hackers are aware of how to benefit from it; you can replace the first Google result with an ad,
and most users won't even notice the difference. Users not only waste their time translating human language into URLs via Google search,
they occasionally get hacked and lose money because Google happily takes money from hackers who create ads for their phishing websites and don't even
notice what they've caused, especially in developing countries. Just this year, thousands of customers of several big banks in Turkey got hacked
by hackers putting phishing websites in Google ads. **This is the cost of relying on search engines rather than truly innovating the web browsers.**

# Designing Healthy Dialogs

**This is a dialog problem**.

Web browsers can't have intelligent dialogs with users because "they only speak the URL language".
Search engines know little bit of human language but they're a part of the problem, and we don't trust them.

For most people, **web browsers feel like visiting a foreign country** where they don't know the culture and they don't speak the language.
They don't know how to get what they want, who to trust. This creates an opportunity for middle man between the tourist and locals: Google.

One of the most urgent issues on web isn't an engineering challenge. **Good tech can help us browse the web faster, but if we design
slow dialogs, what is the point ?** We need designers to take initiative in the future of web and
build products that creates healthy dialogs between digital world and the users.

It took me months to process these thoughts. For a few months, I felt stuck and hopeless. Then some ideas
started popping out in my mind and eventually I found an idea that could help me start working on my goals.

# Starting Kozmos

Focusing on designing a simple and fast dialogs, we can build the web browsers that understand their users.
If we take bookmarking as a starting point and innovate it like it's 2017, it can lead us to the right place.
Now it's fair if you say; **who does need another bookmarking service ?**

Simply for two reasons;

* **Bookmarking is the best way to train our web browsers to know what we like.**
* **Existing bookmarking services don't do it right.**

I started working on [Kozmos](https://getkozmos.com) last April. It's a simple bookmarking platform, you click a heart button
in your web browser, and Kozmos saves that as a bookmark. If you open a page that you liked before; the heart
button looks "red" rather than grey. All your bookmarks are kept in an offline database in your web browser so
this can be done fast, even when Kozmos' servers are "down".

<div class="left">

  ![](https://cldup.com/7GhGLht7_O.png)
  <span class="img-alt">Personal feed in Kozmos</span>
</div>

When you open up Kozmos, you'll find your bookmarks nicely organized into categories, similar to a Pinterest feed but regular
web pages and photos/videos are separated into different columns. Behind the scenes, all bookmarks are also tagged by Kozmos,
so non-techie users can find their bookmarks easily without having to tag each bookmark. All your bookmarks are private,
noone see them. Web pages bookmarked by multiple people (7% of total) are available publich search though.

Currently Kozmos is under private beta and only lets people in with invitations. I started coding it last April and
launched first version in June, and so far we got 1600 users and 700k bookmarks. We already have a loyal group of users who love it and use it every single day,
and share their feedback with me, even help me for development voluntarily.

This motivates me to make further steps and create things that could improve people's life. For example;

# The New Tab

<div class="left">

  ![](https://cldup.com/jdIbjWStHg.png)
</div>

Kozmos' browser extension shows a beautiful search interface when our users open a new tab in their web browser.
In the middle of a wallpaper (it refreshes every day), they can type what they're looking for and perform an instant search within
their bookmarks, history in a few seconds.

Here is a little example. I want to listen one of my favorite songs; Diesel Fluid by Wu-tang. I found this song in Youtube and bookmarked 8 months ago.
I open a new tab, misspell the song title as "Dizel Fluid" (half Turkish / half English), Kozmos still brings it up as first result in the search.
**It takes 3 second** to open a song, without having to visit any middle website.

See it action in the video below:

<video src="https://cldup.com/6EUjMu-aRA.mp4" loop autoplay></video>


## The end of Typosquatting business

**Kozmos isn't just about bookmarking; it's about helping you find what you want faster and easier**.

That's why, the search box in the new tab behaves very similar to the URL bar of your web browser, except it's much smarter. It can offer you auto-complete
when you type a website name, even if you had a typo. This feature not only saves your time from Googling website names,
also protects you from visiting phishing.

In the video below, you can see how I misspell Amazon but Kozmos' search box offers me the right website.

<video src="https://cldup.com/d6bG2aCsrd.mp4" loop autoplay muted></video>

## Installation

If you haven't signed up yet, please [request an invitation in Kozmos' homepage](https://getkozmos.com).
Kozmos users can install or upgrade extensions from the [Extensions](https://getkozmos.com/extensions) page in Kozmos.

## How to use it ?

![](https://cldup.com/ud5NuawZfo.png)
<span class="img-alt">You can list your tags by searching for tag:{tag name}</span>

When you open a new tab, you'll see a search input and list of your frequently visited websites. It won't have wallpaper by default,
you can enable it from the settings.

I recommend you to open new tab using `Control-T` key-binding, then press `<tab>` button so you can focus on the search box.
You can use arrow buttons to make selection, press `<tab>` button to switch between sections; frequently visited sites, bookmarks, history etc...

# Final Words

Kozmos is still a little baby trying to grow and learn things about real world, so please share your feedback
with me through e-mail and show your support by sharing it with your friends.

Stay tuned :)
