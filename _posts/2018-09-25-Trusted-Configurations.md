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

Let's consider a world with just the two most widely used configuration management tools right now[^SorryQuattor].

<figure>
  <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1544_RC03/embed_loader.js"></script>
  <script type="text/javascript">
    trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"/m/05cjv7","geo":"","time":"2007-08-25 2018-09-25"},{"keyword":"/m/0k0vzjb","geo":"","time":"2007-08-25 2018-09-25"},{"keyword":"/m/0l8my_1","geo":"","time":"2007-08-25 2018-09-25"},{"keyword":"/m/08_7zcp","geo":"","time":"2007-08-25 2018-09-25"},{"keyword":"YAIM","geo":"","time":"2007-08-25 2018-09-25"}],"category":32,"property":""}, {"exploreQuery":"cat=32&date=2007-08-25%202018-09-25&q=%2Fm%2F05cjv7,%2Fm%2F0k0vzjb,%2Fm%2F0l8my_1,%2Fm%2F08_7zcp,YAIM","guestPath":"https://trends.google.com:443/trends/embed/"});
  </script>
<figcaption>Google trends for various configuration management tools. While search trends are perhaps not the best metric, they're the easiest to generate. Also: Ansible picks up speed <a href="https://github.com/AAROC/DevOps/commit/c2187b5e762dae5efe681f01aa10e327e5fc8f80">around the same time I start using it heavily</a>... <em>Coincidence?</em></figcaption>
</figure>
It is difficult to say _why_ Ansible or Puppet have the following they have in certain environments.
There are design and ecosystem considerations which suit different scenarios better in each case.
Both can be used to achieve continuous, correct deployment. 
So the question is **does it matter** to the site admin whether a product expresses a preference for either ? 

**I hazard that it should not.**

> UMD deployment should be a conservative force[^ConservativeForce] : \\
> End states should not depend on the path taken to get there

Indeed, having more than one tool can bring certain benefits to the ecosystem.

### It's code, treat it as such



### Pair Programming

