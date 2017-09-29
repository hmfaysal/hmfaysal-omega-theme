---
layout: post
title: Hacking the Boss
description: > 
              Some notes on building a slack bot to help out our team. (Part II)
headline: Born to run (Part II)
category: blog
tags:
  - bot
  - WIP
  - notes
image:
  feature: the_boss_cover.jpg
  attribution: null
comments: true
mathjax: false
discourse: true
---

# Walking before you're born to run

[Previously]({{page.previous.url}}), I wrote about how I'd really like to build a bot, and wrote down the basic steps to getting started.
I'm writing this next post to talk about what to do next... development could go in two directions : 

  * Flesh out the bot functionality
  * Make the bot more stable

At the moment, we have a pretty stupid bot : 
<figure>
<img src="{{site.url}}/images/the-boss-first-contact.png">
<figcaption>
Dude doesn't even have a face, yo !
</figcaption>
</figure>

## Be useful, dammit.

I need to get this guy to do useful stuff ! I'll have to remember to write a blog post about _what exactly_ we want the Boss to help us out with, but let's just say for now that **this ain't it**.
So, the way you get hubots to do things is you write a script for them to execute, based on certain triggers, typically things said in channels.
Fleshing out the functionality means thinking up and implementing these scripts. 

## Be reliable, dammit.

The other thing that we should recall is that this bot is currently running as a simple process on my laptop. It doesn't have system access, it doesn't have a reverse-resolvable name on the network, and when I shut my machine down this evening or whenever, to head back home, *poof*, he gone !
So, we need to make the bot stable.

# The 12 factor thing

Just to re-iterate what [12 Factor](http://12factor.net) has to say about how apps like this should be deployed : 

> - Use declarative formats for setup automation, to minimize time and cost for new developers  joining the project;
> - Have a clean contract with the underlying operating system, offering maximum portability between execution environments;
> - Are suitable for deployment on modern cloud platforms, obviating the need for servers and systems administration;
> - Minimize divergence between development and production, enabling continuous deployment for maximum agility;
> - And can scale up without significant changes to tooling, architecture, or development practices.

In order to respect 12factor and not suck, I need to put in place a declarative format for automation, as well as that automation, as well as making this bot deployable on "modern cloud platforms". 
To me, that means[^to_you]: 

  - Express the application in an Ansible role.
  - Write a playbook to actually express the role in context. 

## Expressing the app

In my mind, the bot is the combination of an **environment** and a specific **implementation** of a toolkit. 
The environment consists of the things that the bot needs to execute its functions[^human_environment], while the implementation is the bot's set of scripts. 

These can be factored out so that the bot can be put in a comfortable environment anywhere - meaning essentially that we need to write two roles : one for the bot and one for the environment.
The main reason for separating these is that the bot does not need system-level access (no escalated rights) to run, but it does require things that a sysadmin would need to install. 
By factoring out the environment from the bot, we could let the sysadmin apply the environment role, which would install the things like Node, NPM, Redis, _etc_, and have someone else apply the bot role that uses those prerequisites. 

As it turns out, I wrote the role bundling the environment and the bot together - it's easier to share variables at  the role level like that instead of at the inventory group level. 
The result is <span class="label label-primary"><i class="fa fa-github"></i > <a href="https://github.com/AAROC/DevOps/tree/master/Ansible/roles/the_boss">The Boss role</a></span>. This was actually an extension of [an existing hubot role](https://galaxy.ansible.com/brianshumate/hubot/) on Galaxy[^brianshumate].

It's not perfect, but it's a start. 

## Deploying the bot

I've set aside a machine to deploy this application on. This will hopefully host more than one bot, so the best thing to do would probably be to containerise the roles and put a container orchestration platform on the machine, like K8s or OpenShift. That, however, is a story for a different time. 

## Making the bot reliable
 
I mentioned before that we want the bot to start and stay up, and be always available. To do this, the Ansible role creates a systemd script 

{% highlight yaml %}
- name: Install systemd unit
  become: True
  become_user: root
  template:
    src: hubot.service.j2
    dest: /etc/systemd/system/hubot.service
    mode: "0755"
{% endhighlight %}

which is created from a template : 

{% highlight liquid %}
[Unit]
Description=Hubot

[Service]
EnvironmentFile={{ hubot_dir }}/{{ hubot_identity }}.env
User={{ hubot_admin }}
ExecStart={{ hubot_dir }}/bin/start-hubot

[Install]
WantedBy=multi-user.target
{% endhighlight %}

This clearly does  not make sense in a containerised environment - we would need something like [forever](https://www.npmjs.com/package/forever) to start the bot. We'd also have to think a bit clearer about how we want to bot to talk to functionality in other containers - the Redis service needs to be linked at a bare minimum. 

# Be awesome. Iterate.

Next up, we need to figure out the things that The Boss would need to help us out with. These can be implemented in a whole bunch of ways, but I'd like them to correspond more or less with the things that members of the team actually need to do. 
That will mean atomic contributions to the bot, to increase his brain function... if we keep it simple and focussed, we could hopefully build a reliable sidekick. That's a story for a different time. 


#  Footnotes

[^to_you]: This may mean other things to you. I'm in love with [Ansible](http://www.ansible.com)
[^human_environment]: For humans this would be things like air, water, food, a house, _etc_. 
[^brianshumate]:  :+1: @brianshumate