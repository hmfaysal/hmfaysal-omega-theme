---
layout: post
title: How Complex is OR
description: ""
headline: "Complexity where there appears to be none"
categories: technical
tags:
  - geeky
  - hardware
  - web-development
image:
  feature: "tijn-or10.jpg"
  credit: http://randomwraith.com/legopics/or10.jpg/
  creditlink: "http://randomwraith.com/legopics/or10.jpg/legopics/or10.jpg"
comments: false
mathjax: null
featured: false
published: true
---

So I alluded to this in my [About]({{site.url}}/constantijn-ramses-schepens/) page and figured I would start there. \<sarcasm> No better way to start a blog than on a light topic right? \</sarcasm> (As a foreigner living in the UK I just want to be fair to everyone, so I'm being explicit - the bane of being a programmer.) So lets dig right in, what is this confusion I am even hoping to discuss?

Starting from the top... _OR_, the common logical expression, gives a _true_ output when at least one of its inputs is _true_, otherwise it is _false_. (In hardware _true_ is equivalent to a voltage being applied or _1_, and _false_ is being grounded or _0_) This seems pretty straight forward right, how could this ever confuse me? Well, with a background in hardware I can explain this in language I am familiar with. It depends on whether you evaluate an expression sequentially or combinatorially (hint: JavaScript is sequential, physical logic gates are combinatorial). What does this mean? Let me illustrate.

Starting with sequential, this means statements are evaluated in a known, specified order. In JavaScript, the expression below is completely valid. If _variable_ is _undefined_ the second half of that _OR_ statement should throw an error, since you can't perform an operation on a non-existent variable. So why doesn't it? This is because it evaluates the first test first, and if it returns true the latter is never evaluated, as it knows the whole statement now has to be true. This means we are totally in the clear and we never try to do an operation on a variable that doesn't exist. Up until now, I would never have written a statement like this. To me, it just looked wrong. Combinatorial logic explains this.

{% highlight javascript %}

if( variable === undefined || variable === 0 ) {...

{% endhighlight %}

In combinatorial logic, things are evaluated in parallel, with no particular order. Take a physical OR gate, as illustrated below. It has two inputs, _A_ and _B_, and one output _Q_. This gate evaluates in real time. Just because you put an _undefined_ signal (in the case of hardware this would mean it was neither _1_ or _0_, very possible by just leaving the input disconnected) into _A_, this does not stop the gate from considering _B_. Just for completeness, this means that the output would also not be concretely defined as _1_ or _0_.

<figure>
  <a href="{{ site.url }}/images/tijn-or.gif"><img src="{{ site.url }}/images/tijn-or.gif"></a>
  <figcaption><a href="http://ram535ii.github.io/" data-toggle="tooltip" title="Visit my website">An OR Gate</a>.</figcaption>
</figure>

So with combinatorial logic, the JavaScript above would not have been valid because the second evaluation is impossible. The intended functionality would have been achieved using a nested if, luckily this is not necessary.

{% highlight javascript %}

if( variable === undefined ) {
  if( variable === 0 ) {...

{% endhighlight %}

It is obvious that a given paradigm changes the way someone sees the world or simply approaches a problem, but what this shows is that 'technical' is not a paradigm, there's more to it than that. Many may say this is obvious, but for me it was the first time that I saw that my hardware background did have an effect on the way I write software (it isn't the last time either, more of that looking forward). You just can't write JavaScript with the same mindset, you would System Verilog! This shows that logic is not just logic, it too is tainted by perspective. Oh just think of the potential implications outside of engineering, how many intense debates could be had, but that really is a discussion for another time!
