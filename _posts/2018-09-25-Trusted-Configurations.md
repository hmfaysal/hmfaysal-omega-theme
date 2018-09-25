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

We[^we] used to have a unique configuration management tool: [YAIM](https://twiki.cern.ch/twiki/bin/view/LCG/YaimGuide400)[^YaimCore][^GetItWhileYouCan].
YAIM seems to have been born in a fit of exasperation[^YakShaving] resulting from the complexity, in the time before configuration management tools.
There was no Puppet, no Ansible, no Salt, no Chef... at most one could have hoped for a proto-Quattor.

The positive aspect of this monoculture was that there was not much room for confusion: learn how YAIM works, and it will do most of what you need it to do.
Sure, there may be parts of the system which it cannot be held responsible for, but in the wide and massively distributed grid world of the '90s and first decade of the 21st century, it worked.
Not bad for a bunch of shell scripts.

<figure>
<img src="../images/squirrel-sword.jpg">
<figcaption class="text-center">Spoiler Alert<br><small>Image courtesy of <a href="https://hvops.com/articles/ansible-vs-shell-scripts/">High-Velocity Ops</a></small></figcaption>
</figure>

YAIM actually served two purposes: **configuration management** and **deployment**.
Configuration data was written into the tool itself, in the form of a series of configuration files read as input.
This desired state was then achieved by YAIM itself by executing the "bunch of shell scripts" alluded to before.
This made it a bit difficult to separate configuration management from deployment.

### Site configuration management

**Things have changed**.
Configuration management tools have grown to maturity and are now critically important to the success of any software-driven enterprise. 
We have entire stacks to choose from now, which solve problems all the way from development through testing, deployment and monitoring in production.
One the one hand, this is great for sites -- more choice is better, right?
If the team at a site has gained experience in a particular language (Go, Ruby, Python), they would naturally levitate to a particular stack or ecosystem which is written in that language (Hashi stack, Chef/Puppet, Ansible/SaltStack).

However, it wasn't up to the sites.

The middleware products evolved independently, so they each ended up choosing their _own_ preferred configuration management tools.
This means that a site now _needs_ to adopt the stack that the product mandates if they are to deliver that component properly.
If they wanted to stick with their configuration management tool of choice, for whatever reason, it might mean that the product team couldn't support them in debugging configuration issues, which may have a severe impact on the state of the service in production.

Are we really proposing a world in which all site admins need to know a plethora of configuration management stacks?
That doesn't sound feasible. It doesn't have to be that way.

### The benefits of many tools



## UMD in the Ansible world

### The EGI Style Guide

### Objective measures

### One role, many scenarios

### Testing and Trusting

### Better use of existing infrastructure

## DevOps

---

# References and Footnotes

[^we]: It is difficult to know who will associate with this "we" I refer to here. I intend this to cover the community of site administrators, middleware developers, members of co-ordinating projects and institutes which has contributed to and still uses components of the EGI ecosystem.
[^YaimCore]: Aiftimiei, C. (2013, May 28). EMI YAIM CORE V. 5.1.1. Zenodo. http://doi.org/10.5281/zenodo.6824
[^GetItWhileYouCan]: It seems that YAIM itself is not published anywhere. If anyone has the citation for it, with a DOI, please let me know.
[^YakSaving]: See [this article](https://sciencenode.org/feature/isgtw-technology-yaim-herding-glite-configuration.php) from the good old days of EGEE.