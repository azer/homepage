---
title: Lispy Fluent Interfaces In Javascript
desc:
image:
date: "2010-05-11T07:00:00.000Z"
path: "/journal/lispy-fluent-interfaces-in-javascript"
---

By inspiring from Lisp and the functional programming utilities came with Javascript 1.6, I’ve coded a new function to iterate arrays -especially for those containing DOM nodes- by providing an alternative fluent interface and chaining. Usage examples;

```
// log elements of an array
each( ['Hello','World'] )
  (console.log)

// disable all form elements passing additional arguments
each( document.querySelectorAll('input, select, textarea') )
  (setattr, 'disabled', true)

// apply header elements several dom manipulations
each(document.querySelectorAll('header'))
  (style, 'fontSize', '16px Arial,sans-serif')
  (style, 'background', '#ffff00')
  (style, 'padding', '3px')
  (add_class, 'Foobar')
  (add_event, 'click', function(){ alert('Hello World') })
```

Implementation of `each`:

```
// log elements of an array
each( ['Hello','World'] )
  (console.log)

// disable all form elements passing additional arguments
each( document.querySelectorAll('input, select, textarea') )
  (setattr, 'disabled', true)

// apply header elements several dom manipulations
each(document.querySelectorAll('header'))
  (style, 'fontSize', '16px Arial,sans-serif')
  (style, 'background', '#ffff00')
  (style, 'padding', '3px')
  (add_class, 'Foobar')
  (add_event, 'click', function(){ alert('Hello World') })
```

The function defined in the code above simply returns a function returning itself and taking a function with optional arguments to call it by passing the element being iterated and the optional arguments specified. Thus, the high-order-function I’ve pointed make the iteration chainable, as well.
