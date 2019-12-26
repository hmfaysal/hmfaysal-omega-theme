---
layout: post
title: Week 11 projects update
description: What I've been up to in the 16th week of 2016
headline: Week 16 (2016) work update
category: blog
tags: [work, projects, update]
image:
  feature: cape-town.jpg
comments: true
---

Here is a brief summary of the things I've been working on in the 16th week
of 2016.

## AAROC

Most of the core services which power the ROC are hosted in the C4 cluster in
the CSIR and managed by an OpenNebula cloud manager. There was a failure of the
storage backend of the virtual machines, as well as a general misconfiguration
of some of the VMS, which saw a lot of the important services go down. Debugging
the issue took quite a few days prior to this week, but eventually this week
they were brought back up. The Nagios monitoring system, Workload Management
System, Top-BDII, APEL accounting service, ARGUS authorisation service, and
Perun identity management service all suffered failures. With the exception of
Perun, which is managed by CESNET, these were re-created with the
[AAROC DevOps code](https://github.com/AAROC/DevOps).
