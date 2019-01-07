---
layout: post
title: "Safe data for H3A"
description: Some thoughts and feedback from the H3A-BioNet project.
headline: 'Shifting data safely in Africa'
category: data management
tags: [H3A, BioNet, data, movement, secure, identity, federation, pki]
image: 
  feature: 
comments: true 
mathjax: true
---

# H3A and H3ABioNet

The [Human Heredity and Health in Africa](http://www.h3africa.org) project is a continental project funded by NIH and Wellcome Trust. This is actually a network of projects, one of which is the [H3ABioNet](http://www.h3abionet.org/) project. According to the H3ABioNet website, the project is :

> an NIH-funded Pan African Bioinformatics network comprising 32 Bioinformatics research groups distributed amongst 15 African countries and 2 partner Institutions based in the USA.

while the main goal is :

> to create a sustainable Pan African Bioinformatics Network to support H3Africa researchers and their projects through Bioinformatics capacity development on the African continent.

A large part of the activities of this network is shifting data. Since it's **human genomic data** it has to be moved from where it's collected with extreme care. The data will be collected by field workiers collaborating on the project, all over Africa and sent to a secure staging environment in Cape Town where it can be processed (*e.g.* anonymised). Here, I summarise some thoughts and plans around how this task can be tackled using the services of the [Africa-Arabia Regional Operations Centre](https://roc.africa-grid.org).

## Outline

This turned into quite a long article. I first address some [general considarations](#general) and background. Then, I take a look at the isuses around [identity and security](#id), before tackling the main issue of [data](#data), going into detail regarding issues of data movement as well as data management. I then put forward a plan to [implement](#implementatation) full demo which can be taken to production, including the necessary agreements and technology which the ROC can provide. Finally some [next steps](#next) and a summary.

# General considerations and requirements {#general}

[CBIO](http://www.cbio.uct.ac.za) is the partner who is responsible for processing the collected data safely and securely. As such, they need to provide a secure storage area, which is nonetheless able to accept incoming data from around the African continent. This can of course be done the *easy* way or any number of *right* ways (there are, as always, many ways to skin this cat, depending on what one takes into account).  If this were a project in the '90s, the solution would have probably looked like:

- buy big disk
- put big disk on the network, exposing an ssh or ftp interface
- ask everyone who wants to use it to request a user name and password
- trust that they are actually who they say they are.

The '90s were cool and all, don't get me wrong - and let's not get into that right now ! - but **things have changed**. Just the scale and complexity of the collaboration would necessitate security and trust mechanisms which are beyond the architectural limits of such a *resource-centric* scenario. I term this 'resource-centric' because everything comes down to the physical resource - the big disk with all the data on it. An alternative view would be *service-centric* where the nature of the storage is abstracted (where it is, what kind of storage it is, etc), focussing instead of functionality... in other words

$$ \frac{function}{form} $$

...

Well, perhaps there are exceptions !
<figure class="">
<img src="/images/87440.strip.gif" >
</figure>

## Re-use services in a federation

Perhaps it's too ambitious to consider all of the *components* of 'the right way', however one of the *aspects* shoud be to **use existing services where possible**. One of the obvious alternatives is to build a vertical solution, with everything the collaboration will need in one self-contained environment, but considering the geographic distribution and timescale of the project, not to mention ever-present funding constraints, this is probably not a sustainable way to go.

There are several services ready to use and others under development which H3ABioNet could use to make it's secure storage accessible to the collaboration. What are the tasks, the functions that need to be executed by the parties involved ? Let's take a further look.

## Authentication and Authorisation {#id}

You want to be sure you know who is accessing your precious data. This can be done by issuing credentials yourself (ie, user/pass to your resource), however this doesn't scale very well. What's more, it's difficult to know where these users are coming from. You could implement an LDAP backend for authentication, but then you'd have one more thing to adminster. Why not leave the authentication to someone else, and focus on authorisation ?

The concept of [Identity Federations](http://www.geant.net/service/eduGAIN/Pages/home.aspx) makes this separation of roles possible. While this is a modern user-friendly way to authenticate, there's also 'good old' PKI - which can be used on the service and server-side to secure and authenticate access. The best case scenario would be that an researcher who wants to request data to be ingested into the repository should authenticate using their local (institutional or national) identity provider, which the service would trust, since it would be included as a service provider in a federation. Authorisation would be done via a local database (ldap, perhaps, but just containing the identities of the trusted users, not their credentials) - or could be done centrally using a system like [Perun](https://perun.metacentrum.cz).

It can't be taken for granted, however, that users will actually have access to local identity providers - let alone have them included in a trusted federation. While Meraka is leading the creation of a national Identity Federation, this is still a way off[^IdFstatus], and we expect institutional identity providers to be a little further down the line as well. However, in the meantime, there are several catch-all services which the project can use.

## Catch-All and Social Identity Management

In SAGrid and more generally in AAROC, we offer catch-all services both for Identity Provision using Shibboleth, as well as x.509 certificates from a trusted Certificate Authority [^CAstatus]. The IdP  is included in a [catch-all federation](https://gridp.garr.it) which will soon be included in EduGain.

> you can use it right now - [register](https://idp.sagrid.ac.za/register)

Your colleagues can probably use something similar in their own countries too - we have thes IdP's in [Tanzania](https://idp.ternet.or.tz), [Kenya](https://idp.kenet.or.ke), [Nigeria](http://https://ngidp.eko-konnect.net.ng/),  [countries covered by the Arabian States Research Network](https://idp.asren.net) and several othes worldwide[^IDPlist]. If there's a need for an IdP in a country not covered by these, we can easily deploy one, the code is [on github](https://github.com/brucellino/SAGridIdP) and I've written a [page](https://ops.sagrid.ac.za/trac/wiki/IdPLdapInstallationGuide) on how to configure it. We even have an agreement with [Comodo](https://www.comodo.com) to issue commercial-grade certificates to these IdP servers in order to include them in the production federation... there's not much standing in the way of you getting one up and running right now - except of course the fact that it has to abide by federation policies. These are nontrivial, but not crazy.

### Social networks

There is a final point to be made on identity providers: **most of us already have one, if not several !**

You'd be hard-pressed to find someone who didn't have a google, facebook, twitter or linked-in account (not to mention github !). Thes are already being used to authenticate users of various applications and services, so it would make sense -- if used judiciously -- to leverage these existing identity providers to authenticate users of the one that H3A BioNet is developing. The main issue here is ensuring that a social identity corresponds to the correct person in real life, since there is no institutional quality assurance on this. In the catch-all IdF we're using, this checking is usually done by first contacting the user on a separate channel and requesting further information not provided by the IdP[^attributes]. As we'll see later, this is becoming very commonplace.

## Authorisation

I touched on using Perun to manage authorisation above. According to the [Perun public website](http://perun.cesnet.cz/web/):

> Perun covers management of the whole ecosystem around the users' identities, groups, resources and services. Perun is well suited for managing users within organizations and projects, managing access rights to the services. It provides functionality to manage all entities (e.g. users, groups, virtual organizations, resources, services) and theirs relationships.

We're working with [CESNET](https://www.cesnet.cz) (the developers of Perun) to host such a centralised authorisation service at Meraka[^MerakaPerun]. The benefit to H3A BioNet is that the collaboration can again focus specifically on the service it wants to provide, instead of the overhead for providing it - no need to manage a separate LDAP instance specifically for the data archival service, just define the authorisation in Perun and allow it to manage your service remotely. Even the centralisation of the service can be discussed...

# Data Management {#data}

So, AuthN/AuthZ can be solved and provided as service, we can get to the meat of the issue - data management. Data management is not a simple matter, and usually can be considered in three aspects:

> 1. storage
> 1. movement
> 1. discoverability[^private]

## Data movement

Let's take a look at actually getting the data to Cape Town in a secure, efficient manner. These data sets can be up to several 10's of GB in size, with transfer rates around a few GB/day with very spiky activity. Ignoring for a moment the very real need to courier disks from certain places on the continent where the bandwidth will just *not be sufficient*, the collaboration has come up with a document describing an SLA for data ingestion. After some discussion, I would interpret their needs into the following:

- simple web-based user interface
- end-to-end security
- reliable transfer protocols
- fast transfer rates

Let's see how they could do this and which tools might apply (in some, undetermined order)

### Security

By *'end-to-end' security*, we mean that the data entering the storage area

- originates from a trusted source and
- is transported using a secure, private protocol.

Ignoring the actual *content* of the data to be transferred and assuming that validation of the data will be dealt with at the staging area I propose that end to end security can be achieved by including the ***sending***, ***receiving*** and ***transferring*** parties within the same trust domain, using PKI:

Sending party
 : This is the actual user sending the data. The identity, as I've proposed before, could be provided by any number of federated means, not necessarily by the service itself. However, federated identities are not within the trust domain, we need to map the identity to a trusted one, using an authorisation plugin. This will map the federated identity onto a proxy of an x.509 digital robot certificate issued by a trusted CA.

Receving party
 : The receiving party is the storage endpoint, which would expose a secure interface such as GSI-FTP[^gsiftp], WebDAV[^WebDAV] or HTTP. The security on the receiving side would be provided again by an x.509 host certificate issued to the storage endpoint.

Transferring party
 : The transferring party is the agent which actually initiates, executes and monitors the transfer. Instead of being done by the user itself, this agent should be a proxy, mapped from the user's credentials. This is done by creating a short-lived proxy of a robot certificate - authorisation for issueing the proxy is of course taken care of by the web interface which we'll discuss below.

### Transfer reliability

A robost, reliable transfer protocol is needed in order to make efficient use of
the bandwidth available. The 'bandwidth available' has a very wide range,
considering the plactes we're expecting transfer to originate from, and may even
venture into the 10 GB/s range. In these cases, you want a protocol which can
efficiently use that pipe. GridFTP does this by separating the control and
transfer channels, such that a single control channel is opened to the receiving
side, which responds with a list of ports on which it's going to listen for data
transport. These can be as many as you like - hundreds or even thousands of
parallel streams are possible - but actual performance [depends a lot on what's
between the the sender and the
receiver](http://fasterdata.es.net/science-dmz/science-dmz-architecture/), in
network component terms.
We'll get to that in a bit...

Regardless of *performance*, *reliability* is a key factor. Due to the precious nature of this data, once a transfer is initiated, we need to be sure that it completes properly. To quote the [Globus website](http://toolkit.globus.org/toolkit/data/gridftp)

> In many cases, reliability is more important than speed. ... To enable reliability, GridFTP ...  automatically sends restart markers (checkpoints) to the client.
> If the transfer has a fault, the client may restart the transfer and provide the markers received.
> The server will restart the transfer, picking up where it left off based on the markers.

This checkpointing/restarting is not usually provided by vanilla FTP or rsync[^rsync-checks].

### Transfer performance

As hinted to above, GridFTP will also likely outperform "traditional" transfer protocols such as ftp, rsync, etc, since it's designed for high throughput. Of course, insisting on using it *exclusively* is probably not a wise thing to do, but using it as a default would at least ensure some baseline performance. The main point is to ensure that the receiving side does not have intrinsic limitations which would negate any performance offered by the protocol. The [ESNet Science DMZ pages](http://fasterdata.es.net/network-tuning/) have some good advice as to how to tune the reciving host kernel, filesystem, etc.

This brings us to a discussion on the interface to these services.

### User interface

There are of course command-line interfaces to all of the above, because [**of course there are.**](http://uni.xkcd.com/). It's really useful in most cases
<figure class="">
<img src="http://imgs.xkcd.com/comics/command_line_fu.png" alt="you know there was going to be an xkcd in this somewhere">
</figure>
However, these are probably not going to be palatable to the majority of users which need to shift data, because **of course it isn't**.

While H3ABioNet could (and probably should) develop a web-based tool which uses these protocol via a nice GUI, there's a very nice way to get started, using [Globus Online](https://www.globusonline.eu) [^GlobusGenomics]. Globus Online makes provision for various authentication methods, and you can specify your own endpoints. The service requires that you are indeed able to authenticate to these endpoints, and then will manage transfers to and from them, reliably.

Authenticating to these endpoints implies all of the security considerations raised above; specifically, the user needs

  1. to have a credential which is trusted by the endpoint - this typically means being mapped onto an x.509 certificate or ssh key.
  1. access to a [myproxy](http://toolkit.globus.org/grid_software/security/myproxy.php) server where they can store credentials safely.

Both of these requirements are provided by the Africa-Arabia Regional Operations Centre[^myproxy] and need not be operated by the collaboration itself (this is always an option though).

It should be noted this service has some limitations for the long-term.
GlobusOnline has recently moved to a freemium[^GlobusFreemium] model, which may
imply that usage could move to a subscription service. There are currently two
instances of this service -- one in the U.S. and one in Europe[^GlobusOnlineAnnouncement].
It's not clear to me whether it's possible to host a "private" or standalone instance; I suspect not. GlobusOnline is not the only way to make a pretty interface to quite standard services already available on the grid:

- [GridBox](http://sourceforge.net/p/ctsciencegtwys/glibrary/gridbox/ci/master/tree/) - part of the [gLibrary](http://sourceforge.net/projects/glibrary.ctsciencegtwys.p/) project implements something very similar
- [Catania Science Gateways](catania-science-gateways.it) Data Engine[^DataEngineRef] goes even further to implement a middleware-independent layer to different kinds of storage, leveraging JSR and OGF standards to develop portable components for science gateways.

These alternatives, as far as I know, are actively being pursued by the H3ABioNet collaboration to develop a user-friendly, standards-compliant, secure web-interface to the data staging area.

### Data movement summary

In summary, I propose that the services necessary to satisfy the design constraints of the collaboration are already in place. Care needs to be taken to quickly develop a demonstrator, using these services, in order to find the 'devils in the details'. I'll provide some concrete steps in [the Implementation section](#Implementation)

## Data Management

There is a lot of freedom in terms of data management, but again the H3A BioNet collaboration has defined a minimum level of service which it will offer users and relying parties of the data staging area. Essentially, I interpret these aspects as

High Availability and reslience
: The storage area needs to be available near 100 % and needs to be 100 % reliable. This means proper disaster recovery capability, including **off-site storage**.

Adequate and scalable capacity.
: The data staging area can't afford to reject transfers from field workers due to insufficient capacity. On the other hand, data size will grow over time (perhaps unpredictably) so it would be wise to acquire a subset of the project storage capacity, reserving the capability to scale it later.

Long-term preservation
: The value of the data means that considering long-term preservation, while not an urgent issue, is of utmost importance. Of course, the final products may be stored in the [EGA](https://www.ebi.ac.uk/ega/home), but there is a strong case for preserving the raw data in Africa.

Curation
: Curation in this case refers to putting in place a metadata system that will ensure that the data is understandable in the long run. It could also refer to a data referencing scheme (read: data sets with *DOI*'s or *handles*) but again, this is somewhat out of scope and will probably be provided anyway by EGA.

I will leave issues of data replication (single-namespace) and metadata issues to perhaps a further article[^replication]. Let's take a closer look at these issues and discuss possible solutions to the needs of the collaboration.

### Availability and resilience

The data staging area is going to be operated by the [CBIO](http://www.cbio.uct.ac.za) at the [University of Cape Town](http://www.uct.ac.za), which has a very good data centre. The university's [Information and Communication Technology Services](https://www.icts.uct.ac.za) (ICTS) has made very significant investments in hardware, offering several PB of raw storage space. This is offered as a service to research communities, provided an SLA is in place to define the scope and level of the service. While similar services (perhaps not at the same scale as UCT's) are also offered by several other institutes, including the [Centre for High-Performance Computing](http://www.chpc.ac.za), UCT offers significant advantages:

- Research data gets the same backup treatment as enterprise data and is included in the regular schedule of backups
- Off-site backup is provided for disaster-recovery capability
- UCT's data centre has adequate national and international bandwidth to handle the incoming and outgoing data rates.

It should be noted that the decision on where to host the data needn't exclusively privilege a single site.
Flexibility on data staging could easily be built into the system, while still
ensuring that all data eventually arrives in the central staging
area[^monitoring].
In the [Implementation](#Implementation) section below, we make no assumptions on the location of the services implemented, so different sites could be used as seen fit by the collaboration without changing the usage model.

### Scalability and Capacity

The **capacity** required by the collaboration is $$ O(PB) $$, which poses a significant but not unsurmountable challenge. This can easily be addressed by putting in place something like the storage pods from [45 Drives](http://www.45drives.com) -- which the likes of the [SKA](https://www.ska.ac.za/) are doing -- the hardware really doesn't matter that much, as long as one can easily scale it. Another point to consider is filesystem preformance and scalability. Lets's not get into the *"which filesystem should we use"*, but perhaps we can agree that[^nogpfs]

> There's no reason to use a proprietary filesystem.

Probably good choices would be [ZFS](http://en.wikipedia.org/wiki/ZFS) or [BTRFS](http://en.wikipedia.org/wiki/Btrfs)... but even this misses the point that a parallel filesystem like [CePH](http://ceph.com/) is definitely the way to go. Wait, that should totally be quotable:

> **Ceph : it's definitely the way to go**

### Data management summary

There are several distributed filesystems out there, and to avoid descending into vulgar name-calling and slinging of opinions, I refer to the recent work of Depardon, Le Mahec and Séguin[^DFScomparison]. Some thought needs to go into  the integration of these with the standard grid middleware I'll mention below, though.

# Implementation {#Implementation}

Let me now describe a specific implementation schema which would produce a working demonstrator as alluded to before.

## Infrastructure and Service Providers

The H3A BioNet project can be considered a 'peer infrastructure', or 'relying
party' of the Africa Arabia Regional Operations Centre. In order for AAROC to
provide support and services, we need to first define which services will be
provided.
The services which H3A BioNet will be using are:

Certificate Authority
: The various e-Science CA's under the ROC will issue digital certificates to users, services and hosts as needed.

Identity Providers
: Users can use catch-all or social identity providers to authenticate to a web-based user-interface to stage data

Virtual Organisation Membership Service
: A [VOMS](https://github.com/italiangrid/voms) service will be made available to the collaboration so that they can manage the members of their collaboration via a Virtual Organisation.

Authorisation service
: Perun will be used to manage the  authorisation of distributed resources, particularly regarding the VO and IdP imports.

Access to e-Infrastructure services
: The new VO will be enabled sites in the ROC, across the region and, where necessary, beyond. This will allow members of the VO to easily access computational and data resources seamlessly as well as permit them to copy data securely (within the VO) to local storage before staging it to Cape Town.

Operations tools
: In accordance with the standard resource centre Operating Level Agreement[^ola], operation of resources falls within the domain of the site operations team, while operation of the middleware falls within the domain of the GridOps team. Monitoring of the middleware at an infrastructure level is provided, as well as integration with the [GGUS](https://ggus.eu) ticketing system, the [EGI Operations Portal](https://operations.egi.eu/portal) and the [Operations Database](https://goc.egi.eu). H3ABioNet will be responsible only for their VO activities.

## Middleware

The ROC supports the following middleware stacks:
  
- [EMI-3](https://www.eu-emi.eu/releases/emi-3-montebianco/)
- [UMD-3](http://repository.egi.eu/category/umd_releases/distribution/umd-3/)
  
The products in these stacks satisfy all of the functional requirements described above.

## Deployment and Integration

Most services needed to satisfy the requirements of the collaboration for data staging are already in production. The provisioning of a data storage area for the collaboration was recently discussed and agreed to in principle by ICTS. In  order to integrate the staging area into the ROC, so that users and services can use it, we need to deploy a properly-configured grid storage element and register it in the GOCDB. This endpoint could be **DPM**, **xrootd**, **SRM** or **iRODS**[^GocdbServiceTypes]. All storage elements in the ROC, which support VO's are immediately usable by GlobusOnline[^GlobusOnlineCookbook]. UCT ICTS needs to provide the storage element (which can be remotely executed with [Ansible](http://www.ansible.com)[^ansibleforgrid].)

## Demonstrator

A realistic demonstration of the full service might include the following scenario :

> User far away (*e.g.* Tunisia) wants to stage data

The following workflow would be executed:

 1. Optional - user authenticates to VO and stores data on a local storage element.
 2. User authenticates to GlobusOnline and activates local and remote storage endpoints
 3. User requests data transfer to UCT using GlobusOnline
 4. Data is stored in staging area and (optional) registered in VO-level file catalogue.

# Next steps and Summary. {#next}

The next steps would be simply to deploy the SE at UCT, and run the demo. Of course, performance tuning is a whole other story - we proposed to write a baseline study of real-world expectations during the demo, and the update this at various points during the course of the collaboration's activities. We can use dummy data for this, varying file sizes, parallel streams, endpoints, etc.

In summary,

> We've got this covered

----

# Footnotes and References

[^IdFstatus]: The project is being led by SANREN and major South African Universities. SANREN reports that the IdF should be in beta phase by June 2014.
[^CAstatus]: [The SA e-Science CA](https://security.sanrenn.ac.za/CA) is now in public beta and awaiting accreditation proceedings.
[^IDPlist]: For a full list of providers in this federation, see [http://gridp.garr.it/identity-providers.html](http://gridp.garr.it/identity-providers.html)
[^attributes]: The attributes exchanged by the IdP's and the federation usually include the institute that the user comes from, along with personal information (which is limited to name, surname and email address).
[^MerakaPerun]: The instance is currently in beta at [the CSIR's C4 cloud](https://perun.c4.csir.co.za)
[^private]: We'll leave discoverability out of the mix for now, since this is private data.
[^gsiftp]: GSI-FTP, or [Grid Security Infrastructure](http://en.wikipedia.org/wiki/Grid_Security_Infrastructure)-enabled FTP, *aka* [GridFTP](http://toolkit.globus.org/toolkit/docs/latest-stable/gridftp/key/#gridftpKey) is high-performance, secure, reliable transfer protocol which extends the FTP protocol.
[^WebDAV]: [Web Distributed Authoring and Versioning (WebDAV)](http://www.webdav.org/) - [http://en.wikipedia.org/wiki/WebDAV](http://en.wikipedia.org/wiki/WebDAV)
[^rsync-checks]: `rsync` will indeed check the outcome of the transfer, but only after the full transfer; retry in the case of failures is up to the sender to manage.
[^GlobusGenomics]: If you've got the money and don't care too much about data ownership, you can get an entire cloud-based workflow with [Globus Genomics](https://www.globusonline.eu/genomics/). Probably not 100 % applicable in H3A BioNet's case, but worth keeping in mind.
[^myproxy]: The myproxy server is hosted for the ROC at Meraka, but any myproxy server can be used. However, until accreditation, SA e-Science CA (or other CA's in Africa under certification) certificate  proxies will only be trusted by our myproxy server; if users have IGTF-accredited certificates, they can store them in *e.g.* `myproxy.cern.ch`
[^GlobusFreemium]: Foster, Ian; Vas Vasiliadis; Tuecke, Steven (2013): Software as a Service as a path to software sustainability. figshare. [doi:10.6084/m9.figshare.791604](http://dx.doi.org/10.6084/m9.figshare.791604)
[^GlobusOnlineAnnouncement]: This was announced in 2012, precisely because of data protection laws in the EU. See [the EGI.eu announcement](http://www.egi.eu/news-and-media/newsfeed/news_0165_GlobusOnline_goes_live.html)
[^DataEngineRef]: "A Data Engine for Grid Science Gateways Enabling Easy Transfer and Data Sharing"; M. Fargetta, R. Rotondo, R. Barbera at [The International Symposium on Grids and Clouds (ISGC) 2012](http://indico3.twgrid.org/indico/contributionDisplay.py?sessionId=39&contribId=59&confId=44)
[^replication]: The data staging area is conceived as a central area - off-site replication is therefore not part of the design. Nonetheless, it may be useful to plan for this in the long-term, at least for anonymised data. Replication also implies a metadata system.
[^monitoring]: It should however be pointed out that a monitoring and alerting system will be necessary to know the state of the various transfers and the staging area itself, which will be left for a separate article.
[^nogpfs]: I'm looking at you GPFS.
[^DFScomparison]: "Analysis of Six Distributed File Systems" Depardon, Le Mahec and Séguin; [hal-00789086](http://hal.inria.fr/hal-00789086)
[^ola]: All sites in the Region are required to sign and adhere to an [Operating Level Agreement](https://documents.egi.eu/document/31) which defines the level of operation and service level requirements, such as compute and other capability, middleware, support, security, etc.
[^GocdbServiceTypes]: See [GOC DB Documentation](https://wiki.egi.eu/wiki/GOCDB/Input_System_User_Documentation#Service_types)
[^GlobusOnlineCookbook]: See the [EGI.eu documentation](https://wiki.egi.eu/wiki/Globus_Online_cookbook_for_EGI_VOs)
[^ansibleforgrid]: See the [ansible playbooks](https://github.com/AAROC/ansible-for-grid) for AAROC services. Remote deployment is possible with only ssh access to the remote machines - the identity of which is also managed with Perun.
