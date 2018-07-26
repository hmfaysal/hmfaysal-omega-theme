---
layout: post
title: "Ansible Style Guide in Action"
description: "Taking the Worker Node as a use case"
headline: "Step into the ring"
category: blog
tags:
  - Style Guide
image: 
  feature: wade-austin-ellis-672662-unsplash.jpg
  attribution: |
                         <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlitemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@wadeaustinellis?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Wade Austin Ellis"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Wade Austin Ellis</span></a>
comments: true
mathjax: false
---

# TL;DR We made a style guide -  this is how it works in practice.

A few weeks ago, I announced a [style guide](https://egi-foundation.github.io/ansible-style-guide) for developing Ansible roles.
The intended audience is the developers of middleware components[^AlsoEdgeComputing] and the aim of the guide is to improve or ability to collaborate, and to deliver products smoothly and reliably, without breaking the infrastructure in general.

A typical case would be an existing product which performs some specific function _e.g._, a storage management front-end service.
Another case would be the one I want to use as an example here - the so-called "worker-node" function.

The worker node is essentially a composition of clients which interact with infrastructure components... "*validate user token*", "*get data*", "*submit workload request to your local resource manager*", "*check how that's going*", "*send accounting data*", _etc_.
If we were starting out now, these functions might well be built as serverless endpoints, but as with all things infrastructure-related, one has to deal with the legacy of what came before.

The worker node function has typically been distributed as a meta-package in OS repositories - an RPM or DEB which expresses all of the necessary dependencies.
A site wishing to provide the worker node function could therefore easily ensure that this was present by simply _installing_ the metapackage.
That is, if the prerequisite state is assured.

That's a big if and a big ask in 2018.

## Building the worker node now

If we had the case of a totally new site in the federation wishing to participate by offering compute resources, we would probably want this site to be integrated and functional with a little demand on the site itself.
If we start from this position, we might well consider the site resources and the layer of middleware necessary to federate it as separated by a well-defined contract : We (federation) give you a bunch of endpoints to send data to, you (resource provider) send the data.
We'll go one step further and provide you with the functions which send that data, so that you have zero interference with your setup.

This separation of function from platform is why containers were developed.

## Modelling services

How would things be different, if we approached this from a [12 factor](http://12factor.net) point of view?
We have to deal not only with the _installation_ of binaries and other files, but also the _configuration_ of these, around site-specific setups, procedures and policies.
The last thing a product team wants to deliver to an endpoint which will eventually use it, is a product which doesn't play nicely with the rest of the environment.
This could include, for example, hard-coding certain paths, asserting the presence of particular users or, usage of the network in a specific way.
All of these would be examples of "bad behaviour", since the integration of the site into the federation is not done according to a central prescription, but according to an OLA agreed to by both parties.

We therefore need to deliver not only _products_, but also _strategies for deploying_ those products, which are flexible enough to respect local site policies.
If we are to be fluid, we also need a high degree of **trust** that the final result will not only perform as advertised (ie, works, and does what it needs to do), but also won't break local setups.

The only way to do this is ... to actually do it.

The Ansible Style Guide describes aspects of developing, testing, documenting and delivering the role.
It is more about _how_ than _what_, because the overriding, big-picture goal is to **solve problems and have them** _**stay solved**_.

The way to do this is, as with most engineering problems, to factor out the big problem into smaller ones in some logical way.
Doing things in this way, we come to have a sort of _"dependency tree"_ of roles, so that infrastructure engineers can separate problems and solve them permanently.

<figure id="ui">
<img src="{{ site.url}}/images/umd-ui.png">
<figcaption>
Figure 1: A simple representation of the dependency graph of Ansible roles for the UMD User Interface.
</figcaption>
</figure>
This has the happy consequence however that end users (typically, site administrators) can re-use these products with confidence at their site, know where to go for support and understand how to contribute back.
Looking at the simple case of building a User Interface, shown in <a href="#ui">Figure 1</a>, this is quite easy to understand.
We can even link the roles themselves to various actions and outputs as shown in [Figure 2](#ui-products).

<figure id="ui-products">
<img src="{{ site.url}}/images/umd-ui-outputs.png">
<figcaption>
Figure 2: Representation of the expression of the Ansible role and the resulting product - container images in <a href="https://quay.io/organization/egi/">EGI's Quay Organisation</a>. The vertical axis describes the dependency graph of the Ansible roles for UMD products, while the horizontal axis shows how these are expressed in various environments by applying them. The final products (container images in this case) are immediately re-usable.
</figcaption>
</figure>

In this way, we can continue modelling individual roles and map events in source code to artifacts in production. The final touches to our modelling flow are added in [Figure 3](#figure3), where we add the links to the respective GitHub repositories and the all-important testing phase - more on that in [a later section](#tests-and-development-of-roles).

<figure>
<img src="{{ site.url }}/images/>
<figcaption>
</figcaption>
</figure>
# Action



## Generate

```bash

ansible-galaxy init --role-skeleton=ansible-style-guide/egi-galaxy-template ansible-wn-role

```

Now for tests

```bash
molecule init scenario -r ansible-wn-role
```

## Initial Commit

At this point we have an empty (but stylish) role.
Tests should pass:

```bash

molecule converge

molecule verify
```

But this means absolutely nothing. We need to start adding some failing tests.


## Tests and Development of Roles

The EGI UMD follows a [ATDD](https://en.wikipedia.org/wiki/Acceptance_test%E2%80%93driven_development) pattern.
There are several 

[Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)

### Red

### Green


### Refactor

### Test Coverage

### Style guide controls


# References and Footnotes

[^AlsoEdgeComputing]: "Developers of middleware components" is a very EGI-federation-specific way of thinking of this audience. What I have in mind is maintainers or product owners who want their products to live in the EOSC ecosystem. Even products which may live at the boundary of this ecosystem may be relevant.
