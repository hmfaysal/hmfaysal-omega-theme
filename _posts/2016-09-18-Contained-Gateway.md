---
layout: post
title: "Contained Gateway"
description: "Bear with me here."
headline: "Working on containing the science gateway services"
category: blog
tags: [work, projects, docker, Ansible, Science Gateway, RASR]
mathjax:
image:
  feature: cape-town.jpg
comments: true
---

Ok, the goal is to have something that you can just deploy and have everything set up to accept and submit job executions. We're  not talking about the front-end, just the from the API-Server down.

The Future Gateway has been re-designed to separate the API front end from the SAGA-understanding back-end - at least this is the case for the current python-implementation of  the API. The events are tracked in a database (unfortunately - it would have probably been better to use a message-passing system, to deal with events). This means that we can deploy the stack using at the bare minimum two containers :

  * "web" container with the API
  * "db" container with the database.

Unfortunately the "web" container needs to be separated into two separate containers since one needs to run the flask application and the other the tomcat application with the GridEngine.

Setting up the stack should be as easy as creating and deploying the three containers. However, the next issue to face is actually _creating_ those three containers in an appropriately configurable way. The way the API server is created at the moment is, in my opinion, far too reliant on previous understanding of the software, prone to error and not conducive to testing. So... here  goes, I'm going to fix it.
