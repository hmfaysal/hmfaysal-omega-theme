---
layout: post
title: "VPS初步配置"
description: 
headline: 
modified: 2014-12-09
category: personal
tags: []
image: 
  feature: 
comments: true
mathjax: 
---
VPS剛入手,IDC廠商會給你一個或者多個ip,這樣以後就可以從本地機器通過ssh客戶端登錄到遠程服務器上面去.登錄之後就可以像在本地終端一樣操作管理以及維護服務器.
<!--more-->

以下以debian7.6 amd64操作系統爲例,其他系統大致相同.如果不會iptables,不懂selinux,強力推薦使用debian!!

# 人家是第一次哦

## 初次登錄
比如vps給了你104.131.151.63這個ip,使用如下命令登錄服務器:

~~~ bash
$ ssh root@104.131.151.63
~~~

## 安裝sudo
接下來我們使用root用戶安裝sudo軟件包,sudo可以使授權用戶執行超級用戶命令.

~~~ bash
$ apt-get update && apt-get install sudo
~~~

## 添加新用戶

例如添加一個叫animal的新用戶.以後登錄服務器,系統配置,日常維護都通過animal來執行.

~~~ bash
$ useradd -m -G users,sudo -s /bin/bash animal
~~~

參數說明:

  * -m 表示創建用戶時,同時也創建主目錄,並且拷貝/etc/skel目錄下的模板到主目錄裏面.
  * -G 表示要把新用戶加到哪個組裏.
  * -s 指定新用戶使用哪個shell.

## 配置用戶密碼

~~~ bash
$ passwd animal
~~~

## 添加公鑰到服務器

~~~ bash
$ ssh-copy-id animal@104.131.151.63
~~~

這一步相當於把你本地`~/.ssh/id_rsa.pub`的內容拷貝到服務器animal用戶`~/.ssh/authorized_keys`

# 人家才第二次哦

## 新用戶登錄

本地另開一個終端,使用新用戶登錄服務器了

~~~ bash
$ ssh animal@104.131.151.63
~~~

接下來的操作都是animal幹的

# ssh服務安全加固

## ssh服務配置

編輯`/etc/ssh/sshd_config`,建議順便安裝下vim,或者使用自帶的nano.

~~~ bash
$ sudo apt-get install vim && sudo vim /etc/ssh/sshd_config
~~~

對照下面的示例配置修改:

~~~ bash
Port 2333   # 不使用默認的22端口
Protocol 2  # 使用更加安全的協議版本

UsePrivilegeSeparation yes
PermitRootLogin no  # 禁止root用戶使用ssh登錄
StrictModes yes # 啓用嚴格模式

RSAAuthentication yes   # 啓用RSA驗證
PubkeyAuthentication yes    # 啓用公鑰驗證
AuthorizedKeysFile .ssh/authorized_keys

IgnoreRhosts yes    # 忽略rhosts文件
RhostsRSAAuthentication no
HostbasedAuthentication no  # 不使用基於主機的驗證

PermitEmptyPasswords no # 禁止空密碼登錄
ChallengeResponseAuthentication no
PasswordAuthentication no   # 不使用密碼驗證

X11Forwarding no    # 如果不使用X,可以禁用X11端口轉發
UsePAM yes  # 使用PAM
AllowTcpForwarding no   # 如果不使用ssh隧道,可以禁用TCP端口轉發
UseDNS no

AllowUsers animal   # 只允許animal使用ssh登錄
~~~

## ~/.ssh目錄權限

~~~ bash
$ sudo chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh/
~~~

## 使用denyhosts或者sshguard(推薦)

denyhosts是一個python寫的程序,可以通過分析ssh登錄日志來發現攻擊,並自動將攻擊來源ip加入黑名單.

~~~ bash
$ sudo apt-get install denyhosts
~~~

## 防火牆規則(推薦)

debian,ubuntu都包含一個防火牆ufw,簡化了iptables配置,對於普通用戶來說ufw比iptables更易上手.

安裝ufw

~~~ bash
$ sudo apt-get install ufw
~~~

添加ssh規則

~~~ bash
$ sudo ufw limit 2333/tcp   # 2333是之前設置的端口號,這裏使用了限制規則.
~~~

默認禁止入站連接

~~~ bash
$ sudo ufw default deny
~~~

設置ufw開機啓動,這一步相當重要,請謹慎操作!如果之前配置出現錯誤,可能會將自己也擋在了防火牆外面.一旦發生此種狀況,使用vps控制面板裏的console可以登錄.

~~~ bash
$ sudo ufw enable
~~~

重啓sshd

~~~ bash
$ sudo service sshd restart
~~~

# 本地配置(可選)

ssh服務端基本已經配置好,此後的客戶端登錄使用如下命令:

~~~ bash
$ ssh -p 2333 animal@104.131.151.63
~~~

參數說明:

  * -p 指定服務端設置的端口號.

但是每次登錄都得輸這個命令,尤其那個ip太難記,那麼問題來了

我們可以在本地創建`~/.ssh/config`這個文件

~~~ bash
$ vim ~/.ssh/config
~~~

參考如下配置:

~~~ bash
Host s1
HostName 104.131.151.63
User animal
Port 2333
~~~

其中,s1就是主機別名,以後就可以用下面的命令登錄服務器了

~~~ bash
$ ssh s1
~~~

# 參考網站

1. [Linux服務器的初步配置流程-阮一峯](http://www.ruanyifeng.com/blog/2014/03/server_setup.html "Linux服務器的初步配置流程-阮一峯")

2. [Hardening OpenSSH](https://dev.gentoo.org/~swift/docs/security_benchmarks/openssh.html "Hardening OpenSSH")

3. [Ufw使用指南](http://wiki.ubuntu.org.cn/Ufw%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97 "Ufw使用指南")
