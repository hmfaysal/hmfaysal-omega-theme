---
layout: post
title: "Docker won't run privileged"
description: "Docker : Y U NO FUSE ?"
headline: "Docker : Y U NO FUSE ?"
category: blog
tags: [work, projects, docker, fuse, CVMFS, CODE-RADE]
mathjax: true
image:
  feature: cape-town.jpg
comments: true
---

Ok, so long story short, I want to mount CVMFS  repositories in a Docker container. Is that asking too much ? The [CVMFS docs](http://cvmfs.readthedocs.io/en/latest/cpt-configure.html#mount-inside-a-container) say "hell no !"; and I quote :

{%highlight bash %}
docker run --privileged -i -t centos /bin/bash
{%endhighlight %}

Even the Docker docs confirm that :

> When the operator executes docker run `--privileged`, Docker will enable to access to all devices on the host as well as set some configuration in AppArmor or SELinux to allow the container nearly all the same access to the host as processes running outside containers on the host.
>
> [Docker docs - runtime privileges and Linux - capabilities](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)

Oh yeah ?

{%highlight bash%}
docker: Error response from daemon: Container command not found or does not exist..
{%endhighlight%}

# What in tarnation does that mean ?

I don't think that the problem is with the Docker installation, because mine is recent

{%highlight bash%}
Client:
 Version:      1.10.3
 API version:  1.22
 Go version:   go1.5.3
 Git commit:   20f81dd
 Built:        Thu Mar 10 15:59:07 2016
 OS/Arch:      linux/amd64

Server:
 Version:      1.10.3
 API version:  1.22
 Go version:   go1.5.3
 Git commit:   20f81dd
 Built:        Thu Mar 10 15:59:07 2016
 OS/Arch:      linux/amd64
{%endhighlight%}

# RTFM ?

Ok fine, I assumed I was the dufus, so I read the [Docker docs](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities), again, which say :

> To mount a FUSE based filesystem, you need to combine both `--cap-add` and `--device`

So, I tried this, which worked :

{%highlight bash%}
sudo docker run --cap-add ALL --device /dev/fuse:rwm  -t -i -v /home/becker/Ops/AAROC/DevOps/Ansible:/Ansible ansiblecontainer /bin/bash
{%endhighlight %}

If you're wondering which container `ansiblecontainer` is, check out [the repo that Docker hub uses to build it.](https://github.com/AAROC/AnsibleContainer).

It's a container that has been prepared with only Anisble on it (and dependencies), allowing us to test our playbooks on various platforms. The playbook in question is one [I'm working on](https://github.com/brucellino/DevOps/commit/5f0d73d49a8dc2d6476ea211ba642d15e116eb7e) to mount the CODE-RADE cvmfs repos statically (ie, not with autofs).

When you run the playbook, you get

{%highlight bash%}
ansible-playbook -i inventories/inventory.travis -c local cvmfs-static.yml --skip-tags="slack"

PLAY [Enable CVMFS] ************************************************************

TASK [setup] *******************************************************************
ok: [localhost]

TASK [cvmfs-static : include] **************************************************
skipping: [localhost]

TASK [cvmfs-static : include] **************************************************
included: /Ansible/roles/cvmfs-static/tasks/install-Debian.yml for localhost

TASK [cvmfs-static : Add the repo key] *****************************************
changed: [localhost]

TASK [cvmfs-static : ensure that the repos are present] ************************
changed: [localhost]

TASK [cvmfs-static : ensure that cvmfs user is present] ************************
changed: [localhost]

TASK [cvmfs-static : Install prerequisites] ************************************
changed: [localhost] => (item=[u'patch', u'cmake', u'zlib1g-dev', u'linux-headers-4.2.0-35-generic', u'build-essential', u'libattr1-dev', u'libssl-dev', u'uuid', u'uuid-dev', u'libfuse-dev', u'python-dev', u'unzip', u'attr', u'vim', u'environment-modules'])

TASK [cvmfs-static : install CVMFS] ********************************************
changed: [localhost]

TASK [cvmfs-static : copy over the local config files] *************************
changed: [localhost] => (item=default.local)
changed: [localhost] => (item=keys/apprepo.sagrid.ac.za.pub)
changed: [localhost] => (item=config.d/apprepo.sagrid.ac.za.conf)
changed: [localhost] => (item=keys/devrepo.sagrid.ac.za.pub)
changed: [localhost] => (item=config.d/devrepo.sagrid.ac.za.conf)
changed: [localhost] => (item=keys/fastrepo.sagrid.ac.za.pub)
changed: [localhost] => (item=config.d/fastrepo.sagrid.ac.za.conf)

TASK [cvmfs-static : Create the mountpoint] ************************************
changed: [localhost]

TASK [cvmfs-static : mount cvmfs] **********************************************
fatal: [localhost]: FAILED! => {"changed": false, "failed": true, "msg": "Error mounting /cvmfs/fastrepo.sagrid.ac.za: CernVM-FS: running with credentials 1000:1000\nCernVM-FS: loading Fuse module... done\nfusermount: mount failed: Operation not permitted\nfailed to create Fuse channel\n"}
	to retry, use: --limit @cvmfs-static.retry

PLAY RECAP *********************************************************************
localhost                  : ok=9    changed=7    unreachable=0    failed=1
{%endhighlight%}


Let's see that again in the slow-motion replay :

{%highlight bash%}
CernVM-FS: running with credentials 1000:1000
CernVM-FS: loading Fuse module... done
fusermount: mount failed: Operation not permitted
failed to create Fuse channel
{%endhighlight %}

# After action frustration

So, we can reach the CVMFS repos and validate them inside the container, we just can't create the fuse channel and this is where I left off yesterday. I just can't figure out whether the problem is with my host machine (Is it AppArmor, some wierd config of the Docker API ?) or with the container (It's not like I built it strangely...) or is there some fundamental problem I'm not seeing.

<figure>
<img src="{{ site_url }}/images/docker-y-u-no-fuse.jpg">
</figure>

Help a dude out.
