---
title: The "in" operator in JavaScript
desc:
image:
date: "2008-03-23T07:00:00.000Z"
path: "/journal/the-in-operator-in-javascript"
---

Javascript 1.5 contains the in operator that checks only property names.
I can't figure out why Javascript returns the exact opposite of that other programming languages return on this operator.
Here is an example:

```
> var hello = ["bonjour","hola","saluton","selam"];
> "bonjour" in hello
false
> 1 in hello
true
```

Actually, we don't need to the in operator to check values of Array, we can use indexOf property to this action easily;

```
> var hello = ["bonjour","hola","saluton","selam"];
> hello.indexOf("bonjour")>-1;
true
> hello.indexOf("Hallo")>-1;
false
```

This operator available to checking object properties too but there are many way to check object properties already;

```
> var hello = { "french":"bonjour", "esperanto":"saluton", "turkish":"selam" };
> "turkish" in hello
true
> "german" in hello
false
> Boolean(hello["turkish"]);
true
> Boolean(hello["german"]);
false
```
