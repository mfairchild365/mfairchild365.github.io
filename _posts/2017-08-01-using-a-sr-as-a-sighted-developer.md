---
layout: post
title: "Using a screen reader as a sighted developer"
description: ""
comments: true
---

- "As a sighted web developer, should I test the stuff I make with a screen reader?"
  
  I've wrestled with that question my entire career. And I've landed on a solid 'yes'. But... there are some important caveats which I will detail in this post.
  
  As a sighted developer, do you test the stuff you make with multiple browsers before you publish it? I should hope so. Why then would you not also test it with a screen reader? The reason I avoided testing with screen readers for a long time was because I was scared of them. I knew how to interact with other browsers, but interacting with a screen reader was entirely different. Screen readers use keyboard commands instead of a mouse pointer. How am I supposed to memorize all of those commands? Screen readers speak *everything* out loud, even hidden things. Their verbosity can be downright overwhelming, and sometimes it can be hard to know whether or not it is being too verbose because of the way you coded something. Some screen readers change their keyboard commands depending on the kind of element you are interacting with, leaving you not knowing what to do. Some screen readers don't highlight what is currently being read on the page, leaving you guessing.
  
  All of those are honestly good reasons to be scared of screen readers. Using a screen reader is by nature, an entirely different way of perceiving the world. That sort of shift in thinking is very difficult. But, that is precisely why you should be familiar with screen readers. You don't have to be an expert screen reader, but you should know enough not to be scared of them. Having a little interaction with them will help you understand the different ways your content can be interacted with. It will help you understand why focus management, aria, labeling, and DOM order are so important, and so easy to get wrong. It will help you understand why using the correct semantic element is essential. It will help you know weather or not your aria widget is working as expected, rather than basing your implementation purely on a standard that you will never see in action (and might not be implemented by the screen reader). In the end, it will help you become a better developer.
  
  As a non-native screen reader user yourself, you will likely never be an expert at using screen readers. So, you probably shouldn't base any legal decisions off of your understanding of screen readers. Leave the legal compliance aspect of screen reader testing to expert users. But, by being familiar with, and testing with screen readers, you and many of your users will be better off. As time goes on, you will get better and better at using them. 
  
  As a developer, you make the barriers that prevent people from being able to use the stuff you make, whether you know it or not. HTML is accessible by default, but it is simply too easy mess it up. By caring enough to learn how to use a screen reader, and test with them, chances are you will be less likely to accidentally code a barrier into your site.

[Learn more about automated and manual accessibility testing](https://mfairchild365.github.io/2017/05/21/how-to-do-accessibility-testing)
