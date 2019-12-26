---
layout: post
title: "Making a site"
description: ""
headline: "It can't be that hard, can it ?"
category: blog
tags: [DevOps, coding, blog, boring]
image:
  feature: 6412587595_02456817d9_z.jpg
comments: false
mathjax: false
---

## DevOps

Part of the strategy of developing the
[Africa-Arabia Regional Operations Centre](http://www.africa-grid.org) is being
able to define most of the services which comprise it in software - ie do things
the "DevOps way". I first started working on this since 2013 and have been
slowly adding and testing functionality with collaborators. The part that we
really need - orchestration of grid and HPC services - is probably the least
developed part, and this is a bit of a failure in my opinion, so I'm going to
focus on that.

The goal is to be able to orchestrate a local cluster, with the UMD middleware
configured on it, with access for the right VO's and properly configured to use CODE-RADE.

We have a small Open Nebula cluster at Meraka which we use to host a few
services and do some dev work. I use it heavily for developing the Ansible code
we put into the [AAROC DevOps Repo](https://github.com). I wanted to bring this
site up so that we could start testing various things such as the user
onboarding, adding new VO's and most importantly, using the products of
[project CODE-RADE](http://ci.sagrid.ac.za). However it's just taking _so damn
long_ to get properly working.

## In a perfect world

In a perfect world, you'd have two sets of files to edit and you'd be done -

- `inventory` : the names and attributes of your machines
- `group_vars` : the variables which make your site _yours_ (passwords, etc)

The rest of the complexity is supposed to be removed thanks to the playbooks,
which orchestrate services on your machines in the context of the variables you
have defined. The philosophy is to separate out the development of services and
their proper configurations from the actual operations of those services -
DevOps, yo.

Har har har.

## In the real world

In the real world, some schmuck has to actually write - and more importantly
test - all that code that magically and properly orchestrates things in the way
you describe in your inventory. It's quite hard for one thing to write this code
_exhaustively_ and _very_ hard indeed to write proper tests for it. Well "hard"
is the wrong word; it takes a huge amount of time is all. But that doesn't mean
it shouldn't be done.

So, let's tell the story of getting the little Meraka dev cluster back to
working condition.

## Turnkey cluster

What we're trying to build is a small "HPC cluster":

- Head node with CREAM; Torque for job submisison and accounting, Maui for
  scheduling
- a few worker nodes with UMD middleware on them, configured to accept jobs from
  the head node
- NFS-shared home directories

My feeling is that this is the first "atom" of infrastructure in the grid that should be tackled.

## Footnotes

[podcasts^]: I'm listening to The Theory of Everything, 99 Percent Invisible,
Serial, The History of the English Language, The Truth, Song Exploder, Radiolab,
Mortified, Fugitive Waves and a few others...
