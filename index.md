---
layout: page
title: mfairchild365
---

Hi everyone. I'm Michael Fairchild and I think it is very nice that you are reading my blog. This is my 'professional' blog. What do I mean by that? Well, I mean that I will write about stuff I do at my job, from programming to accessibility to thoughts and ideas that may have nothing to do with code. You may or may not also see some less 'professional' writing, because lets face it, work life and personal life don't always have a clearly defined line separating them.

--

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
