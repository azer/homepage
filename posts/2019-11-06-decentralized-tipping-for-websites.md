---
title: "Decentralized Tipping for Websites"
desc: "Proposal for a tipping system owned by nobody"
image: https://cldup.com/FG7_GZmjFu.png
hideImage: true
date: "2019-11-05T23:00:00.000Z"
path: "/journal/decentralized-tipping-for-websites"
---

Readers of my blog, or people who use my projects send me tips. It happens randomly, for example, someone sent me $20 for Happy Hacking Linux project, or another sent me $5 for just a blog post. I get an e-mail from Paypal, feel surprised, then look at my TODO list. At the end of it, there is "Unlock your Paypal account". Each time I look at my hopeless end of TODO list, and just hope to get there one day, so I can finally access the tips I've got via Paypal.

My motiviation to build [Kozmos](https://getkozmos.com) was to build tipping, or subscription systems based on bookmarking. For instance, you'd fill up your Kozmos account with some money, and Kozmos will distribute that to your bookmarks. How would Kozmos know how to pay which website? I thought about two ways;

* Website owners would manage their accounts in Kozmos
* Website owners would declare how to get paid via &#x3C;meta&#x3E; tags.

I no longer work on Kozmos actively, but decided to try implementing the second idea. I built a Chrome extension that lets people send money from their web browsers to the owner of the content they're viewing, via Ethereum protocol. In the other words, it's a simple wallet for Ethereum, built just for one purpose; tipping.

## How to receive tips?

If you're a website owner, all you need is to define how you need to get paid via meta tags, like in the example below:

```html
<meta name="wallet:currency" content="eth"/>
<meta name="wallet:address" content="0xa7Cc46D14E5c4Fa84F77fcCce98F36D1040B207D"/>
<meta name="wallet:title" content="Azer Koçulu"/>
<meta name="wallet:recommended_amount" content="0.1"/>
<meta name="wallet:description" content="I love building software, shooting photographs and writing."/>
<meta name="wallet:image" content="https://cldup.com/A-XFtZUANM.jpg"/>
```

That's all. It's probably a good idea to create a separate wallet for each project, to not publicize your personal wallet address. (Note that it could still be possible to track and find related wallets as transactions are public)

## How to send tips ?

I built a Chrome Extension that lets you create or access an Ethereum wallet where you can store money just for tipping, and tip websites directly from your website with a few clicks. Here is the screenshot;

![](https://cldup.com/6NvYSop4Ut.png)

## Install

Unfortunately, Chrome Webstore did not approve this extension, so installing it will take a few more steps.

Please note that it's experimental software, it hasn't been reviewed or audited, and you'll be on your own risk while using it.

* Download [latest release](https://github.com/azer/ethereum-tipping-wallet/releases/download/1.0/ethereum-tipping-wallet-v1.0.zip)
* Unpack the zip file
* Open "Extensions" in Chrome
* Hit "Load unpacked" in left top
* Point to the folder you've unpacked the file to.
* You should see a tipping icon in the browser menu.
* Click the tipping icon, create or restore your wallet
* Open this page, refresh
* Click the same icon again, you should see the tipping menu!

## Source Code

The source code is available at; [github.com/azer/ethereum-tipping-wallet](https://github.com/azer/ethereum-tipping-wallet)

Got some questions ? Check out the Q&A below, [drop me an e-mail](mailto:azer@roadbeats.com) if you still got any.

## Q&A

### Why did you build it?

To check if my idea is valid. To learn more about cryptocurrencies.

### Is it secure ?

It stores private keys in the browser memory. I'm not sure if it's safe? You can create a new wallet, if you don't feel comfortable to hook your existing wallet. I'm not responsible for any of your loss.

### Is it open source ?

Yes, [it's on Github](https://github.com/azer/ethereum-tipping-wallet) and you can contribute it easily.

### Is it centralized ?

It connects to Ethereum via hard-coded Infura node. So, it's not truly decentralized. I actually rolled out my own node but it just keeps crashing as Ethereum consumes a lot of system resources. I'm also not sure if this thing is worth spending hours, so, we'll see how everything goes.

### Will you maintain it ?

If it gets enough support, yes. If it doesn't, probably not.

### How are you going to make money?

If it's useful, you'll probably tip this page first. If it's not useful, then I won't make any money and move on to another project.
