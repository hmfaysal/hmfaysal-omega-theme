---
layout: post
title: "FutureGateway container"
description: "Building the Future Gateway Container"
headline: "Seems Ansible-Container isn't quite ready for primetime yet (Again)"
category: blog
tags: [work, projects, docker, Ansible, Science Gateway, fgAPI]
mathjax:
image:
  feature: cape-town.jpg
comments: false
---

## Move along

Sorry, internet - there's probably nothing of interest here for you to see. This is just me trying to remember and recall all of  the steps involved in building
the container for the [Future Gateway API Server](https://github.com/FutureGateway/fgAPIServer).

> What's that ?

Future Gateway is a set of APIs and tools which allows you to develop a web-based science gateway for distributed computing infratructure.
It consists of a web-facing API server, a tracking database and a set of libraries used to invoke SAGA.
The SAGA bit is currently implemented in java - specifically [jSAGA](http://software.in2p3.fr/jsaga/latest-release/index.html) (but don't ask, it's complicated) - so we need a tomcat container to handle the actual actions coming from the API server. More about that later...

## Ansible Container is not quite there yet

So, the original plan was to write something nice and easy with Ansible Container - I'm already using Ansible for basically everything else and I have actually written some of  the roles already. So, I was looking forward to a simple :

{% highlight yaml linenos %}
---
version: "1"
services:
  api-server:
    image: python:2.7
    ports:
      - "8888:8888"
    working_dir: '/tmp/apiserver'
    command: ['python','fgapipserver.py']
  gridengine:
    image: mysql:latest
    ports:
      - "8080:8080"
     command: ['java']
   db:
     image: ubuntu:trusty
     ports:
       - "3306:3306"
     command: ['mysql']
{% endhighlight %}

Except nooooo - it's way too complicated to pull in variables and roles into the ansible-container bits. So, we're going to make independent Dockerfiles, and then throw that :poop: together with Docker Compose.

## The containers

Here are some thoughts and notes on the actual containers.

### API Server

This container basically has to run python, since [the API Server](https://github.com/FutureGateway/fgAPIServer) is implemented as a flask application... for now; there are rumours that it will be re-implemented as a [Java application](https://github.com/FutureGateway/APIServer). Hm... :unamused:.

This shouldn't be too hard - just need to add the code itself and the relevant python dependencies, open the correct ports and set up the entry point.

#### _... brief interlude ..._

Ok, the API Server has probably been built ok.

* <span class="devicons devicons-github-large"></span> role repo : [brucellino/fgapiserver-role](https://github.com/brucellino/fgapiserver-role)
* <span class="devicons devicons-docker"></span> Docker container  : [AAROC/future-gateway-api-server](https://hub.docker.com/r/aaroc/future-gateway-api-server/)
