---
layout: post
title: "Question about web accessibility CSS standards, documentation, and expectations"
description: ""
comments: true
---

I was recently asked why some screen readers pause before reading the contents `<div>` elements, but not when the `<div>` has a CSS `display: inline` property.

The following are test cases for how screen readers handle `<span>` (inline) vs `<div>` (block, or group) content, as well as inline vs block CSS. I tested with VoiceOver and the results are shown below every test case. You can also [see these test cases rendered on my other page](/notes/div-space-question.html).

## Test 1: `<span>` followed by a `<div>`

```
<div>
    <span>Span Text</span>
    <div>Div Text</div>
</div>
```

Result: read as two paragraphs - "Span Text (pause) Div Text"

## Test 2: `<span>` inside the `<div>`

```
<div>
    <div>
        <span>Span Text</span>
        Div Text
    </div>
</div>
```

Result: read as one paragraph - "Span Text Div Text"

## Test 3: CSS Inline

```
<div>
    <span>Span Text</span>
    <div style="display:inline">Div Text</div>
</div>
```

Result: read as one paragraph - "Span Text Div Text"

## Why does this happen?

So, I think I understand why test 1 and test 2 do what they do. A [`div` is considered a 'group' element](https://www.w3.org/TR/html/grouping-content.html#the-div-element), while a span is not a 'group' element. Before the Screen Reader reads a new group element, it knows to pause (for example, before starting a new paragraph). You can also see this when using the Accessibility Inspector in MacOS.

However, when it comes to test 3, I was a little surprised. [CSS can have an affect on screen reader output](http://w3c.github.io/aria/accname-aam/accname-aam.html#step2F.ii), but I haven't seen anything in the standards about the CSS 'display' property. CSS is supposed to have only a minimal impact on the accessibility tree.

This leads me these questions:

* Is there documentation or a standard that describes when a screen reader should pause before continuing to another element?
* Is there documentation or a standard that describes the affect that CSS's 'display' property should have on screen reader output?

I've even asked around and so far I haven't found anything definitive. Please comment on this post if you have any resources to share.
