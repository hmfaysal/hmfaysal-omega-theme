---
layout: article
title: Week4 projects update
description: What I've been up to in the 4th week of January
headline: Week 4 (2015) work update
category: blog
tags: [work, projects, update]
image:
  feature:
comments: true
---

TL;DR - I've been working on three projects this week. Jenkins has been tweaked, CVMFS is ready, and we're almost ready to release v0.0.4 of DevOps.

I missed the weekly SANREN project update meeting this week because my poor boy came down with the flu and I had to stick around at home to look after him. In the meantime, here's a short update of the work that's been done this week and some plans for next week.

# Central Operator on Duty (COD)

## Support summary

This week :

  * we've closed 4 COD tickets and have
  * 3 new tickets opened

In total, there are 7 tickets open against two sites (CHPC and Zewail City)

## A/R improvements

Some work has been done on sites to improve operational status. CHPC and UCT had some configuration errors with their MPI installation, which has been resolved. This has brought the [Availability and Reliability](http://operations-portal.egi.eu/availability/siteAvailabilities/) of the CHPC to 100%, as measured by our [SAM-NAGIOS](https://nagios.c4.csir.co.za/nagios).
<figure>
<img src="{{ site_url }}/images/ZA-CHPC-A-R.png" />
<figcaption>Availability and Reliability of the CHPC site during the last month</figcaption>
</figure>

We have some communication issues with the site in Cairo; during December I worked well with the site admins there, but they seem to have dropped off the radar. The site may have to be de-certified.

We've also managed to make some progress on the CHPC's accounting problem. They were not publishing and synchronising the usage of their resources to the [accounting portal](https://accounting-portal.egi.eu). This issue is reported in [GGUS #111247](https://ggus.eu/index.php?mode=ticket_info&ticket_id=111247) and together with the APEL team, we've narrowed it down to the regional server at Meraka. Uli is working on it. We have [*some* usage](http://accounting.egi.eu/egi.php?ExecutingSite=ZA-CHPC), but only for September 2014.


## Failover core services

We've had some problems with our top-bdii and SAM-NAGIOS instances falling over (mostly due to running out of memory) recently and this has gotten us into trouble with EGI.eu. I worked with our site in Rabat to get failover instances of these two core services deployed there, which is now done. We still need

  1. implement DNS round-robin for the services (GARR is providing the DNS for the africa-grid.org domain)
  2. Implement some kind of messaging to ensure that the Maroccan service starts publishing when ours goes down.

## Reconfigured NGI-NAGIOS

We've also reconfigured the [AAROC NGI SAM-NAGIOS](https://nagios.c4.csir.co.za/nagios) to use our local workload management system to submit jobs, which allows larger input sandbox sizes.


# Continuous Integration Platform

Several new jobs have been registered in the SAGrid [Continuous Integration](http://ci.sagrid.ac.za:8080) platform, in order to modularise the base dependencies and ensure that commits trigger the correct jobs. I've also made the builds more granular, such that the build, check and execute scripts are separated. We have introduced "promoted builds" to allow automated checking until the functional tests are passing and only at that point is human intervention required - which is the last promotion step. Thereafter, artifacts are published into the CVMFS repository.

I've tested the CVMFS repository, which is working. Next steps are to include the mounting of the repo in the Ansible and Puppet code that the sites are excuting and ensure that there is a proper module init script for users.

# DevOps / Executable Infrastructure

## Science Gateway and web services

We've been working on the Science Gateway role in our [DevOps](https://github.com/AAROC/DevOps) repo. Situation at the moment is that we can deploy Liferay-based Science Gateway, with LDAP+Shibboleth Authentication and mysql backend, as well as the [GridEngine](http://www.catania-science-gateways.it) component with a few plays. Specifically, the [Liferay-CSGF](https://github.com/AAROC/DevOps/blob/dev/Ansible/liferay-csgf.yml) playbook. There are still some minor issues with the firewall configuration in the case of NAT'd sites, and there are some manual steps which we'd like to automate, but which require deeper understanding of how Liferay updates itself which we will leave for a further release.

When the [issues outstanding](https://github.com/AAROC/DevOps/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Pre-release+0.0.4%22) in the v0.0.4 pre-release milestone  are resolved, we will issue a pull request to the master branch and publish the update in [Zenodo](https://zenodo.org/collection/user-sa-einfra-commons). We've got one strange issue affecting the site in Dakar, which I'm trying to debug with colleagues fromm WACREN.

## Grid site deployment.

One of the main reasons for developing the DevOps capability is to enable configuration management of grid computing services at the sites. Most of the Ansible roles necessary for this have been finished, and tested using the OpenNebula cluster at C4. However, I can't figure out how to properly get networking working on private addresses there, so I haven't been able to properly test the [Worker Node role](https://github.com/AAROC/DevOps/tree/master/Ansible/role/worker-node).

# CHAIN-REDS

We had a weekly update meeting on the project, preparing for the final review. I have to contact APHRC to ensure that they will be coming to the [project conference](http://www.chain-project.eu/news/-/asset_publisher/Y0St/content/chain-reds-%E2%80%9Copen-science-at-the-global-scale%E2%80%9D-conference-31-03-2015-%E2%80%93-agenda-at-a-glance-now-online?redirect=http%3A%2F%2Fwww.chain-project.eu%2Fnews%3Fp_p_id%3D101_INSTANCE_Y0St%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-1%26p_p_col_count%3D1) in Brussels. We also discussed moving the PID service currently offered by [EPIC](http://www.pidconsortium.eu/) to South Africa, along a new prefix for the region. This is still pending.

# Slack ate my email

Using [Slack](https://africa-arabia-roc.slack.com), I've all but eliminated the need for email. Come on in and join me, it's rad ! I've taken the liberty of creating https://sa-nren.slack.com/ as well.

I'm out !
