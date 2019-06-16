---
title: "Decentralized Tipping for Websites"
desc: "A proposal for building a tipping system owned by nobody"
image:
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

That's all. It's probably a good idea to create a separate wallet for each project, so you won't leak your personal wallet addresses to public.

## How to send tips ?

That's totally up to what we make possible. We can build bookmarking sites, RSS readers, search engines, web browsers based on tipping.

To start small, I built a Chrome extension. I submitted it to Google Chrome store, it's under review. Until that, you can install the extension from the repo and try it out;

Github: [github.com/azer/ethereum-tipping-wallet](https://github.com/azer/ethereum-tipping-wallet)

Screenshot:

![](https://cldup.com/6NvYSop4Ut.png)

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
