---
layout: post
title: "Wrapup"
description: "What happened this week ?"
headline: "Weeks: 2 down, 50 to go "
category: blog
tags: [theprocess, blog, workopen, boring, ministry]
image:
  feature: week2-2016.png
comments: true
mathjax: false
---

It's Friday, the second week of work is gone in 2016. An enjoyably cold, windy week, during which I finished season 1 of [Serial](https://serialpodcast.org/)[^Ahmed], and caught up on Season 2. This week David Bowie and then Alan Rickman passed away. They were giants, yes, but I can't say I wept for them. Now, when Nick Cave or Gill Scott Heron goes, I will indeed feel like a part of me has been taken away. A tiny, tiny part - their music will live of course. I _did_ get curious and listened to [Black Star](http://www.last.fm/music/David+Bowie/Blackstar) quite a bit, and I regret nothing

<figure>
<img src="{{ site_url }}/images/lastfm-week-2-2016.png" />
<figcaption><a href="http://www.last.fm/user/brucellino/library/artists?date_preset=LAST_7_DAYS">My charts for week 2, 2016.</a>
</figcaption>
</figure>

But that's enough of death and music for now.

# Things I got done this week.

I'm a little obsessed right now with [CODE-RADE](http://ci.sagrid.ac.za). I want to build every damn thing that researchers want, and have it delivered smoking hot to their cluster no questions asked. In fact, _I_ don't want to do it, I them to simply ***be able to request*** it, and have Jenkins do it.

In order to get to this most awesome of places, we need some kind of foundation, so I've been working on integrating a few widely-used libraries into the repository. BOOST, BLAS, LAPACK, GSL, Python, NetCDF, HDF5 - all go into Foundation Release 2. Then a bunch of other things which are needed, and not guaranteed to be present on remote sites; things like `readline`, `ncurses`, `ssl`, `zlib`, `tcltk`, _etc_. We're almost done with that.

Then, I took a day (Wednesday, I think) to explore the actual dependencies of several applications to see whether our coverage was ok. I went through all of the old EPIKH, GISELA and SAGrid application requests from various places such as the [EGI AppDB](http://appdb.egi.eu/) and my personal notes -  **17 applications in all**. There is only one stumbling block to getting these beauties built and integrated - Java. The most important application which needs Java is [Weka](http://www.cs.waikato.ac.nz/ml/weka/), but there are also agent-based modelling applications like [Gama](https://github.com/gama-platform/gama/wiki) and [REPAST](http://repast.sourceforge.net/) which need it. So, that will likely go into Foundation Release 3, once we get the "simple" stuff out of the way.



# O NO, MY STREAK !

I had a 17 day github streak going which ended yesterday. I can't say I'm _too_ bummed about it, because it's just a number, right ? Considering that my longest streak before that was 6 days though, I consider this a great achievement; having that little flame under my butt that said "come on dude, keep it going", was really useful to getting stuff done. However, the fact that little changes could result in actual progress was actually also really useful.

So, here's to getting a longer streak in the weeks to come.

So, to the sounds of Sonic Youth, I head into this weekend.
<iframe src="https://embed.spotify.com/?uri=spotify:album:3vZQVeesxkzSRPtVLsrXKn" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>

# Footnotes

[^Ahmed]: I don't think Ahmed did it.
