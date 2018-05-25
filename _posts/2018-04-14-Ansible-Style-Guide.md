---
layout: post
title: "e-Infrastructure Components that are Built to Last"
description: ""
headline: "Improving the reusability of infrastructure components"
category: blog
tags:
  - community
  - style
  - commons
  - TDD
  - DevOps
  - Infrastructure
image: 
  feature: kris-atomic-73939-unsplash.jpg
  attribution: |
                            <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px;" href="https://unsplash.com/@krisatomic?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Kris Atomic"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white;" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px;">Kris Atomic</span></a>
comments: true
mathjax: false
---

**TL;DR :loudspeaker: We have started work on an [Ansible Style Guide](https://github.com/EGI-Foundation/Ansible-Style-Guide). We hope it will address some of the waste in our community, and ultimately improve the quality of our infrastructure**

- [The dark art of turning computers into science](#the-dark-art-of-turning-computers-into-science)
  - [Keeping pace, together](#keeping-pace--together)
  - [Infrastructure as code](#infrastructure-as-code)
  - [Code as Community](#code-as-community)
  - [Contributing to the Commons](#contributing-to-the-commons)
  - [A guide, not a standard](#a-guide--not-a-standard)
- [Style guide in action](#style-guide-in-action)
  - [Reducing "Not Invented Here" Syndrome](#reducing-not-invented-here-syndrome)
  - [Improving re-usability](#improving-re-usability)
  - [Solving the problem at the source](#solving-the-problem-at-the-source)
    - [A better generator](#a-better-generator)
    - [Testing by default](#testing-by-default)
- [Summary](#summary)
- [References and Footnotes](#references-and-footnotes)

# The dark art of turning computers into science

Computing is pervasive in our modern society.
There is almost no aspect of education, research or business which is _not_ in some way dependent on IT infrastructures and services - indeed many are coming to rely on these *entirely*.

These infrastructures, which we have come to describe as **"e-Infrastructures"**, have to be _built_, and the way in which they are built and delivered informs aspects of their usability, fitness for purpose, scalability, sustainability, cost-effectiveness, and more.
There are many ways to describe what e-Infrasructures are[^ECDef], but I like to think of it as:

> **e-Infrastructures**: the dark art of turning computers into science.

The tricky thing about e-Infrastructures is that you can't build them in isolation!
Their value lies not in in their components, but in the _interaction_ between these components -- and the most important component in them has always been **people**.

Now, if we want to wield the magic that turns computers into science, we'd best do it at a pace which research itself requires, preferably without breaking things.
We've[^WhoIsWe] not been around long enough to see where "Move Fast and Break Things" leads eventually. Spoiler alert, it's not[^xkcd] good[^TheBook] (_ie_, everything is broken).

Based purely on my own experience however, infrastructures often lag behind the pace of development of their components.
This makes sense - there is always more rapid development at the edges of technology than at its centre.
It's called the "Bleeding Edge"[^BleedingEdge] for a reason, though: that's where most of the pain is!
There is perhaps a sweet spot in terms of proximity to the bleeding edge.
We want to move fast enough for infrastructures to adopt relevant new technologies (before communities get fed up with the slow pace and branch off on their own), but not so fast that we break things.

## Keeping pace, together

How can we balance the need for **change** with the need for **collaboration** and **co-operation** ?

I want to discuss one specific case here, specifically related to the smooth delivery of _e-infrastructure_ service components[^ServiceComponent].
What I'll describe here is a _style guide_ for developing the code which builds our services, and how that guide can be an expression of our operations methodology and our culture of collaboration, mutual support and desire to build something that our children will still be using.
I will be using the case of [Ansible](http://www.ansible.com) [roles](http://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_roles.html), but hopefully the points discussed here, as well as the later implementation, will be generic enough to cover other use cases too[^others].

## Infrastructure as code

The _"Infrastructure as Code"_ pattern [has come to some maturity recently](https://www.martinfowler.com/bliki/InfrastructureAsCode.html)[^IaC], but refers mostly to "Managing Servers in the Cloud".
What about "Managing the actual cloud" ?
Well, this may be well-covered by a similar pattern (or more precisely, job description) - the [**Site Reliability Engineer**](https://landing.google.com/sre/), or SRE[^SREBook].
To quote Google:

> SRE is what you get when you treat operations as if it’s a software problem

While we're a long way away from that, there is a quiet shift happening in the e-Infrastructure world.
There is a recognition that infrastructures are complex, interacting systems, but that these systems **can indeed be described by software**.

We do have a pretty good framework for managing services in EGI, based on a few industry standards.
These standards require certain procedures and documentation to be in place in order to comply with them,
and help to ensure that services are delivered in a consistent, reliable way to customers and peers in a
federation.

Compliance, however can be attained in many ways - the standards make few statements about _how_ requirements are met - only that they are.
This leaves a lot of room for interpretation, which is a good thing if the standard is to apply in  the widest possible set of cases.
However, that can also leave open the possibility for confusion and conflicting styles to take hold, with some negative consequences we describe below.

## Code as Community

Style is almost always a matter of opinion. As the old saying goes, there's no accounting for taste.
Modern configuration management tools use high-level languages such as YAML to describe what they do and how they do it, allowing developers and operators to communicate their work almost in plain English.
The great irony is that while this makes it easier for _individuals_ to read and write code, it can make it quite difficult for communities or even teams to do so, since individuals are prone to expressing their individual style.
Differences in style can be a really positive thing, allowing freer-thinking, more creativity and ultimately more satisfaction in working together, as long as there is consensus along broad lines
as to what constitutes good style, and more importantly _what constitutes bad style_.

**If a community is to truly be a community, the individuals which comprise it must have values and ideas in common, beyond what is required by the language, the framework and the standards adopted.**

Part of the security that comes with adopting a tool like Ansible[^CanNotMust] is the huge community that comes along with it.
The fact that it is in use in so many different environments, with so many different goals and usage patterns, is in a way a vaccine against bias.
This diversity can be channeled into some form of common understanding of what constitutes good style, and highlighting where the flexibility of the tool or language is being abused (as well as whether that abuse is justified).

Almost all languages have their linters[^ListOfLinters], and Ansible is no different.
There are in fact two different style checkers for Ansible:

  1. [`ansible-lint`](https://github.com/willthames/ansible-lint)
  2. [Ansible Review](https://github.com/willthames/ansible-review)

The jury is currently out on whether the latter is still alive, but given the tenfold ratio of almost all the metrics, I think it's safe to say that at the time of writing `ansible-lint` wins.

## Contributing to the Commons

In  a service federation like EGI, there is a strong temptation for individual service providers to develop these roles themselves -- a symptom of the ["Not Invented Here"](https://en.wikipedia.org/wiki/Not_invented_here) syndrome.
The barrier to creating these roles is particularly low, especially if we consider the case where the community using these roles is _empowered_ with solid knowledge of how the tool works.
Much of the impetus to "rediscover the wheel" derives from the quality and reliability of the _other_ wheels which have already been built.
Instead of a robust design for "a wheel", which can be re-used by anyone who wants to build a car, we end up with many flimsy wheels which just barely work.
This is clearly a suboptimal situation -- there is little to be gained by having such duplication of work, and the individual effort required to produce high-quality work is high.
It is, however, a situation which nevertheless persists in part due to the lack of **ownership** of the products created.

How then can we create useful bits of infrastructure _as a community_, where these things are owned by the community itself?
Ownership need not be restricted to the mere authorship of code - there are other ways to "own", for example **code reviews**, **bug fixes**, **contributing to the style guide**,  and of course **ownership through usage**, _i.e._ reporting issues, helping developers produce high-quality work, talking about the work at meetings, etc.

The main point here is that there are **many roles to play**, beyond the mere authorship of code, and each of them is important.

## A guide, not a standard

Finally, a style guide is **not a standard**. It can be _treated_ as one, but then it mostly ceases to offer the benefits of creativity described above.
A guide is most useful when it is the sincere expression of consensus, based on the experience of a community of practice, of a _better_ way of conducting an activity - not the _only_ way, nor indeed the _best_ way[^WhoKnows].
A guide should be more _descriptive_ than prescriptive - describing _how_ one should go about doing something rather than _what_ one should be doing.

We've hit this problem so many times that the time has come to address it.

# Style guide in action

**:loudspeaker: We have started work on an [Ansible Style Guide](https://github.com/EGI-Foundation/Ansible-Style-Guide)**.
We hope it will address some of the waste in our community, and ultimately improve the quality of our infrastructure

## Reducing "Not Invented Here" Syndrome

Let's say you're starting work on the development of a new role.
This could be either an existing service that doesn't have a configuration management repository, or
perhaps you're working on a whole new service.
The chances are that this role _already exists_ - but the only easy way to check that is to see if it's on [Galaxy](https://galaxy.ansible.com).
Let's see:

```bash
 ansible-galaxy search umd

Found 3 roles matching your search:

 Name            Description
 ----            -----------
 brucellino.UMD3 UMD3 repository for CentOS 6.x
 egi-qc.umd      UMD distribution repository deployment
 AAROC.UMD-role  Configures the Unified Middleware Distribution and Cloud Middleware Distrbution Stacks on your host
```

Uh-oh...

Ok - but middleware components will be there, right?
I'll save you a lot of frustration, dear reader - they are not.
This is not to say that a lot of work has not been done in our community in writing roles for "domestic use".
The tragedy is however that all this effort usually doesn't produce a result of sufficient quality and scope that it's reusable.
Now, this is usually a problem with the role metadata, meaning that either it's not enabled on Galaxy, or metadata doesn't parse properly - but a larger problem is when roles are written to be so specific to a given use case or site that they cannot be re-used elsewhere.

## Improving re-usability

For a role to be re-used, it has to be absolutely trustworthy, and this means putting some more effort into developing these infrastructure components, with a wider appreciation of it's benefit to the wider community.

Furthermore, 
All of these problems could be entirely avoided, and transparently to the developer, by slightly changing the environment and making the development process a little more frictionless.

## Solving the problem at the source

### A better generator

Ansible, like almost any good tool out there, provides a neat way to generate a skeleton for a new project: [`ansible-galaxy init`](http://docs.ansible.com/ansible/latest/reference_appendices/galaxy.html#create-roles).
It's clear that many of the roles for EGI infrastructure that have been produced so far have not taken advantage of this, from the missing directories, files, *etc*, but even those that _have_ been generated with Ansible Galaxy have conflicting or missing metadata[^Typical], resulting in them failing to show up in the Galaxy search.

**But why should we be fiddling about with metadata in the first place?**

In terms of the middleware, we only have a few options - these should be automatically added to the supported platforms in `metadata.yml`.
By the same token, if you're developing a piece of infrastructure, it's probably a good idea to have your role cover the possible platforms, and not just one specific option.

### Testing by default

Another sore point in re-use is knowing whether the role _actually works_.
Sure, the documentation can express the limits of what the role is designed for, but again we hit the bias implicit in the developer's mind.
The only way to know if a role really does what it says it does is:

- Apply it to various initial states.
- Make assertions on the final state.

This borrows a lot from the [Test-Driven Development (TDD)](https://www.agilealliance.org/glossary/tdd/) paradigm that Agilists know and love.
Which now begs the question:

> **Where are all the tests?**

There are two things we can do to improve both the re-usability of the role and the life of the developer:

  - Write the tests first
  - Generate appropriate test coverage along with the role skeleton

The former needs a whole post in infrastructure spec tests, which hopefully will come soon.
For the latter, we can easily include at least a default [testing scenario with molecule](http://molecule.readthedocs.io/), as well as a [`.travis.yml`](https://docs.travis-ci.com) so that the role can have continuous integration.


# Summary 

This won't solve _all_ of our problems and certainly doesn't _guarantee_ re-use of existing roles, but laying this groundwork and making it easy to write solid, widely-applicable roles will help. Infrastructure components should be reliable, do what they says they do, satisfy the needs of the community rather than the individual, and not introduce any vulnerabilities!

Stay tuned...

# References and Footnotes

[^xkcd]: See https://xkcd.com/1428/
[^TheBook]: See "Move Fast and Break Things: How Facebook, Google, and Amazon Cornered Culture and Undermined Democracy", by Jonathan Taplin
[^IaC]: See the book "Infrastructure as Code: Managing Servers in the Cloud", by Keif Morris, ISBN-13 9781491924358
[^SREBook]: See the Google [Site Reliability Book](https://landing.google.com/sre/book/index.html)
[^WhoIsWe]: I'm going to leave the question of "who are _we_ actually?" as an exercise to the reader. If you identify with what is written here, you're part of our community. If not, come on in - we probably have a lot to learn from each other!
[^WhoKnows]: I don't go so far as to say the "best" way, because for one thing that sounds like a strong opinion, and has the arrogance to assert that the current moment is special. Instead of instigating divisive opinions or hedging (by adding varied adjectives like "best known" or "current best"), I prefer to accept the position that what we lay out together through consensus will inevitably be incomplete, but will be better than what we have tried and failed at before.
[^ECDef]: Let's just go with the [EC description](https://ec.europa.eu/digital-single-market/en/e-infrastructures)
[^BleedingEdge]: Hayes, Thomas C. (21 March 1983). "Hope at Storage Technology". The New York Times. Retrieved 10 September 2013.
[^ServiceComponent]: See https://wiki.egi.eu/wiki/Glossary_V3#Service_Component
[^ListOfLinters]: A brief search threw up [@caramelomartins/awesome-linters](https://github.com/caramelomartins/awesome-linters) which more than illustrates the point, I think.
[^Typical]: Typically missing OS support, or using the wrong tags for the operating systems.
[^CanNotMust]: I don't mean to imply that this tool has been adopted by the _entire_ community, just that if people in our community _want_ to adopt it, then they can do so.
[^others]: For ruby-based tools like [Chef](http://chef.io) or [Puppet](https://puppet.com) the situation is actually way better. Chef for example has a very powerful [food critic](http://www.foodcritic.io/). Compared to Ansible Lint's few rules, Food Critic is way ahead with over 100.