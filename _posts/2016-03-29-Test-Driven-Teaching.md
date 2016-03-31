---
layout: post
title: Test-Driven Teaching
description: Is that what we're calling it now ?
headline: Test-Driven Teaching
category: blog
tags: [blog, Sci-GaIA, winterschool, learning, testing, continuous integration, Jenkins]
image:
  feature: test-driven-teaching.jpg
comments: true
mathjax: false
---

# TL;DR - Can we really get the bots to help us in an online school, or are we just going to create more work for ourselves ?

We are facing a small dilemma in the development of a short technology-heavy course which we are going to run online for the [Sci-GaIA](http://www.sci-gaia.eu) project [winter school](http://www.sci-gaia.eu/winter-school) which starts on the 1st of April. The dilemma goes to the heart of why there is so much inertia in our methods - whether those be training, writing documentation, or actually designing new services and tools - whilst we on the other hand continually strive to stay at the cutting edge of e-Science. It's almost  easy to stay up to date with products out there - many of the great tools that we use daily are _designed_ to be easy to use and adopt, but it's worthwhile remembering that we are also in the game of developing tools and services which ***we*** want research communities to adopt. The case in point is the [Science Gateway](http://www.catania-science-gateways.it/) framework. This is a framework for developing web-portals for allowing researchers to conduct their workflows by exposing user interfaces to their respective applications,  and which is properly integrated into a federated computing backend[^GridHPCCloud]. But how appealing, how useful, how functional, how relevant is this approach really, in the real world ? Are research groups really able to build their environments[^VRE] around the Science Gateway concept, with the science gateway[^GridEngine] ? It's always good to be skeptical about the greatness of your own ideas and the usefulness of your own tools. And I think the only way we can really be unbiased is by putting our philosophy into action, and testing it in the crucible of independent adoption.

## <i class="fa fa-flask"></i> A lab in a school

I hope to be able to use this winterschool as a testing ground for some ideas that I have about _how_ we should be teaching research software engineers to use tools. What exactly we teach them to _use_ - which specific tool is the right one for a particular job - is determined by the scope of the course, but I'm referring rather to ***how we actually use the tools we're talking about***.


I would like to focus on two things which I consider as fundamental disruptions to the status quo :

  * Testing
  * Automation

These are at the heart of the the philosophy and practice of [Continuous Integration](https://www.thoughtworks.com/continuous-integration)[^CIDef][^DevOps]which will, for the first time at least in my experience, take centre-stage in a course.

# <i class="fa fa-rocket"></i> Automated Testing

I touched briefly and prematurely perhaps on the benefits of adopting continuous integration tools during the [CHAIN-REDS/RECAS Summer School](http://agenda.ct.infn.it/event/1056/other-view?view=standard) in 2014. This was the last time we've actually run a training event on developing science gateways, and I hope a lot has changed in the course of the last two years...

<iframe src="//www.slideshare.net/slideshow/embed_code/key/1JchpzuLKlwVQH" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/brucellino/continuous-integration-35732966" title="Continuous integration" target="_blank">Continuous integration</a> </strong> from <strong><a target="_blank" href="//www.slideshare.net/brucellino">Bruce Becker</a></strong> </div>

## <i class="fa fa-code-fork"></i> Collaboration and Code from the start

A fundamental difference between the "old" way of doing things and the "new" way of doing things is the expression of everything as _code_. The idea that the development environment can be expressed as code, and can be created via the execution of that code is a way of re-enforcing the principle :

> If something is worth doing, it's worth keeping

"Keeping" in this case means putting your work into a change-controlled repository and working in a methodical way with this, using the version and change control tools at your disposal. In my opnion, this means "Use Git, duh.", which has the corollary of "Put your repo on Github"[^OrBitbucket]. This automatically provides you with an environment _conducive to collaboration_. Who knows, chances are that nobody but you, the author of the code, will ever look at - much less use ! - the code that you write, but working from the start in a manner which makes future re-use likely is a very good insurance policy.

## <i class="fa fa-fighter-jet"></i> Cruise Missiles for Miggies[^miggie] ?

It may seem like a lot of overhead to get started - perhaps a whole day may need to be spent on setting up the various tools necessary for working on a portlet. However, I reject this point of view. In my opinion, getting to work on a project like this _without_ an environment that is conducive to, and actively supports, future use is probably only going to create future headaches. It's better, in my opinion, to spend time on a supportive environment than to introduce [Technical Debt](http://martinfowler.com/bliki/TechnicalDebt.html) at a later stage.

These science gateways start of as small, standalone portlets, with just a few lines of javascript, java and html to define them, so it may seem like total overkill to insist on the creation of a repo, integration of that repo with automation tools, _etc_ - akin to using a cruise missile to kill a fly. However, introducing these things at some point down the line - once bad habits, quick fixes and ugly hacks have become the norm - can be very, very painful. It's better to make a time investment at the beginning of  the project (or course in this case), to become comfortable with the mechanics of developing these science gateways, whilst learning about the underlying infrastructure and frameworks, than to put off the payment in technical debt for later, when the interest on this debt has grown too large.

## <i class="fa fa-check-square-o"></i> Automated Feedback

This is the first time I will be running a course entirely online. We will be using the [EdX](https://open.edx.org/) open courseware platform. We will not have the ability to work side-by-side with the course students and see what they are seeing most of the time, as was the case in the previous face-to-face schools. How are we going to be "on the same page" as the students in this case ? Either we could be on call during the entire duration of the school, over videoconference, and fall back to screen-sharing, and real-time information exchange... Guess how that's going to go ![^ItIsNot]

Or... we could provide a tool as part of the school which conducted the same kinds of checks which we human "teachers" would do. Except, these  checks would be done _automatically_ and _consistently_, and _every time_ the student requested. It would and allow both sets of humans (the teachers and the students) to look at the same code and resulting artifacts (or errors), even asynchronously. Asynchronicity in this case is important, since time is at a premium and needs to be dedicated when it's avaiable - which is probably not going to be synchronous between the student and the teacher.

Indeed, this is what we will do, with Jenkins - a dedicated instance of [Jenkins](http://jenkins-ci.org) will be use to run tests and compilation checks on the portlets  developed by the students.

## <i class="fa fa-ship"></i> Contained tutorials.

Another piece of shiny which we'll be bringing to the table during the development of the course is the use of [Docker](http://www.docker.com). Docker will be used to provide the students with preconfigured development environments - which have been tested ! - the mission which was previously fulfilled by virtual machine images. This in itself will not make a substantial difference  to the students, I think. However, the AUFS filesystem and overlay capabilities of Docker will provide us with a means to make atomic changes to the environment which can be expressed as code[^AnsibleDockerfile] we will also be using Docker to _reproduce_ various stages of the course, and compare student work with the reference material more easily. I think that using containers to express differences in the environment in a more atomic way, instead of providing the students with a perfectly configured, pre-prepared virtual machine will not only increase their confidence (since they will have to do some of the work, as tutorials, in getting to these states), but also make the lessons far more transparent and expose holes in their understanding of the various components of the framework. This will help not only them to learn, but also us to teach better.

#  <i class="fa fa-bolt"></i> Automated Deployment

The Jenkins instance will also be used to run the deployment into the testing environment of the new portlets, to estimate any negative impact on a production environment, should they eventually be deployed. It's important that all of this extra "infrastructure" is itself reproducible, should we or someone else want to reproduce the course. For this reason, I've been working on the [Ansible role](https://github.com/sci-gaia/WinterSchoolCI) for the Jenkins installation and configuration. Ansible is very capable when it comes to orchestrating services on new infrastructure, and we're going to be using it to set up and maintain server and build slaves which will be used  by the student projects.

In terms of running the tests, the idea is to run these tests in the containers that have been provided for the school. After the initial material has been covered, and the practical fundamentals have been taught, the development/hacking phase can begin. By running continuous integration on their code in an environment which is as similar as possible the real world portals where these portlets will be deployed, will allow bugs and errors to be caught early.

-----

## This will be a learning curve for all involved. Hopefully, we can stick to our philosophy of doing things _right_ even when the temptation is strongest to just get a dirty hack out the way.


## Discussion and critical thinking will be very important during the course of the school... either way, it's going to be fun !


-----

# References and Footnotes

[^GridHPCCloud]: The main selling point of this framework is that it is developed upon the SAGA standard, allowing submission to multiple kinds of computing services - HPC, grid or cloud backendds - using a single API.
[^VRE]: The term "Virtual Research Environment" has been bandied about a lot in recent times. Everyone thinks they know what it is, and that it has something to do with the web for scientists. [Microsoft had one opinion on the aspect, with SharePoint](http://research.microsoft.com/en-us/projects/vre/), but I would beg to differ. I think for a long time the concept was of building a "portal", which tended to result in centralised or monolithic designs, however ... however : [Slack](http://www.slack.com) ! Slack taught us (or at least me) that the way to get everything into one place was not to centralise, but to _integrate_. If you ask me, Slack is the VRE.
[^GridEngine]: The Science Gateway in our case is a pretty specific stack of [Liferay](http://www.liferay.com) + Catania Science Gateways [GridEngine](https://github.com/csgf/).
[^CIDef]: I've linked to Thoughtworks here as if they were the providing the definitive description of what CI is all about. This is clearly not indicative of the real world, there are many ways to conduct or define continuous integration, but the aspects of continuous and atomic testing, as well as the automation of various tasks, I think, will be part of any of these.
[^OrBitbucket]: Sure, use Bitbucket too, or whatever other hosted service you want. The important thing to remember is the functionality that the provider of the services gives you in terms of webhooks and other integrations.
[^miggie]: If you don't know what a miggie is, sorry for you. It's basically an annoying insect that buzzes around your head - the worst bits of a fly and a mosquito put together. Killing them is something of a national imperative in South Africa.
[^AnsibleDockerfile]: The language in which these changes are expressed can be quite important. Our default and only means of expressing these states previously was by writing them in English manuals - something not particularly conducive to elmintating misundertanding and bugs. Even the simple Dockerfile is a much better way of doing this for simple states. However, when it comes to reproducing complex states, I want to move to Ansible playbooks inside the dockerfile, which may be easier to understand at scale, since they allow the abstraction of functionality and states into _roles_.
[^DevOps]: It also happens to be at the heart of the DevOps movement. It's been nice to see how the development of the school material and supporting infrastructure has been done in parallel, which could only really be done the "DevOps way". The curriculum and the services needed to run it have grown together. More about that later.
[^ItIsNot]: Hint: It is not going to go well.
