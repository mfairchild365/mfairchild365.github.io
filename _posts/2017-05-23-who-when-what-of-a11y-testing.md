---
layout: post
hidden: true
title: "The Who, When, and What of accessibility testing"
description: ""
comments: true
---

## Who

Let's get this out of the way. Does an accessibility expert need to do the testing? No. The developer making the change should be doing the testing. Why? Because a model where a dedicated accessibility expert tests and fixes everything simply doesn't work. In that model, the developers won't learn to make code accessible from the start, and thus money will be wasted to fix it later. Instead, if you have a dedicated expert, they should be devoted to educating and helping the front line.

## When

When should you do the testing? Ideally, you should be testing while developing the code, but that isn't always practical. In my experience, it has worked just fine to do manual accessibility testing with a screen reader right after I have tested the code in a browser. Automated testing should also be integrated in your development workflow, ideally in a test suite that is run on every pull request or/and commit, with something like [travis-ci](https://travis-ci.org).

## What

What should be tested? Well, that is simple. Any code that will be in production should be tested regardless of the audience, because it is impossible to know exactly who will be consuming that code both now and in the future. A lot of people claim that internal websites and applications do not need to be accessible, because the employer knows the needs of its employees. Well, what about employees that do not choose do disclose a disability? What about employees that you might hire in the future? It is much easier to make something accessible from the start, than to fix it when you find out you needed it anyway.

## How

The 'how' deserves more details, so check out my other post on [how to do accessibility testing](/2017/05/21/how-to-do-accessibility-testing).

## Why

The 'why' also deserves more details, so check out my other post on the [why of accessibility testing](/2017/05/23/why-accessibility-testing).
