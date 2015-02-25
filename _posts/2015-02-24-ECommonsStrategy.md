---
layout: post
title: "A place for us all"
description: Thoughts on an e-Science Commons Strategy in South Africa
headline: "Thoughts on an e-Science Commons Strategy in South Africa"
category: blog
tags: [strategy, thoughts, blog, e-Science, e-Commons, constituency, digital divide]
image:
  feature: keep-calm-reboot-620x360.jpg
comments: true
mathjax: true
---
<!-- TOC depth:6 withLinks:1 updateOnSave:1 -->
- [TL;DR](#tldr)
- [Thoughts on Strategy for an e-Infrastructure Commons](#thoughts-on-strategy-for-an-e-infrastructure-commons)
	- [Openness](#openness)
	- [The Commons](#the-commons)
	- [Have you tried rebooting the system ?](#have-you-tried-rebooting-the-system-)
- [Systems thinking for Cyberinfrastructure.](#systems-thinking-for-cyberinfrastructure)
	- [Evolving the revolution](#evolving-the-revolution)
		- [What does the internet think of all this ?](#what-does-the-internet-think-of-all-this-)
	- [The Network won.](#the-network-won)
- [So, your place or mine...  ?](#so-your-place-or-mine-)
	- ['Government Housing' vs 'Community Projects' - ensuring constituency-based participation](#government-housing-vs-community-projects-ensuring-constituency-based-participation)
		- [The world is flat.](#the-world-is-flat)
- [The Craftsperson and the Third Career.](#the-craftsperson-and-the-third-career)
	- [DevOps, Software-Defined Infrastructure and transferrable skills](#devops-software-defined-infrastructure-and-transferrable-skills)
	- [Fork my infrastructure.](#fork-my-infrastructure)
	- [We, for one, welcome our new robot overlords.](#we-for-one-welcome-our-new-robot-overlords)
- [Conclusions and future work.](#conclusions-and-future-work)
- [References and Footnotes](#references-and-footnotes)
<!-- /TOC -->
# TL;DR

Some thoughts informing a new strategy for an e-Science commons. I'd really appreciate some input and criticism.

# Thoughts on Strategy for an e-Infrastructure Commons

I've been tasked with writing a strategy for "SAGrid" in the context of the National Integrated Cyberinfrastructure System. While a mission statement, goals and strategy originally existed for SAGrid, back when it actually was a grid, things have evolved since we started this adventure in 2009. Since I've been so personally involved in the project, it's hard to extricate myself from the narrative, which is why this is being published on my personal blog rather than in some official document. If you have strong feelings, please don't hesitate to comment below and hey, maybe you'd like to help me write this strategy ?

## Openness

Apart from the many technological (r)evolutions that we've witnessed during the last few years, there has been one major socialogical shift in the communities of scientists - the shift towards **Openness**. Open as in :

  * [Open Source](http://en.wikipedia.org/wiki/Open_source) - to make it easy to share
  * [Open Access](http://en.wikipedia.org/wiki/Open_access) (for content, but also for  [infrastructure](http://en.wikipedia.org/wiki/Open_communication)) - to provide a fair playing field
  * [Open Standards](http://en.wikipedia.org/wiki/Open_standard) - to ensure interoperability and avoid lock-in

I'm not learned enough personally to argue (at least not with the data to back up claims) that "Science = Openness", and certainly there are domains (pharma, duh) where secrecy is paramount. But let's take a step back and talk not of how things are but how we think they *should* be. It's hard to argue the case that a publicly-funded research infrastructure as cross-cutting as e-Infrastructure *should* be closed. What we should keep foremost in our minds that we are talking about the development of the bedrock of 21st century science...

## The Commons

SAGrid (and subsequently the [Africa-Arabia Regional Operations Centre](http://aaroc.github.io) was founded on the principle of *collective action*[^Meraka] - we created a federation of human, electronic and physical resources that belonged to no single institute, but were shared amongst all, and coordinated by a third-party. Sounded great, and if it had been actually implemented this way, we may have seen far better success, but what actually happened was a sort of reluctant "ceding of territory" by the participating institutes to this coordinating third party (the CSIR in this case), which many people then came to believe was "the grid". This put it at odds with other projects, institutes and services, instead of allowing it to become a catalyst for the sharing of resources and scaling of activities. This is, in my opinion, a travesty[^TragedyOfTheCommons] and something I'd kinda like to help fix.

There has been a lot said about "The Commons" - there are the Creative Commons, and the Public Domain; there's even a [Creative Commons for Science](http://creativecommons.org/science), and there's an intensive movement for making a scholarly commons, by opening access to scholarly communications of all kinds. However, we still haven't made the case well for a commons of Cyberinfrastructure[^RDA]. Everybody *still* wants to do everything themselves, when it comes to building computational and data infrastructure. The reasons are manifold... Perhaps because ["Nobody does it better"](https://www.youtube.com/watch?v=mfmQe_eBvrc) (than themselves); perhaps because they're scared that "sharing = ceding"; perhaps just because the interfaces were obtuse and unnatural. The grid was **not** supposed to serve large communities with established structures, but to provide a framework to allow access to all researchers, irrespective of geographic location or institutional affiliation. I'm willing to take the responsibility for most of this failure[^resp], but only because those who were *supposed* to take the responsibility (the representative Joint Research Unit) arguably did not. Perhaps the timing was wrong, perhaps the milieu unfavourable, perhaps...

Well, certainly all of the above is true, but I think the fundamental point of a Commons is :

> You get out what you put in.

##  Have you tried rebooting the system ?

I think it's fair to say that SAGrid  **did not become what I wanted**. It can be useful to draw a line in sand, to define an end of a period, to say "le Roi est mort, vive le Roi !". With the development of NICIS, we have a perfect opportunity to re-design the collaborative, open, participatory infrastructure that I had originally envisioned along with the founding members[^OriginalJRU].

# Systems thinking for Cyberinfrastructure.

The [National Integrated Cyberinfrastructure System](http://www.dst.gov.za/index.php/resource-center/cyber-infrastructure2) (NICIS) defines a framework for the creation of national cyberinfrastructure system. Taking shape after long consultation and consideration of the state of affairs, it makes provision for centralised funding and deployment of computing, data and network infrastructure, amongst other things. This acknowledges the wide variety of needs that are faced by scientific communities and individual researchers, as well as the scale of large projects which rely fundamentally on e-Infrastructure. However, it also recognises that there is a need for [systems thinking](http://en.wikipedia.org/wiki/Systems_thinking) in the development of this framework[^DanielAdams-RDA-14].

The point at which researchers are no longer able to provide for themselves the tools which they need to successfully undertake research represents a phase change[^complexity] in the system of research - one at which it is more efficient to collaborate and exchange services, than it is to perform everything in a self-contained way. This point is seen over and again in various aspects of society, and thus many of the considerations of this document will be addressed at such "societal" issues of research. Technological advance will not be arrested or even decelerated in the forseeable future - quite to the contrary - but scientific research *will* be conducted (or at least directed) by collaborations of  humans for the forseeable future. I propose that this principle should inform the strategy of the cross-cutting aspect of NICIS ***"formerly known as SAGrid."***[^NoBetterNameYet]

## Evolving the revolution

Production ["service-grids"](http://en.wikipedia.org/wiki/Open_Grid_Services_Architecture) have had their day. The biggest one ever built[^WLCG] showed  the inherent limitations and spectacular capability of the paradigm. Production service grids had a lot of competition (or, shall we say, complementary support), particularly from volunteer service grids ([SETI@Home](http://setiathome.ssl.berkeley.edu/), [World Community Grid](http://www.worldcommunitygrid.org/), etc) and other forms of distributed computing, but their defining characteristic was that they were ***decentralised***. This is important.

As technology has evolved, instead of "dying", they have adopted the evolutionary benefits of clouds - **resource virtualisation, flexible infrastructure management, self-service, pay-per-use**, etc. At the same time, research methodologies used on these infrastructures are also crossing boundaries and domains. Fifteen years ago, HPC and data infrastructure were considered necessary to very few research activities. Ten years ago, taking advantage of the momentum created essentially by big physics projects' computing requirements these were adopted by other areas such as bioinformatics, as the boundary of what was computationally feasible was beaten back by technological advance. The rise of the network, especially in Sub-Saharan Africa, was a long-awaited revolution that promised to destroy distance[^TheNetwork]. Sticking with the the lustral theme, in 2010 'cloud computing' was so vaguely defined that it begged ridicule when considered as a serious replacement for production service grids. In 2015, proposing the deployment of a static, isolated (albeit federated and shared) infrastructure would negate the capacity of networks to reduce the barriers to collaboration which impede scientific discovery and innovation.

### What does the internet think of all this ?

In general, I'm wary of putting faith in the unwashed masses of the internet at large, but there is something to be said for general trends. Taking 'interest in' (*ie*, 'searching for') topics as a proxy for their uptake and relevance, we can get some idea of where people are focussing their efforts. Now, [Google Trends](http://trends.google.com) only goes back to 2004, while the seminal work on Grid Computing was written in 1999[^TheGrid], so we have to be careful of interpreting the trends. However a second edition[^TheGrid2] was coincidentally released in 2004, so we might as well use that as a reference. Here's how people have searched google for "HPC", "Big Data", "Grid Computing" and "Cloud Computing" since then[^IntriguingSearches]:

<script type="text/javascript" src="//www.google.com/trends/embed.js?hl=en-US&q=cloud+computing,+HPC,+Big+Data,+grid+computing&cmpt=q&tz&tz&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=700&h=360"></script>

The searches for "grid computing" are making their way to extinction, while those for HPC, while on a general decline, are still quite voluminous. One conclusion we may draw is that grid computing has reached the level of maturity that people don't need to search for it anymore, while HPC is still evolving fairly constantly. The "Cloud Computing" and "Big Data" trends are in full swing. Bear in mind that the data is from worldwide trends - and the shape of the cloud computing trend may look  [quite familiar](http://blogs-images.forbes.com/louiscolumbus/files/2013/01/Hype-Cycle-for-Cloud-Computing-20121.jpg).
<figure>
<img src="http://blogs-images.forbes.com/louiscolumbus/files/2013/01/Hype-Cycle-for-Cloud-Computing-20121.jpg"/>
<caption>The <a href="https://www.gartner.com/doc/2102116">Gartner Hype Cycle for Cloud Computing 2012</a>. Hey, we're all susceptible to <a href="http://en.wikipedia.org/wiki/Apophenia">Apophenia</a>.</caption>
</figure>

I invite the interested reader however to take a look at the various regional distinctions -  the "cloud computing" trend ***kills*** the others in the Sub-Saharan Region[^trendInFigshare].

## The Network won.

Many claim that the rise of network capacity and fall in price of computing and data resources has led to a "democratisation" of science. What is meant is that there is a lower barrier to entry to research, since there are more resources available, to a wider range of researchers. However, this is not democracy, this is at best egalitariansim, and at worst demagogy. One of the unfortunate side effects of the rapid reduction in barriers to entry is that the **sharing motive** is undermined and there is a large temptation to "go it alone". This might lead eager groups, projects, initiatives to quickly develop even sizeable resources, instead of following a slower adoption route on shared or mutualised resources, only to discover later that there is a need to share. At this point though, the damage is done, and re-building the trust necessary to share resources can quite long. We refer to this as the **"erosion of the commons"**.

Hey, what if we didn't have to draw battle lines around what was "yours" and what was "ours" ? If ***decentralisation*** were a viable option for building e-Infrastructure, we wouldn't have to. We could allow the network to play the aggregating and multiplying role it does so well, and avoid the erosion of a common platform for research and innovation. Easier said than done, of course - the limiting factor here, I submit, is the governing structure that ***enables*** a dynamic and sustainable decentralised e-Infrastructure. Trust is a fundamental aspect of this and is not something that can be simply wished into existence - even less bought. However, we have more than 5 years of local experience in building this trust. The experience of studying similar decentralised distributed computing infrastructures worldwide in the [CHAIN-REDS](http://www.chain-project.eu) also provides a good solid basis.

NICIS could indeed do would go a long way to providing a bedrock of trust, but more important, I think, is the aspect of **constituency**. I submit that a Commons could bring this about and improve things from a resource provider's point of view.

# So, your place or mine...  ?

Let's take a look at how a Commons would improve things from the researchers' perspective.

The pillars of cyberinfrastructure have been identified in South Africa as **Data**, **HPC** and **Network**. These pillars make particular sense from a national funding agency perspective, influencing development of centralised interventions. However, in the real world, it's very hard to build something using only one pillar, be it a pillar of "techonlogy", or an institutional pillar. The point is that research is conducted with judicious, sometimes ubiquitous usage of all of these technology pillars, and frequently across institutional boundaries. Researchers do not identify as "HPC" users or "Data" users - and certainly not as belonging to a particular institute - they are simply researchers, so funding their activities within the ambit of any of these "pillars" creates unnecessary barriers. While the pillars are useful for funding agencies to channel their commitments into significant hardware investments, a false dichotomy has been created between services which are in reality complementary. The separation of pillars, while necessary and useful to central funding agencies, thus creates tension and inefficiencies both in the technical community entrusted to build and operate them, as well as the scientific communities which come to rely on them. There are very good reasons for having centralised funding (in order to address issues at scale) as well as independent or institutional funding streams (to ensure that there is a multiplicity and diversity in research and resources), however as often occurs, some convergence in activities is almost inevitable. When this occurs, whether it is technological, methodological, or scientific convergence, a means should exist whereby experience and resources can be shared.

## 'Government Housing' vs 'Community Projects' - ensuring constituency-based participation

Ok, this bit is going to be controversial... bear with me, and remember that I'm trying to make an argument, in order to get to the facts, so feel free to comment (constructively :smile:) down below.

So, not all South Africans have equal access to e-Science resources and services. It is unrealistic to insist that all research universities to instate their own stand-alone e-Science Centres; this can only be effectively done in a certain environment and at a certain scale. However, we cannot accept such inequalities in our scientific communities, and efforts should be made to ensure access to quality services and performant resources irrespective of geographic location. This could be done by distributing resources, paid for by some central fund, to remote and disadvantaged communities; I refer to this as the "Government Housing" option - whereby a researcher at a disadvantage just has to wait patiently until the central bureaucracy disburses what it's able to in order to respond to their need. There are obvious issues with this, foremost the there is lack of choice and limited resources.

> ***"But certainly having hardware on-hand to work with is beneficial to both the technical and the scientific communities which are isolated by the Digital Divide ? Surely giving these people something, even if it's second-hand equipment, is better than nothing !?"*** <br>
> - You, shrieking in disblief.

Ok, maybe you didn't quite *shriek*, but you were still quite incredulous, you have to admit. Anyway - to that, I counter just two words:

> ***Power. <br>
> Pace. <br>***
> - Me.

My simple analysis is this. First of all there is a **power** crisis in South Africa, which will not likely go away soon. Old kit is notoriously power inefficient, meaning that often donations of second-hand materiel, even if free of capital cost, are often a huge burden on the receiving institute. In some cases, these institutes may not even have adequate data centres to host the kit. If institutes are already straining to keep power consumption to a minimum, proposing to deliver power-hungry and inefficient computing resources to them is likely to exacerbate the situation.

Secondly, the **pace** at which technology is evolving means that the sites which have only access to second- or third-generation equipment will *de-facto* be second-rate citizens of the e-Science world, learning obsolete methods and technology while the rest steam ahead.

Now, there is certainly a lot that can be done with older equipment, and the turnover rate of cutting-edge infrastructure is indeed very high. However, these resources will only be efficient in a *system* which allows various workloads to be executed by the relevant resources. This is not possible in state where resources are disconnected, but - while not solved problem - can be done in a decentralised, connected system.

### The world is flat.

The conventional wisdom says that you conduct your cutting-edge, grand-challenge research on  expensive Tier-1 resources, and everything else on the Tier-2 resources. However, this belies the power of the network to *flatten* the world and as far as resource deployment goes, in my opinion, piecemeal installations are a pretty bad idea. A relevant model, I suggest, is not a **hierarchy of resources**, but a **complex-adaptive system** of services. This is a much more realistic representation of a real e-Infrastructure, due to it's changing, complex nature. The distribution of resources should be thus done in the context of a self-interacting ***system***, rather than islands of kit. Now, the NICIS report clearly recognises that we have (and should have) a System of some kind - an **Eco**system, for example - but I think the critical issue is that it is a complex, dynamic system; one capable of interacting with itself, self-organising and capable of generating structures beyond simple hierarchy. In keeping with the analogy, this all depends on the boundary conditions and external constraints placed on the system.

If the external constraints promoted the natural tendency of the system to support itself, and inhibited the natural tendency of the system to disintegrate, it could do some really useful work. I explored this concept while in the context of the Africa-Arabia Regional Operations Centre [last year in Nairobi]() - here's a quick refresher :  

<iframe src="http://prezi.com/embed/89bkbbre5vk1/?bgcolor=ffffff&amp;lock_to_path=1&amp;autoplay=0&amp;autohide_ctrls=0#" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" frameborder="0" height="500" width="800"></iframe>

If you had the time to go through that prezi, well done ! If not, long story short:

> Allowing technical communities to re-organise and interact coherently with scientific communities can result in a productive environment for both. Neither a "Government Housing" project, nor a featureless, undirected pool of resources will make a productive e-Science Commons.

# The Craftsperson and the Third Career.

Finally, let's discuss a different aspect of an e-Infrastructure Commons - that of the people who operate and develop it. In a service-based economy, two distinct parties exist - the service *providers* and service *consumers*. There are distinct relationships between these two parties (service demand and supply for example), however it is assumed that there is very little overlap in activities. We have a model of modern IT professionals, working in a service-provision department, interacting via pre-agreed SLA's to provide services to professional researchers who select and consume them. However, given the cutting edge nature of these services, and the fact that they are operated within research environments, the reality is that there is often a great deal of overlap. Since there is such complexity in these platforms, at times there is no neat separation between research and research support staff. We have thus seen the emergence of a third career path, being neither researcher nor research support, and emergence of Research Software Engineers - craftspeople who work at the interface of a scientific domain, and the technologies which enable it. Innovation in this boundary between infrastructure, services, and science is highly creative, and difficult to fit into traditional institutional silos, or in our case cyberinfrastructure pillars. Whilst institutes in South Africa are starting to recognise this by the creation of e-Science Centres[^UCTeResearch] to employ the Research Software Engineers and Craftspeople, this trend has shown great payoff abroad[^eScienceCentres].

In immediate terms, we consider that identifying and developing capacity in this new career path consists in identifying **relevant, transferable skills**. This is quite often conflated with the "DevOps" paradigm, where there is better empathy and collaboration between those operating infrastructures and those developing it; indeed, where they often are one and the same team.

## DevOps, Software-Defined Infrastructure and transferrable skills

One of the aspects to emerge from the cloud computing paradigm is that hardware and services are being presented to the user in ever-more abstract ways. Virtualisation and abstraction are expressed in any number of computer languages, and for a modern systems expert, a fluency in these languages is essential. At the same time, many of the tools and methodologies usually reserved for the analytic and scientific domains (software engineering, quality control, reproducible methods, visualisation, etc) are being adopted by infrastructure operators. This cross-over is part of what is meant by the new "DevOps" paradigm. The rise of this paradigm has led to what we might term ***"Software-defined infrastructure"***, where not only the *configuration* of services are described in computer languages, but also the *means to achieve their desired state*. This makes it possible to not only save and share entire e-Services, contingent only on access to the relevant hardware, but also to *execute* their configuration given a few relevant variables and initial conditions. Although I didn't coin it[^WhoSaidIt], it's probably fair to state:

> To a first approximation, <b>Everything = Code</b>

Ok - the **actual** hardware is not code, but as soon as you turn it on, it's executing something. The Operating System is code. The hypervisor is code. The Private Cloud manager is code. The guest OS is code. The service running the application is code...

Things get even more 'meta' from there... For example, we wrote some [Ansible](http://www.ansible.com) roles which **describe** a state of services consisting of a [Shibboleth IDP](http://shibboleth.net/) supported by an [OpenLDAP backend](http://www.openldap.org) containing identities of people who would like to use a service. The authors  of this service are not the ones operating the various instances of it, and it's something that can be deployed by changing a few variables and at the push of a button.

## Fork my infrastructure.

Something astounding has happened in the last few years, arising from the convergence of the software development and IT operations commmunity, and the ability to virtualise resources: entire infrastructures can be "forked" from pre-existing ones. The rise of "social-coding" websites - most prominently [Github](http://github.com) has made writing and sharing code much easier and systematic, as well as providing an easy means of provenance.

## We, for one, welcome our new robot overlords.



# Conclusions and future work.

NICIS recognises that there is a need for a cross-cutting activity to enhance and fully enable researchers using cyberinfrastructure. In my view this strategy should rest, as SAGrid initially did, on the desire, needs and efforts of a committed community of contributors: universities, research laboratories and large research groups. By adopting a paradigm of **constituency** - shared ownership and community-developed services and tools, based on **open standards** - the system could be sustainable. Relevant directed interventions at scale by a central funding agency[^EUorDST] could help ensure that the development of a commons is more attractive than the development of individual, isolated systems. New tools and methodologies are speeding up the deployment and increasing the range of services that can be realistically offered. Enabling this acceleration is Open Source software, and the rise of DevOps culture which allows good collaborative software development methodologies to be applied to infrastructure services themselves. Recognising the importance of these hitherto "hidden" technical experts and allowing them to bridge the scientific and technical communities they serve can bring great benefit to both.  

# References and Footnotes

[^CoverImage]: The cover image is from [a Tribe called CURL](http://tribecalledcurl.com/wp-content/uploads/2014/02/keep-calm-reboot.jpg)
[^TragedyOfTheCommons]: This is similar to the ["Tragedy of the Commons"](http://en.wikipedia.org/wiki/Tragedy_of_the_commons), although let's not get too carried away with philosophical or market-based analogies.
[^resp]: As long as I can take credit for the great successes we've had - but those are less interesting to us right now.
[^Meraka]: Perhaps it's worth remembering that the very name of the [Meraka Institute](http://www.csir.co.za/meraka) was supposed to evoke a ["Common grazing ground"](http://www.southafrica.info/about/science/meraka180505.htm#.VOyGVDW-R1U)...
[^WLCG]: The [Worldwide LHC Compute Grid](http://wlcg.web.cern.ch/) is arguably the biggest and longest-living production service grid ever built.
[^RDA]: Perhaps the closest yet that we have come is the [Research Data Alliance](https://rd-alliance.org/)
[^DanielAdams-RDA-14]: Dr. Daniel Adams stated ["System level planning is a key requirement;"](https://rd-alliance.org/sites/default/files/attachment/ADAMS-RDA%20Workshop_Rome_Dec%202014.pdf) at the [*'Enabling the Integration of Institutional, Regional and National Research Capacity: The "data glue" for Research and e-Infrastructures'*](https://rd-alliance.org/data-glue-session.html) session of the [ RDA and global Data and Computing e-Infrastructure challenges ](https://rd-alliance.org/IT2014EU-programme) meeting.
[^complexity]: I submit that this is due to **complexity** as much as it is due to **scale**.
[^NoBetterNameYet]: Sorry, I haven't come up with a better name yet. However, I am torn between the grandiose-sounding "South African e-Infrastructure Commons" and just not choosing a name and sticking, as great some great artists to, with just a symbol.
[^TheNetwork]: One may argue that it is perhaps no coincidence tha the speedy deployment of afordable network infrastructure is tightly correlated with actual democratic revolutions in the region, in many cases.
[^TheGrid]: ["The Grid: Blueprint for a New Computing Infrastructure"](http://books.google.it/books?id=ONRQAAAAMAAJ), Morgan Kaufmann Publishers, 1999, Ian Foster, Carl Kesselman (Eds)
[^TheGrid2]: ["The Grid 2: The Grid: Blueprint for a New Computing Infrastructure"](http://books.google.it/books?id=YdVQAAAAMAAJ), Elsevier series in grid computing, 2004, Foster, I. and Kesselman, C. (Eds)
[^IntriguingSearches]: Boy, there's a lot to play with here, but that's probably best kept in a separate post.
[^trendInFigshare]: This is a "live" integration of the trend. Since it will change over time, I've put a snapshot of the graph at the time of writing at http://dx.doi.org/10.6084/m9.figshare.1317292
[^UCTeResearch]: See, for example the recently-constituted [e-Research Centre](http://www.eresearch.uct.ac.za/) at the [Unversity of Cape Town](http://www.uct.ac.za)
[^eScienceCentres]: Good examples are the [Oxford e-Reseach Centre](http://www.oerc.ox.ac.uk/), the [Monash e-Research Centre](https://platforms.monash.edu/eresearch/) and the [Netherlands e-Science Centre](https://www.esciencecenter.nl/)
[^EUorDST]: The EC FP7 and H2020 funding mechanisms have played this role well, and national funding from South Africa's DST for example could play such a role at a smaller scale.
[^OriginalJRU]: The founding members of the SAGrid JRU were : The UCT-CERN Research Centre, UCT Information and Communication Technology Services, iThemba LABS, the University of the Free State Computer Services Department, Department of Information Technology, University of the North­West, Department of Information Technology, University of Johannesburg, University of the Witwatersrand, Bioinformatics research group.
