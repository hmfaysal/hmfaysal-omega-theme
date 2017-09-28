---
layout: post
title: The start of the Boss
description: > 
              Some notes on building a slack bot to help out our team.
headline: Born to run
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

# A bot to help our team get :poop: done.

Let's cut to the chase: getting things done requires a sidekick these days. 
I don't know about you guys, but I used to get upwards of a hundred reminders a week via email telling me to do thing. 
These reminders come at times which I have no control over, interrupt me and usually always get put in the "do this later" bin. 
Worse, most of  these tasks were pretty banal and ripe for automation - some of them were "meta-tasks" like, "remember to remind person of thing they have to do". 
Sure, co-ordination is necessary, but why does a _human_ have to do it ? 
Surely, I should  be able to hand off these cat-herding exercises to a bot and focus on the actual problems at hand, not the organisation and counting of such. 

I've been wanting to write a bot to handle these tasks for a while... I actually started a year ago on it, but ... a deluge of distractions distracted me. The. Frikkin. Irony.

Enough. I'll never get this done, but I've got this nagging conviction that even I get it done in drips and drabs, I'm making progress towards getting something off the ground. 

Beware, reader  : **this is not a tutorial**. It is a diary of pain and failure, and hopefully will remind _me_ of what the hell I did this fine day. Stop snooping... or whatever, snoop and tell me what I'm doing wrong.

# Which framework ? 

I initially spent a lot of time trying to decide on which framework to write the bot in. 
The first contact I had with anything botlike was [hubot](https://hubot.github.com/). Written in Node, I was a bit wary; Javascript and I do not make a great team. 
Turns out there are very good bot frameworks in python and ruby too, and I could have done things the hard way by using [one of Slack's SDKs](https://api.slack.com/community).

So... I have equally bad knowledge of JS, Ruby and Python (although I'd concede that Python would have be easier to ramp on), but the weight of experience on the web seems to lean towards Hubot. Maybe this will be untrue as soon as I've published this blog, but whatever, here goes. 

<h2 class="post-info text-center">HUBOT IT IS</h2>

<h1 class="text-center post-description">Let's build a motherfudging bot !</h1>

<div style="text-center width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3oEjHDjOdYcgKchai4" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>


## Step 1: Naming the bot

This is always the most trivial, but hardest part, so I'm just going to stick it right out there. 
I'm calling our helper "the Boss"; _ie_ "Bruce Springsteen". 
He's the boss because he'll know everything we need to do, and like any good manager, he'll have our back when we forget what we need to be doing, and who is on our case. 
Also, he's born to run. As in, "execute". 
As in, "Haha, stupid pun".
Whatever, it's a name ok ?


## Step 2: Creating the Slack App

First things first : this is a bot for [our slack](https://africa-arabia-roc.slack.com). 
In order to get started, **we need to create the bot**. 
This basically means having some credentials. 
According to [the Slack App documentation](https://api.slack.com/slack-apps#creating-apps) 

> Slack apps begin life locked down just for your workspace.

Creating the app was easy: [api.slack.com/apps/new](https://api.slack.com/apps).

Next up : "Add features and functionality". There are 6 kinds of features and app can have these days: 

  1. incoming webhooks
  1. interactive messages
  1. slash commands
  1. event subscriptions
  1. bots
  1. permissions

I guess we're doing the "bots" thing - but these are just aspects which can be turned on for the bot. Probably they translate into scopes that the bot's token will have in the slack API. When in doubt, push ALL THE BUTTONS.

<div style="width:25%;height:0;position:relative;"><iframe src="https://giphy.com/embed/mS0WBCrzVnSAU" width="25%" height="25%" style="position:absolute" frameBorder="0" class="giphy-embed text-center" allowFullScreen></iframe></div>

Well, actually it turns out you need endpoints for a lot of that stuff (slash commands, subscriptions, etc), so we'll do that later. For now, we've made an app that is : 

  1. a bot.
  1. able to post incoming webhooks.

## Step 3 : Generate OAuth tokens

Tokens are necessary to talk to the Slack API (and, I guess to get messages from it). It seems that at this point tokens are limited to users and channels, so you'll perhaps get a different token for access to any of these.
Once the tokens have been generated, _store those bad boys in a safe place_, because you'll need them. 
Protip: if slack finds them anywhere on the web, they'll disable the bot. So, you know... don't do that.

## Step 4 : Generate the bot

Right, we have a way to talk to Slack. Now, it's time to get started with the actual thing that will talk to slack - the bot. 

According to the [Slack Hubot SDK docs](https://slackapi.github.io/hubot-slack/), these are the steps  : 

  - [x] install requirements (Node, Hubot, Yeoman)
  - [ ] init the bot
  - [x] set up the custom bot
  - [ ] start the bot

We already did step 3 above and I already had some of the prerequisites installed from previous abortive attempts. So, let's see about creating the bot:

<iframe width="630" height="332" src="https://www.useloom.com/embed/6064dcdad37a44a98b3f88613c53586f" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
And now to start it :

{% highlight bash %}
HUBOT_SLACK_TOKEN=xoxb-247524119120-dFDSDrv9WvFJizpIbfSuByNc ./bin/hubot --adapter slack
npm WARN hubot-help@0.2.2 requires a peer of coffee-script@^1.12.6 but none was installed.
[Thu Sep 28 2017 11:20:36 GMT+0200 (CEST)] INFO Logged in as the_boss of bots-bots-bots
[Thu Sep 28 2017 11:20:38 GMT+0200 (CEST)] INFO Slack client now connected
[Thu Sep 28 2017 11:20:38 GMT+0200 (CEST)] WARNING Loading scripts from hubot-scripts.json is deprecated and will be removed in 3.0 (https://github.com/github/hubot-scripts/issues/1113) in favor of packages for each script.

Your hubot-scripts.json is empty, so you just need to remove it.
[Thu Sep 28 2017 11:20:39 GMT+0200 (CEST)] ERROR hubot-heroku-keepalive included, but missing HUBOT_HEROKU_KEEPALIVE_URL. `heroku config:set HUBOT_HEROKU_KEEPALIVE_URL=$(heroku apps:info -s | grep web.url | cut -d= -f2)`
[Thu Sep 28 2017 11:20:40 GMT+0200 (CEST)] INFO hubot-redis-brain: Using default redis on localhost:6379
[Thu Sep 28 2017 11:20:40 GMT+0200 (CEST)] INFO hubot-redis-brain: Data for hubot brain retrieved from Redis
{% endhighlight %}

# Time out

Ok... time out. We have created a slack app and a hubot. All of  it is in dev on my own laptop. Next up : hacking the bot locally with ngrok and then delivery of the app to a dedicated machine.

> Talk about a dream, try to make it real.
> - The Boss