---
layout: page
title: Writing list
permalink: /writing-list
---

<h1>Things I'd like to write about</h1>

<ul class="fa-ul">
{% for item in site.data.todo | sort :'date' %}
{% unless item.done %}
  <li><i class="fa-li fa fa-lightbulb-o"></i> <strong>{{ item.title }}</strong> - {{ item.description }}</li>
{% else %}
  <li><i class="fa-li fa fa-check-square-o"></i> {{ item.title }} - {{ item.description }}</li>
{% endunless %}
{% endfor %}
</ul>
