---
layout: post
title: "How should I do accessibility testing?"
description: ""
comments: true
---

This is a great question, and one that I am asked frequently. The problem is, there isn't a simple answer. You really need to do two things; automated and manual testing. But what do those look like?

Before reading this, it might be helpful to read my post on the [who, when, and what](/2017/05/23/who-when-what-of-a11y-testing) of accessibility testing.

## Automated testing

Automated accessibility testing is key for any developer. With automated testing, you can catch **common and objective problems** quickly before your code is ever released. I've worked on several automated accessibility testing tools, and maintain a system that audits hundreds of sites, so I feel qualified to talk about this subject.

What you should look for in an automated testing tool:

* It must test against an established standard (such as WCAG 2.0), and not some jumble of standards that the creator thinks is best
* It must have unit tests to back up the tests that it implements
* It must be under active development and have an established community (look for it on github if you are not sure)
* It must work on a DOM, with JavaScript and CSS taken into account. Assistive Technology does this, so your testing tool should too.
* It should help you fix problems rather than just report problems (education is key)
* It should be customizable to meet your unique needs
* It must have zero false positives (false positives only waste your time)
* It must be able to be integrated into your development workflow, so that problems are caught before they reach production.

That being said, what tool do I recommend? The answer is [axe-core](https://github.com/dequelabs/axe-core). Axe-core is open source, free, and meets every point I just described. If you would like to learn more, this is [a great video introduction to axe-core](https://www.youtube.com/watch?v=jC_7NnRdYb0&index=3&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g).

## Manual testing

Manual accessibility testing is also key, and something that very few people do. That MUST change. Why? Automated testing can only catch about 30% of accessibility problems. Everything else can be found via a manual check. Let automated testing find the objective problems, and do a manual test to find the subjective problems (and some objective problems that can't be found automatically for various reasons).

This is a partial list of what automated testing can't help you with:

* Does the accessible name and description actually make sense?
* Is the reading order logical?
* Are the semantics logical?
* Does keyboard functionality make sense?
* Is keyboard functionality actually implemented for custom controls?
* Do screen readers actually read this as expected (as opposed to what the standards say)?

To drive the point home. I have found my projects passing automated testing with flying colors, only to discover later that a screen reader choked on all of it.

So, how do you do manual test? Well, you can use automated testing to inform your manual tests (review items flagged as notices or for manual review). But really, the best thing you can do is to actually test your code in a real screen reader. You wouldn't publish content without testing it in a real browser first. So why would you publish content without testing it a real screen reader first?

Let's get this out of the way. Learning to use a screen reader as a developer can be a tedious task, with a steep learning curve. But, once you get the fundamentals, it will be worth while.

I recommend one of two screen readers, depending on your situation:

* VoiceOver for MacOS or iOS
* NVDA for windows

Both of these are free, and can be configured to help you as a sighted developer learn how to use a screen reader. I found it extremely useful to use what I called 'training wheels' when first using screen readers. You don't need any fancy hardware, and you don't need to blindfold yourself. Those two training wheels are:

1. A visual outline on the screen that indicates which element the screen reader is currently reading. Without this, it can be easy for a sighted user to get lost. It also helps pinpoint errors.
2. A visual output of the text that the screen reader is reading. The voice can often be hard to understand if you are not used to it. It can also be helpful to turn down the voice or mute it completely if you get overwhelmed.

Note that these are not just training wheels. Not everyone who uses a screen reader is 100% blind. In fact, many screen reader users can see the screen to some extent, so these tools exist to help them too.

### General information about screen readers

* Screen readers read the semantics of the page in addition to the text that is displayed. The semantics help convey the purpose of elements, as well as the potential effects of interacting with those elements. For example, a button is different than a link, in that a button activates dynamic content while a link will open a new url. This extra information can be overwhelming at first, but it is fundamental. 
* Screen readers read the page in DOM order, which might not reflect visual order. This can be confusing, so watch out for it.
* You can tab though interactive elements on the page and activate controls with space/enter.
* Screen readers also have their own set of controls for interacting with the page and jumping to certain elements. You don't need to know all of these controls at first. Take it slow.

### VoiceOver

Out of the box, VoiceOver comes with the two training wheels enabled by default.

To learn more:

* [Video introduction to VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&index=11&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
* [VoiceOver Keyboard Commands](http://webaim.org/articles/voiceover/)

### NVDA

NVDA does not support these training wheels out of the box, you can can turn them on.

1. Turn on the outline by downloading and installing the [Focus outline plugin](https://addons.nvda-project.org/addons/focusHighlight.en.html)
2. Turn on the Speech viewer by going to the NVDA in the system tray, clicking on Tools and then selecting Speech viewer.

To learn more:
* [Video introduction to NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
* [NVDA Keyboard commands](http://webaim.org/resources/shortcuts/nvda)


## Conclusion

Automated testing is only part of the battle. You MUST do manual testing too. Manual testing with screen readers can be intimidating at first, but some helpful training wheels might make it easier.

If I missed anything, or if you have any tips or tricks that helped you, please feel free to leave a comment. Let's make the world better, together.

