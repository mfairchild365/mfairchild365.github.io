---
layout: post
title: "The Spooky Story of Headless Browsers"
description: ""
comments: true
---

> Once upon a midnight dreary, while I pondered, weak and weary,
> Over a quaint and curious repository’s lore -
> While I nodded, nearly napping, suddenly there came a clicking,
> As of a drive gently spinning, spinning on my server’s motherboard
> “Tis some process,” I muttered, “taxing at my server’s motherboard-”
> “Only this and nothing more.”
>
> Ah, distinctly I remember it was in the bleak December;
> And each separate headless browser wrought its ghost upon the core.
> Eagerly I wished the morrow;-vainly I had sought to borrow
> From the repo’s surcease of sorrow-sorrow from axe-core
> For the rare and radiant browser whom the angels named chromium
> Headless here for evermore
>
> -- Me, with liberal use of the poem The Raven by Edgar Allan Poe

Headless browsers have a bit of a storied and spooky history. Okay, hold up. What is a headless browser you ask? Well, a headless browser is a web browser that does not have any UI, it just runs as a background process. How could a headless browser ever be useful? Well, there are many reasons. Personally, I use them for automated auditing of websites.

* [phantomjs](http://phantomjs.org/)
* [nightmare](https://github.com/segmentio/nightmare)
* [slimerjs](https://slimerjs.org/)
* [casperjs](http://casperjs.org/) - not a headless browser, but more of an api to work with either phantomjs or slimerjs as a backend
* [Ghost.py](http://jeanphix.me/Ghost.py/) - webkit client
* [zombie](https://github.com/assaf/zombie) - nodejs, custom browser engine


points to make:
* purpose of headless browsers
* use cases
* the importance of the engine that is used behind the scenes
* some examples


