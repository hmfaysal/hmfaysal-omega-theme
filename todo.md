---
layout: page
title: Writing list
permalink: /writing-list
---

<h1>Things I'd like to write about</h1>

I often get <i class="fa fa-lightbulb-o"></i> ideas popping into my head. At the time they seem pretty urgent and sometimes even amazing ideas that I want to explore and write about. However, it's pretty tough to get anything <i class="fa fa-check-square-o"></i> done these days, for one reason or another. So, I keep my ideas here, so that I can come back to them every so often and see if maybe I can get around to writing about them.

<hrule>

<ul class="fa-ul">
{% for item in site.data.todo | sort :'date' %}
{% unless item.done %}
  <li><i class="fa-li fa fa-lightbulb-o"></i> <strong>{{ item.title }}</strong> - {{ item.description }}</li>
{% else %}
  <li><i class="fa-li fa fa-check-square-o"></i> <strong>{{ item.title }}</strong> - {{ item.description }} ({{ item.date | date: '%b %d, %Y'}})</li>
{% endunless %}
{% endfor %}
</ul>
