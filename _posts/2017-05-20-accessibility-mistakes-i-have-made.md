---
layout: post
hidden: true
title: "Yes, I make accessibility mistakes too"
description: ""
comments: true
---

Many people think I'm an 'expert' in accessibility, but the fact is, I make mistakes all the time. This is a list of just some of those mistakes.

Okay, why am I *really* writing this? For three reasons. The first reason is to underline the fact that we are all just human and we all make mistakes. My second reason is to help foster an environment where developers feel free to admit mistakes, so that they can seek help, and improve. My third reason is to educate others so that they are less likely to make the same mistakes.

## Skipnav (and not actually testing)

This one sounds like a no-brainer, but can actually be kind of complicated. A 'skipnav' is a link placed at the very top of the page that points to the main content area of the page. Thus when a keyboard-only user activates it, they skip the site header which can otherwise be very repetitive. We had a 'skipnav' on a site for a long time, and I just assumed that it worked because it was an internal link to the main content area, and clicking on it caused the browser to scroll to the target. However, after testing it with a keyboard, it was obvious that focus was not actually being moved to the main content, instead the browser was just visually scrolling to the main content. Any keyboard-only user would still have to tab through 20 or more links to get to the most important part of the page.

This was due to browser bugs, which [are being addressed](https://bugs.chromium.org/p/chromium/issues/detail?id=37721). My solution involves putting a `tabindex="-1"` attribute on the main content area (which says 'this element is pragmatically focusable, but shouldn't be in the tab order) and calling `document.querySelector('main').focus();` when the skipnav is activated. We will probably continue with that solution until users have had a chance to update their browsers. 

In case you are not familiar with skipnav, here are some helpful resources:

* [skipnav on Webaim](http://webaim.org/techniques/skipnav/)
* [skipnav on a11yproject.org](http://a11yproject.com/posts/skip-nav-links/)

## Focus outlines

Focus outlines are vital because they indicate what is currently focused. Without this information, a keyboard-only user might lose track of where they are on a page. Imagine a list of 10 links, none of which have a focus outline. Now imagine trying to tab though that list and activate the 7th. It will be pretty hard if you can't tell where you are. I've often found myself working on a project when I discover an element has somehow lost its focus outline. Often this is due to the collaborative nature of many people working on a site, or it was an unexpected side effect of something else I have changed.

I'm also guilty of applying an outline to *everything* that is focusable, including elements that don't natively support focus (see the previous skipnav section as an example). In some cases, it isn't important to display the focus outline. Long story short: everything has edge cases and it can hurt to assume otherwise.

## Attribute over-use

Before I knew any better, I often put attributes on elements just because I saw other people do it. I did not bother to understand exactly what effect that attribute would have, or think about the possible negative ramifications. I was ignorant and that hurt visitors. An example of this might be adding a `title` attribute to a link with the same text that is already in the link. According to the [HTML AAM standard](https://www.w3.org/TR/html-aam-1.0/#a-element), that text would then be read twice by screen readers.

## Focus management

Focus management can be hard. Where do I send the user after they click the button to open a model? Where do I send them after the model closes? In some cases, I did not send focus anywhere because I was not even thinking about focus management. In other cases, I would send focus to the wrong element, thinking I was doing the right thing but actually making the experience worse.

I quickly learned to rely on the [aria authoring practices](https://www.w3.org/TR/wai-aria-practices/) to decide when and how to handle focus.

## Rolling my own

Yes, I rolled my own version of existing HTML elements and did not bother thinking about the consequences. In one case, I had a `div` that acted as a button, but I never gave it a button role. So the semantics of the element being a button were never exposed to screen readers (there was no indication that the element was interactive). I'm guessing many screen reader users missed a good portion of that page.

## Focusing too much on screen readers

I'm convinced that when most people hear 'accessibility', they immediately jump to 'screen readers'. I'm certainly guilty of doing that. The problem is, screen readers are only one part of accessibility. Inclusive design is also about hearing, low-sight, color blindness, cognition, motor control, and so much more. When I focus singularly on screen readers, I'm ignoring entire groups of people.

## Forgetting that I'm not an expert

This one is key. Sometimes, I find myself thinking 'well it is obvious X is the solution because X has worked in the past'. Well no, that might not be the case. Our industry is constantly changing and moving forward. Just because something was true yesterday, does not mean it is true today. It might not work anymore, or there might be a better way of doing it. Because of that, I never let myself think I'm an expert, and I always try to stay on top of what is changing.

## Forgetting to test

Almost all of these points lead to the fact that I sometimes forget to manually check my work. I forget to test it with only a keyboard (no mouse), I forget to run it though a screen reader, I forget to invite people to try it and give feedback. Perhaps the single most important thing I can do, is to manually test my work before I publish it.
