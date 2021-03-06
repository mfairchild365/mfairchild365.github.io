---
layout: post
title: "Overview of Accessibility API Mappings"
description: ""
comments: true
---

Before I start, I should mention that I wrote this post in an effort to help me understand and learn about these accessibility standards from a high-level perspective. So what I say may not be 100% accurate, but I'm pretty confident in it.

## What is AAM and how it works

There are several Accessibility API Mapping (AAM) standards out there. These documents describe how user agents (internet browsers) map content (e.g. HTML) to platform accessibility application programming interfaces (APIs).

So just to be clear, this is the (simplified) process of how web content makes it to the assistive technology (AT):

1. An author writes some code (e.g. HTML)
2. That code is retrieved and parsed by a user agent (e.g. Google Chrome)
3. The user agent uses the appropriate AAM standard to create and maintain an accessibility tree (alternate DOM with only information that is relevant to AT)
4. The accessibility tree is exposed via the platform (e.g. MacOS) accessibility API
5. The AT (e.g. Voice Over) then interacts with the accessibility API to retrieve information about the page
6. The AT reads the content to the end user

The other day, I was trying to figure out how exactly the accessibility tree is built, and discovered several AAM standards. At first I was a bit overwhelmed, but after some research this is what I discovered. Many of the AAM standards not only live and work in parallel, but there is also an inheritance structure to them.

* [CORE-AAM](https://www.w3.org/TR/core-aam-1.1/) (the base AAM standard, abstract and applies across multiple technologies such as HTML, JS, and CSS)
* [ACCNAME-AAM](https://www.w3.org/TR/accname-aam-1.1/) (extends CORE-AAM, has a better defined algorithm and notability includes more specific technologies such as CSS's `:before` and `:after` pseudo classes)
* [HTML-AAM](https://www.w3.org/TR/html-aam-1.0/) (extends both CORE-AAM and ACCNAME-AAM, and is HTML specific, which defines specific algorithms for specific HTML elements, such as `<figure>`)

## Why understanding AAM matters

Why did I start to dive into these standards? The other day, someone asked me why [axe-core](https://github.com/dequelabs/axe-core) was returning an empty name for a piece of HTML like this:

```
<a href="the-url">
  <figure>
    <img src="#" alt="this is the alt text">
  </figure>
</a>
```

At the time, I was only familiar with `accname-aam` standard and thought to myself, 'well that's weird, it should still return the `<img>` alt text'. After diving into the axe-core code, I discovered specific rules for specific HTML elements, which led me to the `html-aam` standard. So if you are just starting out and need a quick reference, the `html-aam` standard is probably the best place to start, and then work backwards to the `core-aam` standard.

So what exactly is the problem here (in reference to the example HTML above)? Per the WCAG standard, a link (`<a href>`) must have an accessible name. However, the [HTML-aam standard has a specific algorithm for determining the accessible name of a `<figure>`](https://www.w3.org/TR/html-aam-1.0/#h-figure-element-accessible-name-computation). That algorithm basically says that a `<figure>` does not have an accessible name if it does not have one of an `aria-label` attribute, an `aria-labelledby` attribute, a `<figcaption>` child element, or a `title` attribute (which should always be avoided). The above example has none of those. So, relating this to a real world impact, **someone who is using a screen reader would not notice the link at all**. 

It is important to mention that **this case is not obvious** from just reading the HTML, WCAG, and WAI-ARIA standards. As a developer, you **have to also be familiar with the aam standards** to avoid situations like these, which is just one reason why automated accessibility tools such as axe-core are so valuable.

I'd also like to take a moment to thank deque for open sourcing their axe-core library. Being able to dive into their code to determine exactly why something was marked as an error is extremely helpful in learning all of the intricacies related to web accessibility. 

The next steps for me will be to actually dive into each of these standards and read them from start to finish.
    
