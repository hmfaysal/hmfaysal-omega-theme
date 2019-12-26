---
layout: post
title: Week 19 projects update
description: What I've been up to in the 19th week of 2016
headline: Week 19 (2016) work update
category: blog
tags: [work, projects, update, AAROC, Sci-GaIA, CODE-RADE]
mathjax: true
image:
  feature: cape-town.jpg
comments: true
---

Here is a brief summary of the things I've been working on in the 16th week
of 2016.

## AAROC Operations

A summary of the status of the sites can be seen below. For more details, see
[ARGO](http://argo.egi.eu/lavoisier/status_report-site?ngi=AfricaArabia&start_date=2016-05-09T00:00:00Z&end_date=2016-05-15T23:59:59Z&report=Critical&accept=html).

<figure id="argo">
<img src="{{ site_url }}/images/argo-w18-2016.png">
<figcaption>
Weekly status summary of the Africa-Arabia Regional Operations Centre.
</figcaption>
</figure>

- Wrote operators page for the AAROC website.

## Argus

- new release v0.0.5. ARGUS ticket closed.

## Accounting

- Turned off SSL for message sending

- Thursday: messages arrived.
- Friday: CHPC, MA-CNRST and Wits probes green.

Following up on UCT, UJ. Bouchra following up on ASRT and ZC

## UCT SAGrid

- Worked with UCT to enable VO Sagrid

```bash
May  9 15:04:52 srvslngrd007 glexec[17531]: LCAS authorization request
May  9 15:04:52 srvslngrd007 glexec[17531]: #011lcas_plugin_voms-plugin_confirm_authorization_from_x509(): Did not find a matching VO entry in the authorization file
May  9 15:04:52 srvslngrd007 glexec[17531]: #011lcas_plugin_voms-plugin_confirm_authorization_from_x509(): voms plugin failed
May  9 15:04:52 srvslngrd007 glexec[17531]: lcas.mod-lcas_run_va(): authorization failed for plugin /usr/lib64/lcas/lcas_voms.mod
May  9 15:04:52 srvslngrd007 glexec[17531]: lcas.mod-lcas_run_va(): failed
May  9 15:04:52 srvslngrd007 glexec[17531]: LCAS failed to do mapping and return account information
May  9 15:04:52 srvslngrd007 glexec[17531]: Termination LCAS
May  9 15:04:52 srvslngrd007 glexec[17531]: Termination LCAS
May  9 15:04:52 srvslngrd007 glexec[17531]:   LCAS failed.
```

Config from Tim:

```ini
"/ops/Role=lcgadmin/Capability=NULL" .sgmops
"/ops/Role=lcgadmin" .sgmops
"/ops/Role=NULL/Capability=NULL" .ops
"/ops" .ops
```

Not much progress made.

### OMB

- Cloud middleware distribution

### ROD

- Closed a few availability tickets (ZA-WITS, ZA-CHPC)

## CODE-RADE

Updated info on website.

### Single user repo and jenkins

- Can't add another admin to a personal repo.
- Added a webhook add Dr. Builditall as collaborator.

### LibSVM

- ran 2K, 6K and 12K studies at CHPC

## Sci-GaIA

### Winter School

Checkpoint meeting - nobody showed.

### Summer School

We discussed the dates.

## What's on my plate

So, what's left on my plate ? In no particular order :

### AAROC Ops

1. Fix the Perun installation
1. Finish the ARGUS configuration
1. investigate the problems on the WMS
1. enable SAGrid VO at UCT and MAgrid

### CODE-RADE / AfricaGrid User Support

1. Finish the researchers' "getting started" page on the AfricaGrid website.
1. finish the performance study on the grid.

### SciGaIA

1. sci-gaia reporting (including financial report)
1. continue work on Sci-GaIA CI
1. start work on Sci-GaIA T2.1 report
1. start work on Sci-GaIA sentinel report

### General research

1. mozilla science lab sprint project submission (reproducible workflows)
1. work on the performance study paper

### Meraka / SANREN

1. annual report for SANREN

---

This report took me more than 6 Pomodoros :tomato: :tomato: :tomato: :tomato:
:tomato: :tomato: and almost 5 hours :clock1: :clock2: :clock3: :clock4:
:clock430:. Happy Mothers Day y'all.

---

## Footnotes

[^buserror]: This is the kind of bus error where the only person who knows how to do something "falls under a bus" and all knowledge of how to do that thing is suddenly lost.

[^incidentally]: Incidentally, [this StackOverflow answer](http://stackoverflow.com/a/33708270/2707870) helped me figure out how to do cross-references with Github Pages, by revealing a little trick: Gtihub Pages automatically adds a lower-cased, special-character-cleaned `id=` to each header, which you can link to.

[^nosurprise]: No big surprise here - the majority of sequencing applications like this tend  to be huge consumers of RAM.

[^actuallylotsofothers]: Actually, the student worked hard to implement the study on several other platforms too, including campus grids, p2p platforms, etc.

[^actuallyaservice]: Actually, there's a **service** form that - the [gLibrary metadata service](https://glibrary.ct.infn.it/glibrary_new/index.php)

[^quickandeasy]: As a side note, it's very easy to use this service - after the quick creation of the metadata collection, and a bit of fiddling with the REST API we soon had the registration of metadata automated from within the scripts. There's ample scope for experimentation here...

[^dontsueme]: [Don't sue me, Apple](http://www.trademarkia.com/theres-an-app-for-that-77980556.html)

[^ughcaps]: We'll ignore the fact that it's in all caps (ugh)

[^sagridlfc]: The LFC in SAGrid is hosted at UCT, but they have not maintained it, so we are using `lfc.magrid.ma`

[^linesinjson]: The number of entries was about 760 at last count...
[^prettyjson]: Incidentally, I learned quite a bit about dealing with JSON on the command line. For instance [B Bycroft](http://stackoverflow.com/users/233648/b-bycroft) [taught me](http://stackoverflow.com/a/1920585/2707870) taught me this one`python -m json.tool data.json > prettydata.json`.

[^cparam]: This parameter describes the complexity of the decision rule and the frequency of error - see e.g. [www.svms.org/parameters/](http://www.svms.org/parameters/)
