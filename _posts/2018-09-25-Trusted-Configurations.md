---
layout: "post"
title: "Trusted configurations for UMD deployment"
description: "Summary of the presentation given to OMB September 2018"
headline: "Tested scenarios and compliance profiles for middleware deployment"
category: blog
tags: []
image: 
  feature: 
---

A massive issue has been lurking beneath the success of e-infrastructures like EGI: the complexity of configuration management in a widely-distributed, federated environment.
The stability, availability and performance of the infrastructure over the years is a testament to the quality of the processes and people involved in the rollout and update of middleware products.

However, no process is perfect and it is only natural for people to move on - even particularly dedicated and talented people.
Moreover, there is an ongoing effort to further harmonise European infrastructures, in the context of the European Open Science Cloud.
The technology underwriting the infrastructure _itself_ is rapidly evolving, with all manner of cloud, container, and serverless platforms being brought to bear.
This will mean more (and more complex) deployment scenarios, unforeseen integration issues, _etc_.

We have been thinking for some time about the issues that this presents, and how to address them systematically.
This describes how we address one small piece of the problem: **trusted configurations of the Unified Middleware Distribution**.
I will focus on the use of [Ansible](https://www.ansible.com/) in this discussion, but the issues relate to pretty much any tool.

## Ansible in the UMD world

### Site configuration management

### The benefits of many tools

## UMD in the Ansible world

### The EGI Style Guide

### Objective measures

### One role, many scenarios

### Testing and Trusting

### Better use of existing infrastructure

## DevOps

