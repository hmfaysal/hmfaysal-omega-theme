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
| surlId | url                                                                                                                       | infraId | fileId |
+--------+---------------------------------------------------------------------------------------------------------------------------|---------|--------|
|      1 | srm://se.core.wits.ac.za/dpm/core.wits.ac.za/home/sagrid/SAGridDataGateway/10594/1398247101587_grid-security.tgz          |       1 |      1 |
|      2 | srm://se.core.wits.ac.za/dpm/core.wits.ac.za/home/sagrid/SAGridDataGateway/10594/1398248657885_epikh-workshop.avi         |       1 |      2 |
|      5 | srm://se.core.wits.ac.za/dpm/core.wits.ac.za/home/sagrid/SAGridDataGateway/10508/1398263308982_go-server-13.4.1-18342.deb |       1 |      5 |
|      6 | srm://se.core.wits.ac.za/dpm/core.wits.ac.za/home/sagrid/SAGridDataGateway/10508/1398414405226_64px-PD-icon.svg.png       |       1 |      6 |
+--------+---------------------------------------------------------------------------------------------------------------------------+---------+--------+
