---
layout: post
title: Week 10 projects update
description: What I've been up to in the 10th week of 2015
headline: Week 10 (2015) work update
category: blog
tags: [work, projects, update]
image:
  feature: cape-town.jpg
comments: true
---

TL;DR - It's Friday, I did lots of work, and you deserve a beer.

# Central Operator on Duty (COD)

We've had major problems with sites going down across the region. CNRST in Morocco had a blocking issue with their CA, so all services were down. ZA-CHPC has had continuing electric supply issues, which resulted in a week-long downtime, while ZA-UJ also had electricity issues. Other sites soldiered on, but with this level of resource denial, there  weren't many jobs running, and COD activities were at an all-time low. Which was nice, because I could concentrate on some other tasks.

# CI Platform

Several new jobs have been registered in the SAGrid [Continuous Integration](http://ci.sagrid.ac.za:8080) platform, gearing up for the GADGET deployment. We've also had a request from a user at UJ for [Quantum Espresso](http://www.quantum-espresso.org/). Applications are deployed into the CVMFS repo, which is in beta, but looking good.


# DevOps

We're about to start a H2020 project called Sci-GaIA which will be deploying data repositories across Africa, amongst other things. Gearing up for this project, I've worked on an Ansible role for the [Zenodo](http://zenodo.cern.ch)/[Invenio](http://invenio-software.org) stack. This provides an OAI-PMH compliant data repository out of the box, along with DOI integration (at least, in theory !). This turned out to be a perfect place to start using something I've been interested for a while : Docker.

## Docker

I've been working with [Docker](http://docker.io) for the last few days and it's turning out to be a very useful tool for  development. Together with [Ansible](http://www.ansible.com), it's a great way to develop playbooks for the configuration of services (as long as they're on a single host - I haven't figured out clusters of containers yet.)

## DevOps Release v0.0.4

I've opened the pull request for the next pre-release of the [DevOps](http://github.com/AAROC/DevOps) - [v0.0.4](https://github.com/AAROC/DevOps/milestones). This will have the IdP (backend and web interface) roles included. The release will be accompanied by a DOI from Zenodo and a bit of a writeup. The CHPC is using the code to redeploy their worker nodes and user interface, which is tied to [Perun](https://perun.c4.csir.co.za) on the fly (which is, how you say ? "Very Rad"). We're one step closer to fully integrated identity management and service deployment.

> Our Ansible brings all the sites to the grid !

# CHAIN-REDS

## Conference

The CHAIN-REDS final conference is coming up at the end of the month. I will be representing the Sub-Saharan region, and making a demo of the Executable Infrastructure we think is so cool. The demo will show the deployment of an integrated LDAP/IdP and Science Gateway with Ansible.

I also invited the [H3Africa Bio Net](http://www.h3abionet.org) project to the conference, which will be funded by the project. This will be a great opportunity to cross-pollinate ideas and needs.

## HPC Survey

The project is running as one of it's final deliverables an HPC survey, coordinated by GRNET. We need to get the feedback of all of the "HPC" centres in the region, so that we can construct the state of the art of the region regarding usage and adoption. This has been started. Of course we expect input from the CHPC, but more importantly also the newer sites in Tanzania, Zimbabwe, Kenya etc.

## Persistent Identifiers

During the CHAIN-REDS project, we worked with the [African Population and Health Research Centre](http://www.aphrc.org), in order to improve the visbility and citability of their data. This involved using [handle](http://www.handle.net) service hosted by the [European Persistent Identifier Consortium (EPIC)](http://www.pidoconsortium.eu). We decided to deploy a handle service in South Africa to act as a catch-all for the region, in order to allow data repositories like APHRC's to become more visbile. [GRNET](http://www.grnet.gr) is going to help us install the handle server, however, we need to buy a prefix from [CNRI](http://www.cnri.reston.va.us/) which hosts the registry. These cost 50 USD a year.

# SAGrid strategy

I've exchanged a few mails with folks at UCT and CHPC about re-writing the SAGrid Strategy in a post-NICIS world. This has had very positive feedback, and is currently evolving quickly. I wrote my [extensive thoughts](http://brucellino.github.io/blog/2015/02/24/ECommonsStrategy/) on what I would like to see, so if you have any comments, head over there, read the fine article and make your point of view known.
