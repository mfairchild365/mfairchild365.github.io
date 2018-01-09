---
layout: post
title: "Spooky Browsers"
description: ""
comments: true
---

> Once upon a midnight dreary, while I pondered, weak and weary,
> 
> Over a quaint and curious repository’s lore -
>
> While I nodded, nearly napping, suddenly there came a clicking,
>
> As of a drive gently spinning, spinning on my server’s motherboard
>
> “'Tis some process,” I muttered, “taxing at my server’s motherboard-”
>
> “Only this and nothing more.”
>
> -
>
> Ah, distinctly I remember it was in the bleak December;
>
> And each separate headless browser wrought its ghost upon the core.
>
> Eagerly I wished the morrow;-vainly I had sought to borrow
>
> From the repo’s surcease of sorrow-sorrow from axe-core
>
> For the rare and radiant browser whom the angels named Chromium
>
> Headless here for evermore
>
> -- Me, with liberal use of the poem The Raven by Edgar Allan Poe

## Update 2018

Google released [puppeteer](https://github.com/GoogleChrome/puppeteer) after I first wrote this. Puppeteer is a headless version of Google Chrome, which basically renders Nightmarejs useless. I now recomend puppeteer over Nightmarejs for most tasks.

## Original post

Headless browsers have a bit of a storied and spooky history. Okay, not really. The developers just love to name them spooky things because they are "headless".

What is a headless browser you ask? Well, a headless browser is a web browser that does not have any UI, it just runs as a background process. How could a headless browser ever be useful? Well, there are many reasons. Personally, I use them for automated testing (accessibility and other things).

The other month, I was working on integrating the automated accessibility tool [axe-core](https://github.com/dequelabs/axe-core) into our website auditing tool. At the time we were using the industry heavy weight headless browser [Phantomjs](http://phantomjs.org/). It served us well, but we started to notice some pages taking an excessive amount of time to scan and stalling the scan queue. It was taking more than half an hour for axe-core to scan some pages, even with recent performance improvements in axe-core! The issue was that axe-core relies on a browser-level function `elementsFromPoint()` which Phantomjs is missing.
 
So, we switched to a headless browser called [Nightmarejs](https://github.com/segmentio/nightmare) which is based on Chromium, and the problem was fixed. I put together a proof of concept for how axe-core works with Nightmarejs in my [the Axe Nightmare repository](https://github.com/mfairchild365/the-axe-nightmare/). You will also be able to find details on how to install Nightmarejs on a CentOS server and run it on Travis-CI.

I learned a lot about headless browsers and automated testing from that experience, and I thought I'd share a bit of it.

## Methods of testing websites

Using a headless browser that is based on a modern rendering engine is **essential** for accurate testing. To explain why that is, lets look at some different methods of testing websites, in the specific context of accessibility testing.

### Option 1: Traverse the HTML source

While this is perhaps the easiest way, it is also the most primitive and error prone. With this method of auditing, you scan the unrendered source HTML of a page and look for accessibility problems. You might be able to catch problems like missing alt text or missing form labels. However, you would miss any contrast problems and any changes to the HTML structure of the page as altered by JavaScript and/or CSS.

### Option 2: Use a headless browser based on a custom rendering engine

By using a headless browser, you get the advantage of auditing a fully rendered page with HTML, CSS, and JavaScript executed. This is great! Now you can check for contrast with a high reliability and you are checking a page exactly as it would be rendered for the end user. Well sort of. Custom rendering engines are often missing certain features, contain bugs, and may not match what actual users would see. The better route is to use a rendering engine that is actually used in modern browsers, like WebKit (Safari), Blink (Chrome), or Gecko (Firefox).

### Option 3: Use a headless browser based on a modern rendering engine

As described above, I believe this is the best approach. It is important to realize however that there are differences between rendering engines and those differences can affect auditing, especially if your auditing tool does not account for the differences. For the sake of quick and reliable automated testing, I think this is the best approach.

### Option 4: Real browsers

[Selenium](http://www.seleniumhq.org/) is a tool which lets you automate real browsers, including Chrome, Firefox, Internet Explorer, and Safari. With this method you have the highest confidence that you are testing what an actual user would be seeing. However, Selenium also has its disadvantages, which I believe make it not the best choice for quick automated testing. It is a pain to configure and set up (however tools do exist to make it easier such as [webdriver.io](http://webdriver.io/)). Additionally, this method can also be hard to deploy on continuous testing environments such as [Travis-CI](https://travis-ci.org/). Moreover, I think the time spent configuring and setting up multiple browsers to be tested with Selenium would be better spent actually conducting manual accessibility audits, which you should be doing anyway. That is a story for another time.

It is worth noting that [webdriver.io](http://webdriver.io/) does also [allow testing with Phantomjs](http://webdriver.io/guide/services/phantomjs.html). So, in theory this would be a good method of automated testing which would also allow you to quickly test non-headless browsers with the same tests. However, this wouldn't work in my situation, because I needed to use a more modern headless browser than Phantomjs.
 
## What headless browsers are available?

There are quite a few headless browsers out there, each of which have their own advantages and disadvantages. I've put together a quick comparison for you using the ones that I know about.

| Browser | Rendering Engine | API Language |
| --- | --- | --- |
| [Phantomjs](http://phantomjs.org/) | WebKit (Safari) | JavaScript |
| [puppeteer](https://github.com/GoogleChrome/puppeteer) | Chrome | Node.js |
| [Nightmarejs](https://github.com/segmentio/nightmare) | Chromium via Electron (Chrome) | Node.js |
| [Slimerjs](https://slimerjs.org/) | Gecko (Firefox) | JavaScript |
| [Ghost.py](http://jeanphix.me/Ghost.py/) | WebKit (Safari) | Python |
| [Zombie](https://github.com/assaf/zombie) | custom | Node.js


I do want to take a moment to specifically compare Nightmarejs and Phantomjs. In my experience, Phantomjs has several disadvantages to Nightmarejs. Phantomjs is based on WebKit which has been lagging behind other rendering engines in recent years. Furthermore Phantomjs is slow to adopt new versions of WebKit. And finally, Phantomjs has a messy API, while Nightmarejs has a cleaner API which makes it easier to create tests.
  
Well, that is it for today. Happy coding y'all.

