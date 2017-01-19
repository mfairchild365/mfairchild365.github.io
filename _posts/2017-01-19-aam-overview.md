---
layout: post
title: "Overview of Accessibility API Mappings"
description: ""
---

Before I start, I should mention that I wrote this post in an effort to help me understand and learn about these standards and a high level. So what I say may not be 100% accurate.

There are several Accessibility API Mapping (AAM) standards out there. These documents describe how user agents (internet browsers) map content (html) to platform accessibility application programming interfaces (APIs).

So just to be clear, this is the (simplified) process of how web content makes it to the assistive technology (AT):

1. An author writes some code (HTML)
2. That code is retrieved and parsed by a user agent (Google Chrome)
3. The user agent uses the appropriate AAM standard to create and maintain an accessibility tree (alternate DOM with only information that is relevant to AT)
4. The accessibility tree is exposed via the platform (MacOS) accessibility API
5. The AT (Voice Over) then interacts with the accessibility API to retrieve information about the page
6. The AT reads the content to the end user

The other day, I was trying to figure out how exactly the accessibility tree is built, and discovered several AAM standards. At first I was a bit overwhelmed, but after some research this is what I discovered. Many of the AAM standards not only live and work in parallel, but there is also an inheritance structure to them.

* [CORE-AAM](https://www.w3.org/TR/core-aam-1.1/) (the base AAM standard, abstract and applies across multiple technologies such as HTML, JS, and CSS)
* [ACCNAME-AAM](https://www.w3.org/TR/accname-aam-1.1/) (extends CORE-AAM, has a better defined algorithm and notability includes more specific technologies such as CSS's `:before` and `:after` psudo classes)
* [HTML-AAM](https://www.w3.org/TR/html-aam-1.0/) (extends both CORE-AAM and ACCNAME-AAM, and is html5.1 specific, which defines specific algorithms for specific HTML elements, such as `<figure>`)

Why did I start to dive into these standards? The other day, someone asked me why [axe-core](https://github.com/dequelabs/axe-core) was returning an empty name for a piece of HTML like this:

```
<figure>
  <img src="#" alt="this is the alt text">
</figure>
```
At the time, I was only familiar with `accname-aam` standard and thought to myself, 'well thats weird, it should still return the `<img>` alt text'. After diving into the axe-core code, I discovered specific rules for specific HTML elements, which led me to the `html-aam` standard. So if you are just starting out and need a quick reference, the `html-aam` standard is probably the best place to start, and then work backwards to the `core-aam` standard.

I'd also like to take a moment to thank deque for open sourcing their axe-core library. Being able to dive into their code to determine exactly why something was marked as an error is extremely helpful in learning all of the intricacies related to web accessibility. 

The next steps for me will be to actually dive into each of these standards and read them from start to finish.
    
