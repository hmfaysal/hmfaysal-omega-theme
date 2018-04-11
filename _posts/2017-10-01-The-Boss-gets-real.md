---
layout: post
title: Automating the monthly sitrep
description: > 
              Some notes on building a slack bot to help out our team. (Part III)
headline: Born to run (Part III)
category: blog
tags:
  - bot
  - WIP
  - notes
  - sitrep
image:
  feature: images/the_boss_cover.jpg
  attribution: null
comments: true
mathjax: false
---

# Time to get real

So, we've [created a slack bot based on Hubot]({% post_url 2017-09-28-Born-To-Run %}), and [written a deployment scheme]({%post_url 2017-09-29-Hacking-the-Boss %}) which is  [12 factor-y](http://12factor.net). The bot comes with a few batteries included, such as common scripts for finding pictures of cats and throwing pugs at one another, which is great and all. But we came here to chew bubblegum and get :poop: done - and we're all out of bubblegum !
<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/eYwHuNOBcqNsA" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

We need to start giving this dude some things to do - things which are currently taking up _our_ human time. That's why we started this whole thing in the first place: so that we'd spend less time on boring admin and more time rocking and hacking.

The easiest kind of task that we can automate are **repeating** tasks. These are the kinds of things that have to be done repeatedly at specified intervals.

The first repeating task that I can think of is the monthly report. 

<!-- pomo 1 -->
# Monthly Sitrep

We have organised our [Slack](www.africa-grid.org/slack) workspace into several channels based on interest, location or role. 
For example, all of the sites which contribute resources  have their own channels, which the site operators and the [Regional Operator on Duty](www.africa-grid.org/operator).

The point of these channels is not to distract the other operators with issues that are strictly pertinent to the site itself.

However, there are many issues which are relevant to _all_ sites, such as issues arising in campaigns, discussion of technical issues, general questions, or requests for help from other site admins. 
Often, a common issue arises at all sites, which it is much more efficient to deal with _collectively_ than individually at the site level.
For this, we previously had an <i class="fa fa-slack"></i> ops channel. 

This channel ended up generating a lot of good knowledge, and helped us to understand what was happening in the ROC as a whole.
Re-reading this channel made it easier to summarise the general progress or state of issues on the ROC, and thus made it possible to write more concrete periodic reports.

Unfortunately, the message limit imposed by Slack on free workspaces meant that we would often lose much of that information before we realised that we needed it again. 
The solution to this was to create channels every month, and shift the discussion over there, while archiving the previous month's channel for posterity.

Hey presto, we can now search all of the ops archives.
<!-- pomo 2 -->