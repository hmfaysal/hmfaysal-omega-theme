---
layout: post
title: "使用mutt作為email客戶端"
description: 
headline: 
modified: 2014-12-09
category: mutt
tags: [mutt, email]
image: 
  feature: 
comments: true
mathjax: 
---
> *All mail clients suck.This one just sucks less.*

[mutt][1]是一個Linux終端下的著名的郵件客戶端，如你所願，mutt就是一個*郵件客戶端*。沒有其他浮華的功能，它可以幫助你提升效率，至於幫助你裝X只能算是mutt的特殊加成。
<!--more-->
由於mutt是一個有着unix哲學的程序，可定製性很強，其高級功能可以由不同的程序來完成，比如以下搭配：

* mutt
使用mutt內建的imap，pop，smtp支持，最簡單的方式，只需要安裝mutt這一個軟件包。

* mutt + msmtp
最簡單的組合，配合imap協議，可以滿足大多數人的要求
其中smtp功能由msmtp實現，你甚至可以把imap功能也由其他軟件來實現

* mutt + msmtp + getmail + procmail
稍微複雜一點的組合，mutt是客戶端，msmtp作為mta，getmail用來收取郵件，procmail過濾郵件。
mta還可以使用exim4或者postfix替代，一般使用msmtp就夠了，因為postfix實在是太好了，郵件服務器通常會選擇postfix。
msmtp可以使用esmtp替代。
郵件收取功能也可以使用fetchmail替代getmail，由於需要本地mta投遞，所以同時需要procmail。
procmail是一個功能及其強大的郵件過濾系統。ps:看到這句話，你就應該明白，我顯然沒有使用它。。。

由於Gmail服務器端垃圾郵件過濾已經做得很好了，而且我使用的是imap協議，所以不需要getmail去收取郵件，目前也沒有必要自己再去配置procmail的過濾系統。
本文將對mutt + msmtp的配置進行說明

# 安裝mutt和msmtp

## 一般發行版
mutt和msmtp已經包含在大多數發行版的軟件源裡，直接使用包管理器安裝,其他發行版以此類推:

~~~ bash
$ sudo apt-get insatll mutt msmtp    #適用於debian系
$ sudo yum insatll mutt msmtp    #適用於red hat系
~~~

## Gentoo Linux下安裝

~~~ bash
$ echo "mail-client/mutt -berkdb gpg imap mbox sasl sidebar slang smime -smtp" >> /etc/portage/package.use    # 設置mutt的use flag
$ echo "mail-mta/msmtp sasl" >> /etc/portage/package.use    # 設置msmtp的use flag
$ emerge -av mutt msmtp    # 安裝mutt和msmtp
~~~

# 配置mutt

## 創建並編輯`~/.muttrc`
把username替換為你的Gmail用戶名，passwd替換為密碼

~~~ bash
# 設置發信地址和用戶名
set from = "username@gmail.com"
set realname = "username"
set use_from = yes

# 設置Gmail帳戶和密碼
set imap_user = "username@gmail.com"
set imap_pass = "your password"

# 設置遠程服務器文件夾
set folder = "imaps://imap.gmail.com:993"
set spoolfile = "+INBOX"
mailboxes = +INBOX
set postponed = "+[Gmail]/Drafts"

# 允許mutt自動創建一個新的imap連接
unset imap_passive

# imap連接保持時間
set imap_keepalive = 300

# 檢查新郵件間隔時間
set mail_check = 120

# 本地緩存目錄
set header_cache = ~/.mutt/cache/headers
set message_cachedir = ~/.mutt/cache/bodies

# 設置TLS驗證
set certificate_file = /etc/ssl/certs/ca-certificates.crt

# 設置內建smtp,這裡我們不使用
#set smtp_url = "smtps://username@gmail.com@smtp.gmail.com:465/"
#set smtp_pass = "your password"

# 使用msmtp
set sendmail = "/usr/bin/msmtp"

# 不保存發送的郵件
unset record

# 回信不包含郵件頭
set header = no

# 退出提醒
set quit = ask-yes

# 回信包含原文
set include

# 設置回信引文之前的插入符號
set indent_str = "> "

# 設置郵件頭
my_hdr From: username@gmail.com

# 郵件打分
score "~N" +4
score "~s 通知" +2
score "~D" -5
score "~O" +1
score "~s believe" -10

# 排序方式
set sort = score

# 二級排序
set sort_aux = date

# 翻到最後一頁不回到第一頁
set pager_stop

# 快速回信
set fast_reply

# 刪除郵件自動移動光標
set resolve = yes

# 設置編碼，保持和終端一致
set charset = "utf-8"

# 發信使用的字符集
set send_charset = "us-ascii:iso-8859-1:utf-8:gb18030"

# 是否編輯郵件頭
set edit_headers = no

# pager顯示行數
set pager_index_lines = 4

# 告知mutt哪些是郵件列表
subscribe ustc_lug@googlegroups.com
subscribe shlug@googlegroups.com
subscribe gentoo-user@lists.gentoo.org

# 使用solarized配色方案
source ~/.mutt/mutt-colors-solarized/mutt-colors-solarized-light-16.muttrc
~~~

編輯好後保存退出。

修改`~/.muttrc`的權限

~~~ bash
$ chmod 700 ~/.muttrc
~~~

創建本地文件夾

~~~ bash
$ mkdir -p ~/.mutt/cache
~~~

# 配置msmtp
創建或修改`/.msmtprc`

~~~ bash
# Accounts will inherit settings from this section
defaults
auth             on
tls              on
tls_trust_file   /usr/share/ca-certificates/mozilla/Thawte_Premium_Server_CA.crt
logfile ~/.mutt/msmtp.log

# Gmail account
account gmail
host smtp.gmail.com
port 465
from username@gmail.com
user username@gmail.com
password password
tls_starttls off
tls_trust_file /etc/ssl/certs/ca-certificates.crt

# set default account
account default : gmail
~~~

保存退出，並設置權限

~~~ bash
$ chmod 600 ~/.msmtprc
~~~

# 配置mutt使用[solarized][3]配色方案

~~~ bash
$ git clone https://github.com/altercation/mutt-colors-solarized.git ~/.mutt/mutt-colors-solarized
~~~

然後在`~/.muttrc`中修改相應配置

# 大功告成，終端啟動

~~~ bash
$ mutt
~~~

如無例外你將看到:
![][2]

# 注意事項
* Gmail啟用了兩步驗證需要為mutt設置應用專用密碼

# 參考網站
1. [傻瓜式配置mutt\|賴明星](http://mingxinglai.com/cn/2012/11/send-mail-with-mutt-in-fedora--ubuntu/ "傻瓜式配置mutt")

2. [mutt使用指南-王垠](http://docs.huihoo.com/homepage/shredderyin/mutt_frame.html "mutt使用指南")

3. [配置mutt做郵件客戶端](http://home.ustc.edu.cn/~lixuebai/GNU/MuttConfig.html "配置mutt做郵件客戶端")

4. [Mutt-ArchWiki](https://wiki.archlinux.org/index.php/Mutt "Mutt-ArchWiki")

5. [Mutt-Gentoowiki](https://wiki.gentoo.org/wiki/Mutt "Mutt-Gentoowiki")

6. [Mutt中文手冊](http://xhc.me/wp-content/uploads/mutt/manual_1.5.19_zh.html "Mutt中文手冊")

[1]: http://www.mutt.org/ "mutt官網"

[2]: http://ibrother.qiniudn.com/mutt.png "mutt"

[3]: http://ethanschoonover.com/solarized "solarized"
