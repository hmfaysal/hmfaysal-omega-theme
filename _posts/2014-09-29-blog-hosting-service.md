---
layout: post
title: "博客託管服務"
description: 
headline: 
modified: 2014-12-09
category: project
tags: [blog, hexo, jekyll, ghost]
image: 
  feature: 
comments: true
mathjax: 
---
近期一直瞎折騰,博客也許久未更新.之前小站就提供靜態博客託管服務了,但是一直沒有和小夥伴宣傳,俺覺得好東西應該分享,所以有了這篇博客.
<!--more-->

# hexo,jekyll等靜態博客託管

## hexo託管說明

因爲hexo有很多種部署方式,而服務器一般都會有rsync工具.所以我們可以很方便的通過rsync部署hexo靜態博客到vps服務器上.

1. Linux用戶和OS X用戶可以通過包管理器安裝rsync,Win用戶點擊[這裏][1]下載,解壓縮後將可執行文件和dll文件放到Windows裏system32的目錄下.

2. 發送郵件到俺的郵箱ibrother.linux@gmail.com,主題爲hexo博客託管申請,內容包括用戶名,你的博客域名和ssh公鑰`~/.ssh/id_rsa`,ssh公鑰可以粘貼到郵件正文中也可以用附件的形式.

3. 一旦俺確認完成,你會收到俺的郵件,修改hexo博客目錄下的`_config.yml`中部署的部分爲如下所示(請自行替換相應設置):

{% highlight bash %}
# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type: rsync
  host: VPS的ip
  user: 用戶名
  root: /home/用戶名/blog
  port: 端口號
  delete: true
  verbose: true
  ignore_errors: false
{% endhighlight %}

接下來修改域名指向俺VPS的ip

以後執行hexo d就會同步博客到vps上.
注: 如果沒有購買域名,可以使用俺的二級域名(xxxx.ibrother.me)請一並在郵件中說明.

## jekyll和其他靜態博客託管說明

因爲博客程序可能本身沒有rsync部署的設置,因此只需要以上的1,2,4步驟.在生成靜態網頁後使用如下命令同步(請自行修改相應設置):

~~~ bash
$ rsync -avz --delete -e 'ssh -p 端口' 靜態網頁目錄/ 用戶名@ip:/home/用戶名/blog/
~~~

爲了方便,可以將上面的命令保存爲腳本文件,比如命名爲blogsync.

~~~ bash
$ sudo vim /usr/local/bin/blogsync
~~~

內容如下:

~~~ bash
#!/bin/sh

rsync -avz --delete -e 'ssh -p 端口' 靜態網頁目錄/ 用戶名@ip:/home/用戶名/blog/
~~~

加上可執行權限:

~~~ bash
$ sudo chmod +x /usr/local/bin/blogsync
~~~

以後同步博客,只需要執行blogsync命令.

# ghost博客聚合說明
ghost在0.5版本加入了多用戶的功能,因此俺和小夥伴試用了一下,只想說一句:

> Ghost是個好產品...

站點地址: http://ourblog.ibrother.me

後臺管理: http://ourblog.ibrother.me/ghost

爲了上(zhuang)檔(bi)次,俺只是加了solarized-light代碼高亮配色,連評論功能都沒有加,讓你更專注於寫作,而不是折騰其他的事.

只需要發送郵件到俺的郵箱ibrother.linux@gmail.com,主題爲ghost博客聚合帳號申請.內容爲你以後登錄後臺的郵箱.收到俺的邀請郵件即可完成注冊.

[1]: https://www.itefix.net/content/cwrsync-free-edition "cwrsync"
