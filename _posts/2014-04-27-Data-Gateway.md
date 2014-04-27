---
layout: post
type: post                # ! Important
title: "Data Gateway"         # Title of the post
description: First experience and comments on Data Gateway   # Description of the post, used for Facebook Opengraph & Twitter
headline: Initial report on Data Gateway      # Will appear in bold letters on top of the post
modified: 2014-04-27        # Date
category: DataGateway
tags: [einfrastructure service, data gateway, H3Africa, H3A-BioNet, Liferay]
image: 
  feature: 
comments: true
mathjax:
---

TL;DR : We've started a new service for uploading data - the ["Data Gateway"](https://data-gateway.sagrid.ac.za). It's working, but there we need some effort to prioritise development.


# What is it ? 
The Data Gateway is part of the [Catania Science Gateways Framework](https://catania-science-gateways.it). We're already using it's ''sister'' component, the Grid Engine, in the [SAGrid Science Gateway](https://science-gateway.sagrid.ac.za). The Data Gateway acts in the same way as the Grid Engine, as a simple user interface to distributed resources - based on [LifeRay](https://www.liferay.com/) portal, using Glassfish as an application server. Federated sign-on as usual, using Shibboleth, with an ldap and mysql backend. 

# YMMV - but we're working in on it.
This is a very-alpha release ! While the design of the portlet is stable, as well as the general workflow, there is a lot of desired functionality which has not yet been implemented. The aim of this note is to describe what we've got at this point in time and to point out areas for immediate development, prioritised according to user needs. We're taking suggestions from whoever uses the gateway of course, but for various reasons, we're going to be prioritising the needs of the H3ABioNet collaboration. 

# Functionality

> So, what can one do with it ? 

Simple - store data on the grid. 
The next question, of course is : 

> What the heck does that mean ? 

That means that you can, via this simple (too simple for now - we'll get to that in a sec) web interface, move files from your local machine to a grid storage element.

> How is that different from using the command-line interface ? 

There are two major differences : 
  1. You don't need a personal x.509 certificate
  2. Metadata is not stored in a Logical File Catalogue, but in the gateway's tracking database.

## Uploading data is really easy

First, the good news : you're '''this''' close to just uploading files to something that looks very much like cloud storage. If you have an account on an Identity Provider which is in the catch-all test federation, you can request authorisation to the portal and by going to the `my-data page`, you can select the file you want to upload. 

The user is presented with a virtual filesystem where they can create directories and organise their files. Access buttons are provided for download and delete functionality. 

## Sharing data is not that easy at the moment. 
Time for the bad news. The primary point of this system is to ''transfer'' data, not to curate, not to share, not to disseminate. 

> TRANSFER DATA, YOU DIG ?


When the user logs in, Liferay gives them a uid; all files stored on the grid are associated with that uid. Unless you've got access to the database, you can't share the data, which would entail distributing the TURL or SURL to whoever you want to share it with. 

So, pretty simple : log in, upload file, boom, it's on the grid. If this seems trivial to you, it's because I haven't gone into how much of a gamechanger this design is, and how extensible it's going to be in the near future. Behold, radness....

# The Radness - how does it work ? 

I hear you asking "How is this different to any other kind of cloud storage" ? The answer to that is in the design.

## Requirements and setup.

First of all, the installation is quite simple:
  1. Install your favourite OS (we used CentOS)
  1. Install [glassfish](https://glassfish.java.net/) application server
  1. Get the [Liferay Community Edition](https://www.liferay.com/downloads/liferay-portal/available-releases)
  1. Configure stuff... 
  
Ok, the last bit hides a few issues which you may not be able to overcome if you're starting from absolute scratch. For example, the configuration of the Shibboleth federated sign-on won't be possible if you don't have a federation in which to test the service. You need an e-token server, a robot certificate registered in a Virtual Organisation, which has resources that support it. You'll need a MySql database backend, and there's of course a lot of graphical layout work that is desirable but not 100 % necessary. Since SAGrid already has these prerequisites, we don't suggest peer collaborations like H3A going ape and installing everything themselves, but rather use the gateway as a service. 

## Configuring different types of storage

So that gateway itself is pretty useless without these supporting services, but even so it can act as a simple data storage interface, since you can configure different types of storage, not just 'grid storage'. Right now it supports 
  + '''Local storage''' : upload files directly to the gateway
  + '''Grid Storage''' : upload files to a set of distributed storage, depending on where the VO is supported.

So, even if you don't have any remote storage, you can still store files quite safely on the gateway itself, just configure the directory to the local storage and voila. 

In the future, cloud storage and remote storage over https or WebDAV will be possible. 

# Discovering Resources

After long discussions some months back, it was decided to do things Properly when adding grid resources. This means obtaining an '''authoritative''' of storage elements, based on a given identity (proxy). The authoritative source of resource information in the grid world is the [GOCDB](https://goc.egi.eu), which, happily, provides an [API to the information contained in it](https://wiki.egi.eu/wiki/GOCDB/PI/Technical_Documentation). This information is of course not entirely public, so accessing the API requires a security context which is again determined by a trusted proxy. 

The Data Gateway uses this API to connect to the GOCDB and obtain an authoritative list of site-BDIIs. These are then used to obtain a full list of top-bdiis. We are now in a position to interrogate them, to find the SE's that support the VO for which we've generated our proxy. This list is passed to the portlet which presents them to the administrator, in order to select a default.

The basic workflow is shown below

<figure class="">
	<img src="/images/Adding resources to the gateway - State Diagram.png">
</figure>

## Where does my data go ? 

As you can, you are returned a list of storage elements which are registered in the GOCDB and which according to the top-BDII's support the SAGrid Virtual Organisation. One of them is selected as a default, and this is used first every time a user attempts to upload a file. If the default SE is not available, full, or the transfer fails for whatever reason, the transfer is attempted again with the next Storage Element in the list.

## What about the metadata ? 

At this point, the file is no longer on the gateway, but transferred safely to a remote grid storage. Of course, to be able to download your file again (or interact with it in anyway), you need some kind of metadata to tell you where the file is, and what transfer protocols are supported by the remote storage. This information is kept in the database of the Data Engine, in a very similar way to the Logical File Catalogue. 

The functionality right now is quite simple - you can ask the database where your files are and how to get them


```
select * from eInfrSrv_StorageURLs;
```

| surlId | url                                                                                                                       |  infraId  | fileId |
|:--------|:---------------------------------------------------------------------------------------------------------------------------|:---------|:--------|
|      1 | srm://se.core.wits.ac.za/dpm/core.wits.ac.za/home/sagrid/SAGridDataGateway/<uid>/<hash>_grid-security.tgz          |       1 |      1 |
|      2 | srm://se.core.wits.ac.za/dpm/core.wits.ac.za/home/sagrid/SAGridDataGateway/<uid>/<hash>_epikh-workshop.avi         |       1 |      2 |
|      5 | srm://se.core.wits.ac.za/dpm/core.wits.ac.za/home/sagrid/SAGridDataGateway/<uid>/<hash>_go-server-13.4.1-18342.deb |       1 |      5 |
|      6 | srm://se.core.wits.ac.za/dpm/core.wits.ac.za/home/sagrid/SAGridDataGateway/<uid>/<hash>_64px-PD-icon.svg.png       |       1 |      6 |

## Who can see my data ? 
So, you can see that this system provides about as much security as the "typical" grid storage. If you had access to the gateway (as root, or the user which runs the service), you could see all of the data, since it's transferred first tol the gateway, then shipped to the remote storage. The data is not encrypted on the gateway before transfer to grid storage yet, so while it's being staged, it's of course as vulnerable as the machine itself is (which is to say, pretty safe, but not impenetrable).


So, it's time to consider where to go with this, and what improvements we can think of, so that we can try to prioritise them.

# Suggested improvements and additional functionality

## Integration with existing grid services

The first thing that comes to mind is that the gateway is actually re-implementing some existing features of gLite and perhaps other middelware. The LFC for example performs much the same task as the tracking database of the gateway, in keeping metadata regarding TURLS and SURLS. However, since under the hood, the gateway is using [jSAGA](http://software.in2p3.fr/jsaga/latest-release/), in order to interact with grid services, you can plug in any storage that's found in the GOCDB right now - whether it be on EGI, OSG or other regional infrastructures life AfricaGrid, independent of the middelware. The metadata could, however be improved with a bit of work, to make it compatible with the LFC or other metadata systems.

## More intelligent selection of endpoints

Currently, there's only one way to obtain a list of endpoints, and only one default. The use case envisioned by H3A indeed foresees to have data transferred to the staging area in Cape Town. However, in more general use cases, it would be useful to have a way to override this, as well as having some kind of algorithm to selct the storage endpoint on the fly, taking into account conditions at the time of transfer. Let's not get into the how for now...

## Transfers

It's clear that there's a bottleneck posed by the gateway itself - data first has to be sent to the gateway, then to whichever storage is set as default.One can imagine a case where we want to send some data from from a laptop to a storage element on the same LAN (say, in Tunisia), but which then has to travel first to the gateway (on the other side of the continent) first. Clearly this doesn't make sense, it should be possible for the gateway to initiate third-party transfers: The user contacts the gateway and request a transfer from laptop to storage. It's then up to the gateway to initiate the transfer. 

This is something that the [FTS](https://svnweb.cern.ch/trac/fts3/wiki/UserGuide) already does quite well. gLibrary's [GridBox](http://sourceforge.net/p/ctsciencegtwys/glibrary/gridbox/ci/master/tree/) apparently does a pretty nifty job too. These two solutions need to be tested and integrated with the DataEngine. 

Two other features have been floated for inclusion : Asynchronous transfers and resumable transfers.

## Security

We've touched on the fact that right now, this system is not set up for 100 % private and confidential transfers and storage. There's an easy way around this - just and store transfer encrypted data - but this is probably going to mean far larged data sizes [^1] and hence very slow trnasfers and some significant computing overhead before and after the transfer. In this case we won't have to worry about snooping, provided we keep the private key that was used to encrypt the data safe, but what we really need is an encrypted ''channel''. One way or another, there's going to be some CPU to pay. 

## User Interface

The user interface is, to say the least, very bare at the moment. It would be nice to add some features, such as graphs of the transfer speeds, current and done transfers, geographical layout of the storage endpoints, and the ability to use a GUI like that to select the storage that you want... there's plenty of work to do here, but it's essentially low-priority at the moment (unless we get told to bump it up, of course !)

## Sharing

There's currently no sharing mechanism in the portlet. This is forseen, but does not have a single, simple way to be implemented. Of course, sharing data safely and securely is different to just sharing data based on some digital identifier (URL, DOI, etc). A security context needs to be maintained, with fine-grained roles, perhaps even personal identification rather than proxies of robot certificates, given the sensitive nature of the data. This may take quite a while to implement to the requirements of H3A, but it's something that other users of the data gateway would be quite interested in. 

# Conclusions and next steps.

The data gateway is now ready for alpha testing and feedback. There is basic functionality, which needs to be heavily extended upon, but the overall design provides for highly-scalabe, simple access to secure, distributed storage. By exploiting OGF and JSR standards as well as SAML, we can build a simple, powerful interface for users to transfer data. Although there are several ideas on how to extend and improve the functionality and interface, these need to be prioritised for the main use case, H3A data transfers. 


# References

[^1]: "Efficient methodology for implementation of Encrypted File", S. Kumar, U. S. Rawat, S. Kumar Jasra, and A. K. Jain, International Journal of Computer Science and Information Security, IJCSIS July 2009, Vol. 3, No. 1 (http://arxiv.org/abs/0908.0551)
