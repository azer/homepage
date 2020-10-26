---
title: "Why am I shutting down Kozmos?"
desc: ""
image: https://cldup.com/_wdrPegjtl.png
date: "2020-05-22T00:00:00.000Z"
path: "/journal/why-am-i-shutting-down-kozmos"
---

In this post, I'll tell the story behind why I'm shutting down [Kozmos](https://getkozmos.com), a project that I built with love, and a source of monthly passive income.

P.S: This will be also the story of how Google's Chrome Extensions team can continuously troll developers with take down notices based on false evaluations, and finally take down extensions anyways even if they don't violate any policies with no notice at all.

## Building Kozmos

Back in 2017, I built Kozmos as a result of an experimental web browser project, [Kaktüs](https://github.com/kaktus/kaktus). My goal was not just to build another bookmarking service, it was to make web browsing better by creating an alternative interface in the new tab screen.

There is two posts about this goal in this blog, feel free to check them out if you're interested;

* [Speed Dial and Link Collections in New Tab](https://kodfabrik.com/journal/speed-dial-and-link-collections-in-new-tab)
* [Rethinking Web Browsers and Bookmarking](https://kodfabrik.com/journal/rethinking-web-browsers-and-bookmarking)

**TLDR;** Kozmos is a service that provides you a new tab extension that works completely offline, stores all your information in your web browser, and finally syncs them up with Kozmos' servers, so you can access them anywhere.

## The Chrome Extension

Kozmos' Chrome extension only requires access to browser's tabbing API and also Kozmos' own website. It does not inject anything to other websites. It periodically syncs your bookmarks with its servers, without exchanging any other data. Furthermore, the [whole extension is open source](https://github.com/kozmos/browser-extensions), including the library that [syncs up your bookmarks to Kozmos](https://github.com/kozmos/likedb).

Besides of this, people who install Kozmos are the people who pay for it. So, it's not spyware. I never sold the data. I wanted to get some funding to grow it into the project I was actually dreaming about, however, got a lot of rejections from investors, and some offers weren't acceptable for me.

Anyhow, besides of the small group of users and myself, my wife also uses Kozmos since the beginning. The way Kozmos automatically categorizes and displays bookmarks was actually useful for her during pregnancy. Although it never took off, which I understand and accept, I was always  satisfied with it as it is. Letting it run wasn't costing me any time but providing value as a tool, in addition to some passive income. I thought it'd just keep going without interruptions, it was too wishful for the real world though.

## The Nightmare

Google's Chrome Extension team has been giving me a complete nightmare since last two years. They kept sending me robotic take-down notices although the extension was not violating any policies. I was able to deal with all these robotic take down notices by copy pasting my answers until a human being from Chrome extension team could see my answers, and realize that there was nothing wrong with Kozmos' extension.

Every single e-mail thread started by a take down notice would go like this;

- Google (Bot): We'll take your extension down
- Me: Hey, this must be a mistake
- Google (Bot): No mistake, review these policies, your extension violates one of them
- Me: It does not violate any of them, this is a mistake!
- Google (Finally human): Oh, sorry, a mistake.

Imagine having the same conversation, and starting it over and over from scratch every a few weeks. Robots can afford it, as they are good at repeating, but it was quite stressful for me as I had to deal with it besides of a full time job, being a father of a toddler. These e-mails became quite exhausting for me, and there was no way to stop them.

## The Final Touch

Finally, Google took Kozmos' Chrome Extension down a few months ago. This time, there was no notice e-mail at all. It was taken down, and there was no clear reason behind it, no notice, nothing. Google, a company that violates privacy of millions of people, took my hard work down without any explanation.

And when they did this, they could have accessed the e-mail threads of their team admitting that Kozmos' extension did not violate any policy but their bots actually made poor conclusions.

Obviously, Google doesn't care about the policies they wrote. They want to take down, they can take down.

And as a developer who actually worked hard to build software that respects people's privacy, there is no way to request Google to correct the mistake they made. You can't access any sort of contact information, you can't ask help, there is no support system, even though every developer is charged 5$ initial fee for publishing extensions.

## Moving On

Either I re-submit the extension to the market, deal with all these bullying executed by Google's idiotic algorithms until one day they take it down without any notice again, or, simply I just shut Kozmos down, as I don't have the resources to keep up with Google's Chrome Marketplace bots.

Thus, the project I built alone by programming the every single line of it, the project I organized community events for and made tens of embarrassing pitches about, the project I spent days shooting and editing videos to promote it will be completely gone.

Customers have got refunds since February, while the site is operating in fremium mode for them until the shutdown. Once the few users left download their backups and move to the next service, the site will be shutdown completely.

What's left for me is still more than enough anyways; all the learnings, the experience and of course, all the people I met thanks to making this project.

Finally. Here is a video I shot to promote Kozmos 3 years ago.

<iframe width="800" height="400" src="https://www.youtube.com/embed/BwMKHh6IXiU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Thanks for reading.
