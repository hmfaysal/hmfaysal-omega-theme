---
layout: post
title: "Citing Software"
description: "Why, how and what should you cite when you use software ?"
headline: "Citing Software"
category: blog
tags: [theprocess, blog, workopen, CODE-RADE, reproducibility, THOR]
image:
  feature: week2-2016.png
comments: flse
mathjax: false
---

## If you <i class="far fa-heart"></i> it, you should put a DOI on it

Some time ago, during a workshop in Nairobi looking at the discoverability of
scholarly communication in Africa, I made this silly meme :

<figure>
<img src="{{ site_url }}/images/put-a-doi-on-it.png">
<figcaption>
I was certainly not the only one to have made that tenuous connection between Beyonce.
</figcaption>
</figure>

Just to support the thesis that all good points can be made with judicious
application of musical references[^rhianna], this happened a few days ago :

<blockquote class="twitter-tweet" align="center" data-lang="en"><p lang="und" dir="ltr"><a href="https://t.co/fmzNqnDB57">pic.twitter.com/fmzNqnDB57</a></p>&mdash; Shit Academics Say (@AcademicsSay) <a href="https://twitter.com/AcademicsSay/status/696667688362340352">February 8, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Now, a "Citation" and a "DOI" are not the same thing, but they depend on each
other:

> **_you can't cite something if you can't uniquely identify it_**.

So, if you do something, and you think it will be useful in the future, it's
good scientific practice to give it a **persistent identifier**, like a
DOI[^doi]. This is so pervasive in scholarly literature that one hardly
considers it worth mentioning, however when that literature is redefined as to
include _software and tools_, then it's an entirely different story.

## What to cite

Software has become fundamental to the process of scientific discovery in many
fields and indeed software packages are often cited in literature which has used
them. However, the citation usually refers to the _writeup_ of the package, and
only in rare cases does the actual _source code_ get cited... almost never is
there a persistent identifier for the source code given as a citation. The
[Software Sustainability Institute](http://www.software.ac.uk) has a very good
green paper[^ssigreenpaper] entitled "How to Cite and Describe Software", with
several suggestions and tips of "how to cite the software which may have been
used in your paper".

The first of these tips is :

> Describe any software that played a critical part in, or contributed something
> unique to, your research.

Now, it may be up to the author, or up to the license of the software that the
author used to decide what software falls into that category. Some software
licenses may explicitly mandate the citation of the software if it was used at
all in the generation of new knowledge. Other software packages, such as
simulation packages make the choice obvious - without them, the paper could not
have been written, so clearly they should be cited.

At the other end of the scale, we could follow this argument _ad absurdum_ to
state that **every** piece of software used in the process should be cited. This
is clearly unreasonable - are we going to cite our
[text editor](http://atom.io)[^atom][^mhubot] ?

<figure>
<img src="http://imgs.xkcd.com/comics/real_programmers.png" href="https://xkcd.com/378/">
<figcaption>Are we going to cite the butterfly's brain?</figcaption>
</figure>

<!-- ## Citation and Acknowledgement

There is also a difference between _acknowledging_ a particular service and
_citing_ a piece of data or software; in the former case, the work has been
_supported_, by making available certain resources. In the former, the work is
citing prior art and telling the reader _"We used this exact thing to arrive at
our conclusions"_. A realistic usage of CODE-RADE would see

## Software and its expression

There is undoubtedly a middle ground where not only the version of the software
that was used, but the _explicit expression_ - _i.e._ the particular
configuration and compilation parameters, the particular execution on the
particular target site - of the software was responsible for the result which
was obtained. It is not too far fetched to expect that in most
cases[^montecarlo] that in order to reproduce the result, you will need access
to _both_ the source code _and_ the _expression_ of the source code. This
implies knowing how it was compiled, with which arguments it was executed and in
some cases even _where_ it was executed. There are several other factors which
may contribute to replicating a result (availability of input data, for example),
and reproducibility.

# Why

## Impact

## Replicability and Reproducibility

Chris Drummond, amongst others, has made the point that _"Replicability is not
Reproducibility: Nor is it Good Science"_[^replicationisnotreproduction]

# How

# What -->

# Footnotes and References

[^rhianna]: Actually, I'm so not hip to the pop scene, that I erroneously attributed the desire of ring-on-finger to Rhianna. My bad.

[^doi]: The DOI - Digital Object Identifier - is one of a few systems for uniquely resolving digital objects. It is based on the [ISO 26324:2012 Standard](http://www.iso.org/iso/catalogue_detail?csnumber=43506).

[^ssigreenpaper]: (http://www.software.ac.uk/how-cite-and-describe-software?mpw) of the

[^atom]: "Atom.io - the hackable text editor" https://github.com/atom/atom/releases/tag/v1.6.0-beta3

[^mhubot]: It turns out that the release of Atom that I was using to write this article was published by [a bot](https://github.com/mhubot). I don't think it's too far-fetched to have automated software generators being cited more often in the near future, or to cite datasets or discoveries which have been created by artificial intelligence.

[^montecarlo]: This perhaps the case for most, but not all applications. In particular, in the case of Monte Carlo simulations, this reproducibility would only be valid statistically. One may imagine also stochastic, or chaotic systems which by their very nature yield different answers every time they are investigated.

[^replicationisnotreproduction]:  Drummond, Chris. "Replicability is not Reproducibility: Nor is it Good Science." Proc. of the Evaluation Methods for Machine Learning Workshop at the 26th ICML , Montreal, Canada (2009)