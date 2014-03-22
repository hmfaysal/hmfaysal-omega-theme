---
layout: post
title: "Moving data safely for H3A"
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

>  an NIH-funded Pan African Bioinformatics network comprising 32 Bioinformatics research groups distributed amongst 15 African countries and 2 partner Institutions based in the USA.

while the main goal is : 

> to create a sustainable Pan African Bioinformatics Network to support H3Africa researchers and their projects through Bioinformatics capacity development on the African continent. 

A large part of the activities of this network is shifting data. Since it's **human genomic data** it has to be moved from where it's collected with extreme care. The data will be collected by field workiers collaborating on the project, all over Africa and sent to a secure staging environment in Cape Town where it can be processed (*e.g.* anonymised). Here, I summarise some thoughts and plans around how this task can be tackled using the services of the [Africa-Arabia Regional Operations Centre](https://roc.africa-grid.org).


# General considerations and requirements

[CBIO](http://www.cbio.uct.ac.za) is the partner who is responsible for processing the collected data safely and securely. As such, they need to provide a secure storage area, which is nonetheless able to accept incoming data from around the African continent. This can of course be done the *easy* way or any number of *right* ways (there are, as always, many ways to skin this cat, depending on what one takes into account).  If this were a project in the '90s, the solution would have probably looked like 

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


# Authentication and Authorisation
You want to be sure you know who is accessing your precious data. This can be done by issuing credentials yourself (ie, user/pass to your resource), however this doens't scale very well. What's more, it's difficult to know where these users are coming from. You could implement an LDAP backend for authentication, but then you'd have one more thing to adminster. Why not leave the authentication to someone else, and focus on authorisation ? 

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

I touched on using Perun to manage authorisation above. According to the [Perun public website](http://perun.cesnet.cz/web/) : 

> Perun covers management of the whole ecosystem around the users' identities, groups, resources and services. Perun is well suited for managing users within organizations and projects, managing access rights to the services. It provides functionality to manage all entities (e.g. users, groups, virtual organizations, resources, services) and theirs relationships.

We're working with [CESNET](https://www.cesnet.cz) (the developers of Perun) to host such a centralised authorisation service at Meraka[^MerakaPerun]. The benefit to H3A BioNet is that the collaboration can again focus specifically on the service it wants to provide, instead of the overhead for providing it - no need to manage a separate LDAP instance specifically for the data archival service, just define the authorisation in Perun and allow it to manage your service remotely. Even the centralisation of the service can be discussed... 

# Data Management

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

A robost, reliable transfer protocol is needed in order to make efficient use of the bandwidth available. The 'bandwidth available' has a very wide range, considering the plactes we're expecting transfer to originate from, and may even venture into the 10 GB/s range. In these cases, you want a protocol which can efficiently use that pipe. GridFTP does this by separating the control and transfer channels, such that a single control channel is opened to the receiving side, which responds with a list of ports on which it's going to listen for data transport. These can be as many as you like - hundreds or even thousands of parallel streams are possible - but actual performance [depends a lot on what's between the the sender and the receiver](http://fasterdata.es.net/science-dmz/science-dmz-architecture/), in network component terms. 	We'll get to that in a bit... 

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

It should be noted this service has some limitations for the long-term. GlobusOnline has recently moved to a freemium[^GlobusFreemium] model, which may imply that usage could move to a subscription service. There are currently two instances of this service -- one in the U.S. and one in Europe[^GlobusOnlineAnnouncement]. It's not clear to me whether it's possible to host a "private" or standalone instance; I suspect not. GlobusOnline is not the only way to make a pretty interface to quite standard services already available on the grid:

 - [GridBox](http://sourceforge.net/p/ctsciencegtwys/glibrary/gridbox/ci/master/tree/) - part of the [gLibrary](http://sourceforge.net/projects/glibrary.ctsciencegtwys.p/) project implements something very similar
 - [Catania Science Gateways](catania-science-gateways.it) Data Engine[^DataEngineRef] goes even further to implement a middleware-independent layer to different kinds of storage, leveraging JSR and OGF standards to develop portable components for science gateways.
 
These alternatives, as far as I know, are actively being pursued by the H3ABioNet collaboration to develop a user-friendly, standards-compliant, secure web-interface to the data staging area. 

## Data movement summary

In summary, I propose that the services necessary to satisfy the design constraints of the collaboration are already in place. Care needs to be taken to quickly develop a demonstrator, using these services, in order to find the 'devils in the details'. 





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
[^GlobusFreemium]: Foster, Ian; Vas Vasiliadis; Tuecke, Steven (2013): Software as a Service as a path to software sustainability. figshare. http://dx.doi.org/10.6084/m9.figshare.791604
[^GlobusOnlineAnnouncement]: This was announced in 2012, precisely because of data protection laws in the EU. See [the EGI.eu announcement](http://www.egi.eu/news-and-media/newsfeed/news_0165_GlobusOnline_goes_live.html)
[^DataEngineRef]: "A Data Engine for Grid Science Gateways Enabling Easy Transfer and Data Sharing"; M. Fargetta, R. Rotondo, R. Barbera at [The International Symposium on Grids and Clouds (ISGC) 2012](http://indico3.twgrid.org/indico/contributionDisplay.py?sessionId=39&contribId=59&confId=44)
