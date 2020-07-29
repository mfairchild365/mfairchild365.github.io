---
layout: post
hidden: true
title: "Question about web accessibility CSS standards, documentation, and expectations"
description: ""
comments: true
---

I was recently asked why some screen readers pause before reading the contents `<div>` elements, but not when the `<div>` has a CSS `display: inline` property.

So, that begs to question, does the CSS 'display' property have an affect on accessibility API mappings?

The following are test cases for how screen readers handle `<span>` (inline) vs `<div>` (block, or group) content, as well as inline vs block vs inline-block via CSS. I tested with VoiceOver and the results are shown below every test case. You can also [see these test cases rendered on my other page](/notes/div-space-question.html). The element roles were found via Accessibility Inspector tool in MacOS.

## Test 1: `<span>` followed by a `<div>`

```
<div>
    <span>Span Text</span>
    <div>Div Text</div>
</div>
```

Result: read as two paragraphs - "Span Text (pause) Div Text". The `<span>` has the role of 'text' and the `<div>` has the role of 'group', and the text directly in the `<div>` has the role of 'text'.

## Test 2: `<span>` inside the `<div>`

```
<div>
    <div>
        <span>Span Text</span>
        Div Text
    </div>
</div>
```

Result: read as one paragraph - "Span Text Div Text". The `<div>` has a role of 'group', the `<span>` has a role of 'text', and the text directly in the `<div>` has a the role of 'text'.

## Test 3: CSS Inline

```
<div>
    <span>Span Text</span>
    <div style="display:inline">Div Text</div>
</div>
```

Result: read as one paragraph - "Span Text Div Text". The `<span>` and `<div>` both have the role of 'text'.

## Test 4: CSS Inline-block

```
<div>
    <span>Span Text</span>
    <div style="display:inline-block">Div Text</div>
</div>
```

Result: read as one paragraph - "Span Text Div Text". The `<span>` and `<div>` both have the role of 'text'. (same as #3)

## Why does this happen?

I think I understand why test 1 and test 2 do what they do. A [`div` is considered a 'group' element](https://www.w3.org/TR/html/grouping-content.html#the-div-element), while a span is not a 'group' element. Before the Screen Reader reads a new group element, it knows to pause (for example, before starting a new paragraph) or indicate a new block of text is being read. This makes sense to me, and [the HTML Accessibility API Mapping standard backs it up](https://www.w3.org/TR/html-aam-1.0/#el-div).


However, when it comes to test 3, I was a little surprised. [CSS can have an affect on screen reader output](http://w3c.github.io/aria/accname-aam/accname-aam.html#step2F.ii), but I haven't seen anything in the standards about the CSS 'display' property ([except for maybe display:none, covered by the hidden check in the accname-aam standard](https://www.w3.org/TR/accname-aam-1.1/#step2A)). I thought that CSS is supposed to have only a minimal impact on the accessibility tree and not assign or change roles.

This leads me these questions:

* Is there documentation or a standard that describes when a screen reader should pause before continuing to another element?
* Is there documentation or a standard that describes the affect that CSS's 'display' property should have on screen reader output?

I've even asked around and so far I haven't found anything definitive. Please comment on this post if you have any resources to share.
