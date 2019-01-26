---
layout: post
title: "Data-Driven Execution Environments"
description: "Provisioning Execution Environments, but with data"
headline: "Provisioning Execution Environments, but with data"
category: blog
tags: ['operations', 'worker-node', 'execution', 'ansible', 'role']
image: 
  feature: 'graffiti-569265_1280.jpg'
mathjax: true

---

- [Contained environments before containers](#contained-environments-before-containers)
  - [Addressing the issue](#addressing-the-issue)
- [Design principles](#design-principles)
  - [Building an appropriate model](#building-an-appropriate-model)
  - [Data concerns](#data-concerns)
  - [Deterministic, Idempotent Configuration Functions](#deterministic-idempotent-configuration-functions)
- [An example: Service VOs required at EGI sites](#an-example-service-vos-required-at-egi-sites)
- [References and Footnotes](#references-and-footnotes)

## Contained environments before containers

<p class="lead">Let's start at the beginning.</p>

This is about developing an Ansible role to
provision relevant compute environments for the gridcloud - also known as the "worker node".

The execution environment is something that has been inherited from the days
before [Docker](https://www.docker.com), where **shared** access to a resource is granted based on membership of a
virtual organisation (VO).
Since the resource was shared, isolation of the environment  needed to be done
at the shell and user level, which resulted in the need to map incoming requests
from real people to local users, with local groups based on their roles in the
respective virtual organisations.

----

<div class="text-center">

<h2>person <i class="fa fa-long-arrow-right" aria-hidden="true"></i> user</h2>
<h2>role <i class="fa fa-long-arrow-right" aria-hidden="true"></i> group</h2>

</div>

----

Not only did environments need to be isolated for different _members_ of the
VO, but they also for different _jobs_ submitted by the _same member_ of the VO.
In the first case, member Willie submits a job to analyse data set A at a site,
and Sharlene submits another job to analyse _the same data set_ at the same
site.
If they were mapped to a single user at the site, they would end up in the same
environment.
Without separating their working environments (or some advanced shell-fu), they
will not only collide during incoming phase when staging the data, but likely
also in the  analysis and results phase, when they write the output.

In the second case, the same member (say, Sharlene), may submit a large batch
of work consisting of hundreds or thousands of jobs at a site.
Each of these will need it's own working environment in order not to clobber the
others, and so needs to be mapped to different working directories or entirely
different users in order to ensure separation.

There was also a third level of sharing: sites offering resources also offered
them to several virtual organisations!
The end result was a choice laid on the site administrators about how to map the
various members and roles to pre-existing users and groups, with self-consistent
ranges of respective identifiers (UIDs and GIDs).


<table class="table text-left">
<thead>
   <tr>
      <th>Scenario</th>
      <th>Problem faced</th>
   </tr>
</thead>
   <tr>
      <td>Different users from same VO submit simultaneous jobs</td>
      <td>Isolation of individual work of respective VO members</td>
   </tr>
   <tr>
      <td>Same member submits several parallel jobs</td>
      <td>Isolation of execution environment of  individual jobs</td>
   </tr>
</table>

This machinery sounds weird to me in a world where everything is run in a
container and that separation is provided autmatically, but for the love of
legacy, let's just pretend it has to be done this way.

### Addressing the issue

This then led to two schools of thought:

  1. The **default way**: an example configuration file with suggested UIDs and
     GIDs for the VOs distributed along with the rest of the configuration code,
     supported centrally by the middleware team and heavily recommended if you
     wanted support.
  2. The **data-driven way**: a data source is set up by the local authority, mapping ranges to VOs and used as the source of truth for configuration.

Both of these were and are fine.
They both have a single source of truth, which can be referred to unambiguously,
and they both try to resolve collissions in uniquely assigning ranges to map
groups and users to.
However, I find it unsatisfying to have completely arbitrary patterns of configuration, and wanted to develop a more unbiased approach.

The key question is :

> How many groups do we need and how many users should be put into them, respectively?

## Design principles

How do we pick the "right" number of users to create, and efficiently manage the
accounts on our site?
There may not be an _analytic_ answer to this question, but there are certainly
some configurations which are better than others.
Using a sub-optimal configuration is not just a matter of aestetics either --
keeping unused accounts around is an invitation to exploit them in some
way[^NIST_NVD], _e.g._
However, having too many available local accounts for mapping incoming requests

### Building an appropriate model

Rather than asking the question "how many accounts", we should ask:

> How should do they scale?

The groups are quite easy: **they scale as the roles of the VOs.**
To a first approximation, for each role in a VO, a local group is needed.

User accounts map slightly differently.
They scale as:

- **number of members of the VO**: in principle, each of the members could
    submit a job at the same time to the same site, so we need to map them each.
- **expected concurrent jobs by individual members**: each job needs its own
    working environment.

This leads to some crazy maximum estimates -- until one considers that **there are
finite resources at the site** and that jobs will be put into a queue.
This buffering of incoming workload provides a useful constraint whereby we can
set sane numbers on the local account provisioning, if we state that it also
scales as:

- **amount of resources assigned to the VO**: only a limited number of jobs
  can be run concurrently.

Again, to a first approximation, this scales as **the number of CPU cores**
assigned to the queue on which that VO runs.
Indeed, it seems to me that this is the _limiting factor_ for deciding how many
local users should be created.
In the extreme case, if only one CPU core can be consumed at a time, would it
really make sense to provision more than one local user to be mapped into?

### Data concerns

Now that we have some solid design principles for provisioning the execution
environment, we ask ourselves:

> where can we get these numbers?

There is a fundamental **separation of concerns** that we first need to
acknowledge: the _site_ decides on resource allocation, but has no control over
the VO membership, structure and workload patterns.
So, VO members, roles and job rates are something that the site should be able
to **query** from an external source of truth.
That, together with the **local** resource allocation policy (how many resources
are consumable on a particular queue), could form the basis for an algorithm for
configuring the pool accounts.

Taking note of who has authority over these numbers helps us understand where to
get and set them:

  1. For the VO information (roles and user numbers), we expect to this to be
     available from the Operations Portal, even if a custom view is needed.
  2. The local resource allocation policy (resources on queues for user groups),
     is of course set by the site itself. In Ansible terms, this would be best
     written in the `group_vars` of the site.

With the relevant variables determined, and understanding of where to get them
we could be forgiven for assuming that we could feed these numbers into a
function that would spit out the desired configuration.

### Deterministic, Idempotent Configuration Functions

If we define

* $C$: a unique configuration state
* $F$: the function which computes it, which has as parameters two data sources
  * $D_{vo}$ is the VO data
  * $D_{LocalPolicy}$ is the local policy data which modulates the VO data.

If such a function exists, we could generate configuration states **deterministically[^NameTheFunctionKind]**:

$$
C = F(D_{vo},D_{LocalPolicy})
$$

This would also make the method **idempotent**.

These two aspects - determinism and idempotence - are important in a production
environment so that we can know how to write tests, and apply configurations
continuously with confidence, thereby speeding up the delivery pipeline.

The question, however, is really whether the data can be unambiguously obtained.

If we are to configure access for a VO, we need to know:

  1. The VO
  1. The Attribute Names (roles) which would need to be mapped
  2. The local group ids which roles are mapped to.
  3. The user names which will be added to that group

We can then execute the following strategy:

  * For all the VOs you want to enable at your site
    * get the roles for each VO
    * If the role is used at the site
      * create a group for it
      * create an array of users based on the local policy and size or requirements of the role
      * add those users to the group
  
This is just a way of saying what we will _do_ with the things we need in the list above.
Pseudocode might look like this[^StrategyInRuby]:

```ruby
   vos_enabled.each do |vo|
      roles = vo.roles
      roles.each do |role|
         if site_policy.role_used(role)?
            group = site_policy.create_group(role)
            user_pool = site_policy.create_user_pool(role.size)
            add_user_pool_to_group(role)
```

The local group ids are in a sense arbitrary - we can assign any unused group id to a role, it is just a convention.
However, this convention needs to be respected by other configuration needs, and needs to respect existing configuration - which is another way of saying that the configuration function needs to be deterministic and idempotent.
Another aspect is that there is a _maximum_ number of groups which need to be mapped - the number of roles (FQANs) in the VO - but this can be smaller.
In may cases, sites prefer to collapse FQANs into the same group, if their site does not need isolation of those roles.

These aspects make it a bit difficult to _predict_.


## An example: Service VOs required at EGI sites

Let's take a specific case - that of the "service" VO's which are required to be
enabled at sites which form part of the EGI Federation -- `ops` and `dteam`.

We can certainly obtain $D_{vo}$ unambiguously : the authoritative source is the
VOMS admin server itself.
Where is that?
The answer to that question lies in the [Operations Portal VO management section](https://operations-portal.egi.eu/vo/search).
In the case of the `ops` VO mentioned before, we have all of the data we need at the [VO ID Card page](https://operations-portal.egi.eu/vo/view/voname/ops) -- including a [machine-readable (XML) version](view-source:http://operations-portal.egi.eu/xml/voIDCard/public/voname/ops)[^TrimmedVOCard]:

```xml
<VoDump>
   <IDCard CIC_ID="68" Name="ops" Serial="125" Status="Production" Alias="OPS" GridId="">
      <ValidationDate TimeZone="UTC">2011-05-30 10:24:30</ValidationDate>
      <LastChange TimeZone="UTC">2018-06-27 07:09:47</LastChange>
      <Scope>Global</Scope>
      <SupportProcedure/>
      <Discipline>Unknown</Discipline>
      <EnrollmentUrl>https://lcg-voms2.cern.ch:8443/voms/ops/register/start.action</EnrollmentUrl>
      <HomepageUrl>https://wiki.egi.eu/wiki/OPS_vo</HomepageUrl>
      <AUP type="Text">...</AUP>
      <Description>...</Description>
      <Middlewares ARC="1" gLite="1" UNICORE="1" GLOBUS="1" CLOUD_STORAGE="1" CLOUD_COMPUTING="1"/>
      <gLiteConf>
         <FQANs>
            <FQAN IsGroupUsed="1" GroupType="">
               <FqanExpr>/ops/Role=lcgadmin</FqanExpr>
               <Description/>
               <ComputingShare>0</ComputingShare>
            </FQAN>
            <FQAN IsGroupUsed="1" GroupType="Pilot">
               <FqanExpr>/ops/Role=pilot</FqanExpr>
               <Description>Pilot for gLExec testing</Description>
               <ComputingShare>10</ComputingShare>
            </FQAN>
         </FQANs>
         <VOMSServers>
            <VOMS_Server HttpsPort="8443" VomsesPort="15009" IsVomsAdminServer="1" MembersListUrl="https://lcg-voms2.cern.ch:8443/voms/ops/services/VOMSAdmin?method=listMembers">
               <hostname>lcg-voms2.cern.ch</hostname>
               <X509Cert>
                  <DN>/DC=ch/DC=cern/OU=computers/CN=lcg-voms2.cern.ch</DN>
                  <CA_DN>/DC=ch/DC=cern/CN=CERN Grid Certification Authority</CA_DN>
                  <X509PublicKey>
                  -----BEGIN CERTIFICATE-----
                  ...
                  -----END CERTIFICATE-----
                  </X509PublicKey>
                  <SerialNumber>143798387989568029032532</SerialNumber>
               </X509Cert>
            </VOMS_Server>
            <VOMS_Server HttpsPort="8443" VomsesPort="15009" IsVomsAdminServer="1" MembersListUrl="https://voms2.cern.ch:8443/voms/ops/services/VOMSAdmin?method=listMembers">
               <hostname>voms2.cern.ch</hostname>
               <X509Cert>
                  <DN>/DC=ch/DC=cern/OU=computers/CN=voms2.cern.ch</DN>
                  <CA_DN>/DC=ch/DC=cern/CN=CERN Grid Certification Authority</CA_DN>
                  <X509PublicKey>
                  -----BEGIN CERTIFICATE-----
                  ...
                  -----END CERTIFICATE-----
                  </X509PublicKey>
                  <SerialNumber>158150071128079441690976</SerialNumber>
               </X509Cert>
            </VOMS_Server>
         </VOMSServers>
      </gLiteConf>
      <ARCConf/>
      <UNICOREConf/>
   </IDCard>
</VoDump>
```


----

## References and Footnotes

[^NIST_NVD]: The [National Vulnerability Database (NVD)](https://nvd.nist.gov) of the [U.S. National Institute of Standards and Technologies](https://nist.gov) for example provides a [control](https://nvd.nist.gov/800-53/Rev4/control/AC-2) addressing the management of unused accounts.
[^NameTheFunctionKind]: I cannot for the life of me remember the term used to refer to functions which are guaranteed to give unique results for every input value.
[^TrimmedVOCard]: The VO card has been trimmed of a lot of content which didn't add to the current discussion.
[^StrategyInRuby]: I've chosen to write it as if it were in Ruby, but you get the idea, hopefully.