Developing configuration and deployment scenarios for a particular middleware component with two different tools can be thought of as a form of [Pair Programming](https://en.wikipedia.org/wiki/Pair_programming).
There are a few potential benefits from pair programming, to quote [the Agile Alliance](https://www.agilealliance.org/glossary/pairing/#q=~(filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'pair*20programming))~searchTerm~'~sort~false~sortDirection~'asc~page~1)):

> - increased code quality: "programming out loud" leads to clearer articulation of the complexities and hidden details in coding tasks, reducing the risk of error or going down blind alleys
> - better diffusion of knowledge among the team, in particular when a developer unfamiliar with a component is pairing with one who knows it much better
> - better transfer of skills, as junior developers pick up micro-techniques or broader skills from more experienced team members

Pair programming allows better collaboration and quality code review.
If both tools should achieve the same state for a given middleware product, we should be able to review each others’ work.
One may counter that we are using different languages and paradigms -- how can we review each others’ work in such a situation?
The answer lies in what is truly important: **patterns** instead of specific implementations.

### Cross-validated deployments

> Why are there four experiments at the LHC?

Another reason to rejoice that there is more than one tool is the same reason that there is more than one experiment at the LHC: **cross-validation**.

There are always biases and assumptions in deployment and configuration scenarios -- these make their way into the code for deployment.
They implicitly exclude certain use cases or scenarios.

Cross-validating deployments with different tools tends to surface these assumptions and force us to confront them.
A good goal would be to achieve _consistent deployments_ from a given state, _regardless of the means_ to achieve it.

### A healthy ecosystem

In any ecosystem, a monoculture is a sign that things are heading for collapse.
Reliance on a single tool and tribal knowledge around it is not a good sign, but healthy ‘inter-breeding’ of ideas from slightly different ways of doing things can probably lead to better health of the UMD ecosystem and whatever proceeds it.

Being forced to accept different tools, we can teach patterns and skills rather than tools.
This approach has the double benefit being useful to world beyond our borders in commerce and industry, while simultaneously making it easier for us as a community to attract talent from that world.

In summary: having Ansible in the UMD world can bring significant benefits, as long as it's done in a way that supports and contributes to that world.
Let's take a look at how that may come to be.

## UMD in the Ansible world

Don't take it from me, take it from the horse's mouth[^Ansible]: 

> Ansible is a radically simple IT automation engine

It is so simple that it can be really tempting to just _solve problems quickly_ and be done with it.
However, this same power leads to massive divergence in the way in which problems are solved, making it difficult to trust that other peoples’ work will work for you.
As an example, consider that you are a site administrator responsible for deploying and maintaining a CREAM CE.
You decide to use Ansible - excellent choice[^MyStory]!
Typically, it's best to re-use existing code, so you look for an Ansible role for configuring CREAM.
Perhaps you even find one on [Galaxy](https://galaxy.ansible.com/)[^NoCream], but you don't know anything else about it.
Immediately, some questions come to your mind:

  - Will it respect my local setup ?
  - Does it do the network configuration ?
  - Who maintains this?
  - Is it even _correct_?

It is impossible to answer these questions without digging into the code itself and judging for yourself, but we have admitted that we don't want site administrators to have intimate knowledge of arbitrary configuration management systems.

We need some objective measure of quality which the role can be measured against.

### The EGI Style Guide

The first step in developing trusted configurations for UMD with Ansible is therefore to develop a [style guide](https://egi-foundation.github.io/ansible-style-guide/).
I first announced this [in a previous blog post](https://brucellino.github.io/blog/Ansible-Style-Guide) and expanded on it in a [subsequent on](https://brucellino.github.io/blog/Style-Guide-In-Action).
The guide helps those re-using roles trust those developing them, by expressing a few opinions on:

  - Documenting roles
  - Usage of Ansible syntax in roles
  - Testing role scenarios, testing tools
  - Role release and publication
  - Collaborating with code

It builds upon several tools for checking the quality of code, as well as the Ansible guide itself and includes:

  * **A better Ansible role skeleton**: When creating new roles, one typically uses `ansible-galaxy init <role name>`. \\
  The default skeleton has several important bits ‘missing’ which are necessary for engendering re-use and trust. \\
  With `ansible-galaxy init --role-skeleton=ansible-style-guide/egi-galaxy-skeleton <role name>` you get:
    - Issue and PR templates, contributing guide, links to EGI support structures
    - Relevant platforms which EGI supports in `meta.yml`
    - Properly-generated `.travis.yml`
    - Proper webhooks to notify [Galaxy](https://galaxy.ansible.com) on build-passing
  * **A compliance profile**: [EGI-Foundation/ansible-fashion-police](https://github.com/EGI-Foundation/ansible-fashion-police) written with [InSpec](https://inspec.io) which implement controls for:
    - Automated testing
    - GitHub repository configuration
    - Role Metadata
    - Role Skeleton

This style guide therefore provides important context and objective measures of quality to the development of Ansible roles intended for use in EGI.

### One role, many scenarios

### Testing and Trusting

### Better use of existing infrastructure

## DevOps

---

# References and Footnotes

[^we]: It is difficult to know who will associate with this "we" I refer to here. I intend this to cover the community of site administrators, middleware developers, members of co-ordinating projects and institutes which has contributed to and still uses components of the EGI ecosystem.
[^YaimCore]: Aiftimiei, C. (2013, May 28). EMI YAIM CORE V. 5.1.1. Zenodo. http://doi.org/10.5281/zenodo.6824
[^GetItWhileYouCan]: It seems that YAIM itself is not published anywhere. If anyone has the citation for it, with a DOI, please let me know.
[^YakShaving]: See [this article](https://sciencenode.org/feature/isgtw-technology-yaim-herding-glite-configuration.php) from the good old days of EGEE.
[^SorryQuattor]: No disrespect meant, Quattor.
[^ConservativeForce]: I mean that in the physical way - that the work done (_i.e._ final state) is independent of the path https://en.wikipedia.org/wiki/Conservative_force
[^Ansible]: See [How Ansible Works](https://www.ansible.com/overview/how-ansible-works)
[^MyStory]: This is my story! I'll decide who the heros are...
[^NoCream]: Spoiler Alert: there are no roles on Galaxy for CREAM. That's what we're here to fix.