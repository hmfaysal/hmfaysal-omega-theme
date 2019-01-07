---
layout: post
title: Week 18 projects update
description: What I've been up to in the 18th week of 2016
headline: Week 18 (2016) work update
category: blog
tags: [work, projects, update, AAROC, Sci-GaIA, CODE-RADE, THOR, ORCID, Mothers Day]
mathjax: true
image:
  feature: cape-town.jpg
comments: true
---
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [AAROC Operations](#aaroc-operations)
  - [ROD](#rod)
  - [Accounting](#accounting)
- [CODE-RADE](#code-rade)
  - [LibSVM](#libsvm)
  - [HTK](#htk)
- [Performance Study](#performance-study)
  - [Novel jobs](#novel-jobs)
    - [Messaging](#messaging)
    - [Metatadata registration](#metatadata-registration)
  - [Data Management](#data-management)
  - [Compute performance](#compute-performance)
  - [Reproducible science](#reproducible-science)
- [Sci-GaIA](#sci-gaia)
  - [Web forum](#web-forum)
  - [Winter School](#winter-school)
  - [THOR](#thor)
- [What's on my plate](#whats-on-my-plate)
  - [AAROC Ops](#aaroc-ops)
  - [CODE-RADE / AfricaGrid User Support](#code-rade--africagrid-user-support)
  - [SciGaIA](#scigaia)
  - [General research](#general-research)
  - [Meraka / SANREN](#meraka--sanren)
- [Footnotes](#footnotes)

<!-- /TOC -->
Here is a brief summary of the things I've been working on in the 16th week of 2016.

# AAROC Operations

A summary of the status of the sites can be seen below. For more details, see [ARGO](http://argo.egi.eu/lavoisier/status_report-site?ngi=AfricaArabia&start_date=2016-05-01T00:00:00Z&end_date=2016-05-08T23:59:59Z&report=Critical&accept=html).

<figure id="argo">
<img src="{{ site_url }}/images/argo-w18-2016.png">
<figcaption>
Weekly status summary of the Africa-Arabia Regional Operations Centre.
</figcaption>
</figure>

An up and down week on the operations side of things. The main issue is a still-poorly understood instability in the storage of the C4 cluster. Several VM images were corrupted and it took some manual intervention to get them back. We had issues with the top-bdii died and strange accounting errors. The Top-bdii was fixed quickly, however not without some negative impact on the A/R of the sites, since SAM relies on this bdii. The accounting issue has been worked on, but not yet resolved and is discussed below.

## ROD

The general situation has been stable, but somewhat unsatisfactory over the week. The two Egyptian sites are reporting network errors, and local misconfiguration of the CEs. ZA-UJ has a CA cert misconfiguration somewhere which is preventing VO-ops jobs from running, as well as probes to the SE - however very strangely the VO-sagrid configuration seems fine. Even weirder is the fact that the opposite issue is being seen at ZA-CHPC : ops runs fine, but the CE is rejecting proxy delegation requests from the WMS. The same issue is seen at ZA-UCT, however whilst UCT denies even direct job submission, at least CHPC allows that.

Sites in the Maghreb are working fine; DZ-01-ARN A/R is recovering from the above-mentioned bdii outage, whilst the two sites in Morocco are performing well.

## Accounting

Most of the week's ROD effort was spent on trying to fix the propagation of accounting records that has been broken since the end of March.

<figure>
  <img src="{{ site_url}}/images/AAROCaccounting-01012016-01052015.png" href="http://accounting.egi.eu/egi.php?Path=1.73&query=normcpu&startYear=2016&startMonth=1&endYear=2016&endMonth=5&yRange=SITE&xRange=VO&voGroup=all&chart=GRBAR&scale=LIN&localJobs=onlygridjobs" />
  <figcaption>
  Accounting information sent by the regional server at Meraka to the [central EGI accounting database](http://accounting.egi.eu). Note the gap after the end of March.
  </figcaption>
</figure>

The _reason_ for this missing information is not clear, especially since the accounting was working fine before the downtime. It is clearly the result of some misconfiguration, but difficult to say which. The issue is being tracked [via GGUS 118415](https://ggus.eu/index.php?mode=ticket_info&ticket_id=118415).

Since the APEL regional server at `apel-server.c4.csir.co.za` was also part of the downtime due to the instability at C4, it had to be reconfigured. There were a few issues found - first of all, the database job records was corrupted. Fixed easily with

{%highlight bash %}
    mysqlcheck -u root -p --auto-repair --check --optimize --all-databases
{%endhighlight %}

Result :

{%highlight sql %}
    apel.JobRecords
    info     : Key 1 - Found wrong stored record at 669536220
    info     : Wrong bytesec:   0-  0-  0 at 669565308; Skipped
    warning  : Number of rows changed from 3063770 to 3063762
{%endhighlight %}

Then, `fetch-crl` was missing - installed it and updated  the CRLs. Two messages were locked - removed the lock and re-sent them. Then, with the help of the APEL team, I found that we were sending summaries to ourselves (on the ZA-MERAKA queue instead of the Global queue), instead of to EGI. This was fixed, but we still don't see any new messages getting through. Work continues next week...

We had a [pull request](https://github.com/AAROC/DevOps/pull/319) from Bouchra to include the MAGrid VO variables in our repo, which was accepted. I have been pushing hard for  the other sites to include their DevOps code in the repo too. The main place where this could help is with the configuration of the VO services, not necessarily the basic service orchestration - although some benefit in shared practice and transparency is to be had here too. The general principle of turning code into infrastructure and collaborating around a single repository is gaining traction, I think. We might need to have a hackfest to start to include some deeper testing and more structured layout of the repo.

In the future, I might want to include some coverage of the Ansible playbooks here that describe how well we can reproducibly orchestrate at least the core services of the ROC, should a bus error[^BusError] ever occur.

# CODE-RADE

We've had a good few weeks for [CODE-RADE](http://www.africa-grid.org/CODE-RADE), which has proved itself, both on the integration as well as on the delivery side. We had the opportunity to showcase the platform due to a request for support from a student at NWU working on their masters. This is discussed below in [Performance Study](#performance-study)[^Incidentally]. CODE-RADE was also extended to the Moroccan sites, and after some discussion with them, we've had our first request for an application from outside of South Africa - [Mothur](http://www.mothur.org/), a bioinformatics application which requires huge memory[^NoSurprise]. Mothur is being integrated by the Moroccans, so I'll report on the SVM and HTK applications (in the machine-learning domain), which took up my time.

## LibSVM

[LibSVM](https://www.csie.ntu.edu.tw/~cjlin/libsvm/) is a library for performing [Support  Vector Machine](https://en.wikipedia.org/wiki/Support_vector_machine) learning on data sets. This application was included in  CODE-RADE [fastrepo build 146](http://ci.sagrid.ac.za/job/repo%20transaction/146/)

<figure>
<img src="{{ site_url }}/images/LibSVMtransaction.png">
<figcaption>
Jenkins informing the team of the SVM  build passing and CVMFS bot telling us about the integration into `fastrepo`
</figcaption>
</figure>

A lot of work was done to include the JDLs and scripts for executing svm, which are kept in the [CODE-RADE examples](https://github.com/AAROC/CODE-RADE/tree/master/grid/libsvm) directory of the repo. There has been a lot of activity in the repo:

<figure href="http://github.com/AAROC/CODE-RADE/pulse/">
<img   src="{{ site_url }}/images/CODERADEpulseweek162016.png" />
<figcaption>
Pulse of the CODE-RADE repository for week 18 2016
</figcaption>
</figure>

## HTK

[HTK](http://htk.eng.cam.ac.uk/) is a Hidden Markhov chain Toolkit widely used in machine learning in the human language domain. It has been previously used by folks in Meraka for speech recognition studies. Version 3.4.1 and 3.5.beta-1 entered CODE-RADE in Build 148. This was one of the applications used in [the performance study](#performance-study). Whilst the applications of the package are all available and working, there seems to be some incompatibility with the data sets used in the study. This has been reported in [CODE-RADE #67](https://github.com/AAROC/CODE-RADE/issues/67), and not yet resolved. The data set assumes the so-called "ASR template" set of scripts, and work has started in integrating those [as a component of CODE-RADE](http://ci.sagrid.ac.za/job/ASR%20template/)

# Performance Study

As mentioned previously, there is a M.Sc. student at NWU who is conducting a study of the performance of using the grid for massive machine-learning processing, using the SVM and HTK methods. A lot of time was spent with him on Slack to understand the scope and needs of the study. The submission of the jobs to actually perform the study was done myself since :

  1. Issuing a personal certificate to someone at NWU is not easy since [their RA](https://security.fi.infn.it/CA/en/RA/) has disappeared
  2. It would have taken some time to educate the user on how to submit the jobs that would execute the study, as well as write the various files necessary to do so, and there is a pretty tight time constraint on his submission.
  3. With a collaborative approach, much more can be learned than by expecting the user to work unaided and unguided on their own. The activity in AAROC/#hlt-research is testament to this.

The study aims broadly to describe the difference in performance (timing essentially) and other metrics (reproducibility, transparency, ease of collaboration) on different platforms - in this case, a local powerful machine and a production quality distributed computing infrastructure[^ActuallyLotsofOthers].

## Novel jobs

One of the nice things about working on this project was the opportunity to update the way we interact with the grid. I attempted to write job scripts that automated most of the pre- and post-processing, as well as maintaining a high verbosity via messaging in order to keep the user aware of what was going on.

### Messaging

Since the resurgence of messaging in particularly the wide use of [Slack](http://www.slack.com), we are able to make the user's experience much richer. Whereas before most information about what the jobs were doing was passed via the command line and scrutiny of job logs, we can now create nicely-formatted messages and send them to Slack directly from the job script :

<figure class="half">
<img src="{{site_url}}/images/jobstart.png" />
<img src="{{ site_url }}/images/jobend.png" />
<figcaption>
Screenshots of the #gridjobs channel, showing the conversational nature of the grid now. Operators, users and the jobs all talking to each other. Different "job cards" were created, using emoji and slack formatting to summarise what state the jobs were in and crucial performance features, making it easy see at a glance how things are going.
</figcaption>
</figure>

Playing around with messaging might be something I invest a lot of time in over the next few weeks, as we build science gateways.

### Metatadata registration

Since this study was more about _performance_ aspects of the computing, rather than the actual outcome of  the jobs, what we're really after is the **job metadata**. As it turns out, "there's an app for that"[^DontSueMe] <i class="fa fa-trademark"></i>[^ActuallyAService] - the [gLibrary metadata service](http://glibrary.readthedocs.io/en/latest/). This provides a REST API which a user or robot can use to register metadata of any kind, or even other digital objects, as defined by the use case in question[^QuickAndEasy]. We just send a JSON like this to the endpoint :

{%highlight bash %}
curl -X POST --data-urlencode 'payload={ <JSON payload> }' http://glibrary.ct.infn.it:3500/v2/repos/nwu_hlt/nchlt
{%endhighlight %}

where the JSON payload looks like:

{%highlight json %}
{
  "study": "3",
  "dataset": "'"$DATASET"'",
  "total_time": "'"$total_time"'",
  "staging_time": "'"$staging_time"'",
  "processing_time": "'"$processing_time"'"
}

{%endhighlight %}
Of course, all of these are environment variables which have been calculated during the execution of the script.

## Data Management

This study allows us to make some comments on aspects of data management and movement on sites in South Africa. Both the HTK and SVM applications run the training and evaluation of algorithms on sets of input data, which is fairly large - \\( O(10 GB) \\) - which needed to be processed at each run time. Dealing with data is the one area where distributing computing differs fundamentally from other topologies, because  of the "weight" of data on the network.

In terms of data transfer, we saw some anecdotal evidence of the benefit of being connected to SANREN, with pretty good transfer speeds from user interfaces in Meraka to the storage elements at the sites in Johannesburg, however we are running out of places to _compare_ this  timing to - _i.e._ places on the national network **not connected to SANREN**. This is a good thing overall, but makes the study a little less scientifically valid. We can say though that in the bounds of the endpoints that we were using for this study, SANREN is making the topology of the country all but invisible. This statement is made based on the average times taken to stage data from the user interface to the storage endpoints, compared to the average time to stage data from the storage elements to the worker nodes. Hard figures (and particularly the **distribution** of the timing) is not yet available, but anecdotally, it seems that

  1. it takes about the same time to move data _into_ the grid
  2. it takes about the same time to shift data between sites as it does _in_ sites.

By the latter statement, we mean that the LAN speed is comparable to the WAN speed. This is at first glance good news, but we are not getting **anywhere near** the top speed that the network would practically be able to achieve.

In terms of data management, we are using the Logical File Catalogue in Morocco[^SAGridLFC]. This service allows us to refer to data by "logical names" instead of actual physical locations, and abstracts the data's geographical position. By using this service, we ensure that our workflows do not have single points of failure of storage  elements are unavailable, and furthermore we can replicate data to wherever we have online storage available, allowing the scheduler of the WMS to decide more efficiently where to schedule jobs. The data was replcated to UJ and Wits storage, since these are the only relibale and available storage elements in the country. The job descriptions then only needed the stanza :

{%highlight json %}
DataRequirements = {
                     [
                       InputData = {"lfn:/grid/sagrid/nwu-hlt/NCHLT/NCHLT_${DATASET}.tar.gz"};
                       DataCatalogType = "DLI";
                       DataCatalog = "http://lfc.magrid.ma:8085";
                      ]
                    };
DataAccessProtocol = {"gsiftp"};

{%endhighlight%} in the JDL and in the script :

{%highlight bash%}
lcg-cp -v --vo sagrid lfn:/grid/sagrid/nwu-hlt/NCHLT/NCHLT_${DATASET}.tar.gz file:${PWD}/NCHLT_${DATASET}.tar.gz
{%endhighlight%}

for the input data management.

## Compute performance

One of the main elements of this study was to determine the most efficient strategy for parallelising the workflow. The workflow is principally data-bound, and can be parametrically paralellised by dataset. However, within the processing of each data set there are further levels of parallelism, which can be implemented as task-based or with distributed memory. In order to estimate how to most efficiently split the workflow, a scan over parameters which determined the level of serial _vs_ parallel execution had to be done. As overhead to each set of parameters though was the data staging time - the time it takes to ship data from the online storage to the worker node input sandbox, before processing can begin. There is expected to be large variation in this timing, due to network conditions. The compute performance study was therefore organised into two phases :

  1. A baseline study with only data parallelism. This saw a large parameter scan run over the same data sets repeatedly in order to gain some statistical significance of the measured time for execution.
  2. A scan of performance as a function of site and number of cores selected for the inner parallelism

Both of these were done for differing sizes of input data sets.

These values were collected during the runs at the participating sites and at the end of each execution were written into the metadata library, resulting in a very large JSON[^LinesInJson][^PrettyJson]. In order to explore this parameter space (parallelism, data size, site, data transfer rate) in a statistically significant way, you can imagine that **a lot of jobs had to be submitted** -

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Welcome back SAGRID. After a long absence, we&#39;re very pleased to welcome back sagrid jobs onto the cluster -- now running about 140 jobs.</p>&mdash; Scott Hazelhurst (@ZAWitsCore) <a href="https://twitter.com/ZAWitsCore/status/727563962376695812">May 3, 2016</a></blockquote>[^UghCaps]
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Reproducible science

There  is a lot missing from this study yet, and will be worked on with the goal of submitting an article on reproducible science. For example, the calculation of the so-called \\(C\\) parameter[^Cparam] needs to be reproducible if the machine learning algorithm is to be trusted. In order to do this, we need to link input data sets, applications and final results **uniquely**. Just as  we automatically register the metadata in the metadata catalogue, we can automatically submit calculation results for publication into an Open Access Repository, and request DOIs for them, linked to the application which created the result. One could then reasonably re-produce the result, or compare reliably other results, due to the uniqueness of the digital objects. This workflow is quite easy to implement, actually, given access to a suitable Open Access Repository. One option is [Zenodo](http://www.zenodo.org), which has a [well-documented API for it's deposition endpoint](https://zenodo.org/dev#restapi-res-dep), but I want to implement this to use the [Invenio-based Open Access Repository](http://oar.sci-gaia.eu) that we are using as the demonstrator in Sci-GaIA. This awaits some server-side magic.

# Sci-GaIA

This week's effort on Sci-GaIA was limited due to the public holiday on Monday.  A few hours were spent during and after the weekly checkpoint meeting, and

##  Web forum

<figure class="half">
<img src="{{ site_url }}/images/posts-week17-2016.png">
<img src="{{ site_url }}/images/posts-08-04-2016-08-05-2016.png">
<figcaption>
Left: Number of posts per day during last month (08/04/2016 - 08/04/2016). Right: Posts during last week (Week 18 2016).
</figcaption>
</figure>

There is pretty decent activity on the web forum. I was responsible  for 4 of the posts last week.

## Winter School

Most work during this week for the [Sci-GaIA Winter School](http://courses.sci-gaia.eu/courses/UNICT/WS2015/201603_01_31/about) has gone into the development of the [integration platform](http://ci.sci-gaia.eu:8080). About a day's effort went into properly configuring Jenkins. We have configured Jenkins as a continuous integration platform which runs tests and builds of student's homework and code submissions and then sees if the result can be deployed in a production-like environment. To this end, we have set up a Jenkins server on an OpenStack cluster, and configured it to provision VMs or Docker containers (depending on the job), in which to run the testing. Of course, most of the orchestration is automated with Ansible, and the role for building the service is [WinterSchoolCI](https://github.com/sci-gaia/WinterSchoolCI) repo on Github. Working with Mario over the week, we managed to get the [Repast](http://repast.sourceforge.net/) [portlet](https://github.com/mtorrisi/infectionModel-parallel-portlet), which has been confingured to submit job collections,  to build in the integration environment.

## THOR

Finally, for the week's report, I did a bit of work on the [THOR](https://project-thor.eu/) side. Two weeks ago, [I wrote about how it might be beneficial to the CSIR researchers and the CSIR itself](http://www.africa-grid.org/blog/2016/04/11/ORCID-impact/) if [ORCID](http://orcid.org) could be made to sort the objects in my profile by some sort of "importance", as defined by whoever. This started quite an email exchange, and made it to the [THOR blog](https://project-thor.eu/2016/04/15/growing-number-of-thor-ambassadors-join-us/). This week, there was followup from the DataCite guys on [the idea of linking Github to ORCID](https://project-thor.readme.io/v1.0/discuss/56bc793e27425d0d00ccd38a) in order to include software products  in ORCID and link them to data and journal products in the same profile. I'm glad to see that the same ["ungodly union"](https://github.com/arfon/fidgit) that worked for first Figshare and then Zenodo is getting traction here too.

# What's on my plate

So, what's left on my plate ? In no particular order :

## AAROC Ops

  6. Fix the Perun installation
  7. Finish the ARGUS configuration
  8. investigate the problems on the WMS
  9. enable SAGrid VO at UCT and MAgrid

## CODE-RADE / AfricaGrid User Support

  1. Finish the researchers' "getting started" page on the AfricaGrid website.
  5. finish the performance study on the grid.

##  SciGaIA

  2. sci-gaia reporting (including financial report)
  10. continue work  on Sci-GaIA CI
  11. start work on Sci-GaIA T2.1 report
  12. start work on Sci-GaIA sentinel report

## General research

  4. mozilla science lab sprint project submission (reproducible workflows)
  5. work on the performance study paper


## Meraka / SANREN

  3. annual report for SANREN

-------

This report took me more than 6 Pomodoros :tomato: :tomato: :tomato: :tomato: :tomato: :tomato: and almost 5 hours :clock1: :clock2: :clock3: :clock4: :clock430:. Happy Mothers Day y'all.

-------

# Footnotes

[^BusError]: This is the kind of bus error where the only person who knows how to do something "falls under a bus" and all knowledge of how to do that thing is suddenly lost.
[^Incidentally]: Incidentally, [this StackOverflow answer](http://stackoverflow.com/a/33708270/2707870) helped me figure out how to do cross-references with Github Pages, by revealing a little trick: Gtihub Pages automatically adds a lower-cased, special-character-cleaned `id=` to each header, which you can link to.
[^NoSurprise]: No big surprise here - the majority of sequencing applications like this tend to be huge consumers of RAM.
[^ActuallyLotsofOthers]: Actually, the student worked hard to implement the study on several other platforms too, including campus grids, p2p platforms, etc.
[^ActuallyAService]: Actually, there's a **service** form that - the [gLibrary metadata service](https://glibrary.ct.infn.it/glibrary_new/index.php)
[^QuickAndEasy]: As a side note, it's very easy to use this service - after the quick creation of the metadata collection, and a bit of fiddling with the REST API we soon had the registration of metadata automated from within the scripts. There's ample scope for experimentation here...
[^DontSueMe]: [Don't sue me, Apple](http://www.trademarkia.com/theres-an-app-for-that-77980556.html)
[^UghCaps]: We'll ignore the fact that it's in all caps (ugh)
[^SAGridLFC]: The LFC in SAGrid is hosted at UCT, but they have not maintained it, so we are using `lfc.magrid.ma`
[^LinesInJson]: The number of entries was about 760 at last count...
[^PrettyJson]: Incidentally, I learned quite a bit about dealing with JSON on the command line. For instance [B Bycroft](http://stackoverflow.com/users/233648/b-bycroft) [taught me](http://stackoverflow.com/a/1920585/2707870) taught me this one`python -m json.tool data.json  > prettydata.json`.
[^Cparam]: This parameter describes the complexity of the decision rule and the frequency of error - see  e.g. [www.svms.org/parameters/](http://www.svms.org/parameters/)
