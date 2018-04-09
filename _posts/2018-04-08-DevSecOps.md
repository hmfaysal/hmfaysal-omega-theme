---
layout: post
title: "DevSecOps"
description: "A delivery pipeline with vulnerability scanning included"
headline: "Including vulnerability scanning in the delivery pipeline"
category: blog
tags:
image: 
  feature: rawpixel-com-472352-unsplash.jpg 
  attribution: | 
                            <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px;" href="https://unsplash.com/@rawpixel?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from rawpixel.com"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white;" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px;">rawpixel.com</span></a>
comments: true
mathjax: false
---

# TL;DR 

I have been thinking about how to include a vulnerability scan in a pipeline to deliver applications to EGI FedCloud sites.

# The big picture

A CSIRT's job is never done !
A distributed computing platform is inherently open to risks, even more so a collaborative platform.
Ensuring that the platform is safe and secure for users is a thankless, full-time job.
The attack surface can be very large indeed when one considers a platform like [FedCloud](https://www.egi.eu/federation/egi-federated-cloud/) - there are several layers to it which may provide vectors for exploits.
While the majority of these can be locked down by the operators of these sites, at the end of the day, they are still used by ... well, **users**.

## Whose cloud is it anyway ?

There is the usual thin line to tread between usability, ease of access, and security.
Much of the appeal of a thing like FedCloud is the freedom of users - and the communities which they belong to - to define their own applications and workload scenarios, molding the basic infrastructure into something they are comfortable with.
In essence, by providing a common IaaS or PaaS layer, FedCloud allows users to deploy arbitrary applications, at their own speed, under their own control.
Of course, with great freedom comes great responsibility.

There is an inherent difference between users and operators : the former are trying to optimise their _usage_ of an infrastructure, while the former are trying to optimise the _stability_ thereof.
It's not that either of these player is malicious _per se_, but their different priorities generate a natural conflict - one which perhaps cannot entirely be **removed**, but which can be **mediated**.

## Something to talk about

How could subtle changes to the environment improve the relationship between operators and users ?
Perhaps the first positive step is to surface issues before they become a problem.
The second is to provide a common language for announcing vulnerabilities and clear, easy-to-execute instructions for mitigating them when detected.
With Dev (the users), Sec (the CSIRT) and Ops (the infrastructure) all on the same page, any conflicts can be discussed in an objective manner.

# Prevention is better than cure

Currently, [EGI CSIRT](http://csirt.egi.eu/) does a great job of scanning the endpoints of the infrastructure to detect vulnerabilities.
This is necessary, since these vulnerabilities are a static set, but new ones are being found continuously. Fixing machines that are already deployed is a necessity in order to provide a secure _platform_, but what about the new applications that are built and deployed by user communities ?
Wouldn't it be nice if these applications could be checked _before_ they were deployed[^maybe] ?
In a perfect world, these there would be a more-or-less well-defined pipeline through which applications could flow, before landing in the production environment.

Typically, this would include all the great things that you can imagine in a pipeline - continuous integration, testing, and delivery.
It would be awesome if we could surface the vulnerabilities or security risks **at the same time** as surfacing run-time or deploy-time issues.
Put differently, we wouldn't deploy a broken application, so why deploy an insecure one ?

# How to spot a vulnerability

That of course begs the question: 

> How do we know that an application is insecure ?

A naive answer appears to be **"Just scan the damn things for known vulnerabilities"**. Indeed there are several tools out there for doing this, including [Pakiti](https://github.com/CESNET/pakiti-server), [clair](https://github.com/coreos/clair) and others. There are also tools for delivering "compliance as code" - particularly [InSpec](https://inspec.io), [TestInfra](https://testinfra.http://testinfra.readthedocs.io/).
These tools typically compare installed _packages_  against a vulnerability database. They are designed to check OS packages. They may also work with some language ecosystems like Ruby[^Gemnasium] and Node[^AppCanary] - maybe not so much with Python or Go - but that relies on specific packages which can be matched against a vulnerability database.
These scanners do not actually do penetration testing, as is usually the case in network scanning systems, or more advanced penetration testing systems.

And herein lies the catch : **What if your applications are not delivered with pacakges**. This is indeed the case with, _e.g._ CODE-RADE, where everything is built from scratch and no "packages" are installed.
We could, for example, tag builds according to the versions of the source code built, and then match _those_ against the CVE databases, perhaps.

Although this is a _design_ feature of CODE-RADE, it may be a mere convenience for many use cases.
Users may simply hack their application into shape until it works, then tag a VM or container and call it a day.
Detecting vulnerabilities introduced in such applications is going to be a risky business **unless a true penetration testing suite can be introduced to the delivery pipeline**.
There are some tools, again mostly language specific, which can be called to the cause of keeping applications in the production infrastructure safe, _e.g._ [OWASP Dependency Check](https://www.owasp.org/index.php/OWASP_Dependency_Check)[^OWASP].

# Adding Sec to the DevOps pipeline

Let's face it, we're not running a Fortune500 company here. You can't have 100% secure applications, but we can do a damn sight better than what we've got right now ! I propose a shift from vulnerability monitoring of the infrastructure to _vulnerability testing_ of the applications before they even get there.

If development of research applications follows a continuous integration, adding compliance and vulnerability testing to the pipeline represents just another step for the application to pass.
Sure, there is a  conceptual leap to make: from "Trust me, Ops ! This opaque blob of data is totally benign!" to "Ok Ops, you've got your tests, I've got mine and they're all passing" is perhaps a big one for many.
In order to have people adopt this way, Ops needs to deliver a smoother experience and better support than they are currently delivering to users : builds for arbitrary applications, arbitrary environments and configurations and what Devs love about [12 Factor Apps](http://12factor.net) : **Dev/Prod Parity**[^DevProd].

# Something we can all trust

Once we have a pipeline, we can and should raise raise security or vulnerability issues wherever we can, along with all the infrastructure tests.
Furthermore, these tests should be separated from the application tests themselves.
In other words, if Ops provides a tested and immutable environment for Dev to build on, then the application should: 

  1. **Ensure that it can build** - Are the compilers and dependencies available ? Are the relevant infrastructure services available ?
  2. **Ensure that it is correct** - Have errors been introduced into the environment in recent commits ? Does the application maintain internal consistency in the build and execution environment provided by Ops ?
  2. **Ensure that it will run** - Does the execution environment permit the proper execution of the application, with access to relevant backing[^backing] services ?
  3. **Ensure that infrastructure remains immutable** - Has the application made detectable changes to our infrastructure ?

That last point is key. The rest of the tests (integration tests, unit or functional tests) are up to Dev. 
But trusting Dev to ensure that Prod is ok is like trusting the fox with the chickens - there's an inherent conflict of interest, even if there is, as is most often the case, no malice.
No, these tests need to be maintained by Prod, in collaboration with Sec.

# Asserting Compliance

We then come full-circle.
EGI has an extensive list of security policies which can be used as a basis for writing compliance as code. They need to get out of whatever format they're in now, and into something that can be executed. To quote the [Chef pitch for Inspec](https://www.chef.io/inspec): 

> <h3>Make Compliance Easy to Understand and Assess</h3>
> Transform your requirements into versioned, executable, human-readable code. <br />
> Detect Fleet-wide Issues and Prioritize Their Remediation <br />
> Reduce Ambiguity and Miscommunication Around Rules <br />
> Keep up with Rapidly Changing Threat and Compliance Landscapes 

With tools like this, we can _assert_ compliance and detect deviations timeously, ultimately building a more trustworthy infrastructure and a better experience for our users.

# Footnotes and References

[^maybe]: To be honest, I'm not sure whether these are checked before they reach production. I'm willing to bet that some are, perhaps for the most mature and well-supported communities, whilst the majority are just "whatever works".
[^Gemnasium]: [Gemnasium](https://gemnasium.com/) provides a service to match CVEs with gem versions.
[^AppCanary]: After being [acquired by GitHub](https://blog.github.com/2017-11-16-introducing-security-alerts-on-github/), AppCanary's vulnerability scanning service was introduced to repositories on GitHub, detecting vulnerabilities against CVE databases and alerting repository maintainers. Thanks, guys.
[^DevProd]: [Factor 10](https://12factor.net/dev-prod-parity) says "Keep development, staging, and production as similar as possible". In other words, if it passes CI, it sure as heck better not break prod.
[^OWASP]: Actually, there's a [Jenkins plugin](https://wiki.jenkins-ci.org/display/JENKINS/OWASP+Dependency-Check+Plugin) for that.
[^backing]: [Factor 9](https://12factor.net/backing-services) says "Treat backing services as attached resources". [The good work of my man Baptiste](https://github.com/EGI-Foundation/ansible-packstack) means we can do this for OpenStack services now, for example.