---
layout: post
title: "重新打包一個有超級牛力的nginx"
description: 
headline: 
modified: 2014-12-09
category: nginx
tags: [nginx, deb, vps, 打包]
image: 
  feature: 
comments: true
mathjax: 
---
由於安全的考慮,俺的小站使用了https,大部分情況都是256位強加密.https在TCP握手,密鑰交換及加解密上服務器會有額外的開銷,但是這些開銷對於現在的配置不是問題,問題是在第一次建立安全鏈接時會消耗較長時間,這對於網站用戶體驗有很大影響.處女座的強迫症又犯了,因此才有了下面的折騰.
<!--more-->
之前俺的小站一直使用[谷歌分析][1],一次偶然的機會,俺在谷歌分析報告中看到了速度建議這一選項.裏面是[Google Page Speed][2]給出的建議,才知道有這麼個東東,谷歌一直致力於”make web faster”,還提出了[spdy][3]和[quic][4]協議以及[tcp_fastopen][5]這個標準.Google Page Speed是谷歌的一個項目,它爲[nginx][6]提供了一個模塊叫ngx_pagespeed,根據其網頁速度建議來加快網站速度.

Apache作爲一款老牌的web服務器.得益於其良好的架構設計,Google Page Speed項目直接提供了預編譯好的二進制模塊,Apache可以動態加載其模塊,不需要重新編譯安裝,而nginx則需要從源碼把Google Page Speed模塊靜態編譯進nginx二進制可執行文件.一提到編譯安裝軟件包,俺就想說國內Linux新手對編譯安裝的誤解,君不見到處是懶人包,lnmp一鍵安裝包,網上一搜教程,我幾乎找不到用官方源安裝部署的教程,全都在告訴你編譯安裝,有些用了一鍵安裝包還洋洋自得,認爲多方便呀,其實等到出問題了,卻不知該如何下手,因爲他們根本不知道具體過程.我覺得老鳥或是運維都不會輕易編譯安裝軟件,他們要在生成環境上操作,面對的是幾十甚至成百上千臺服務器.但是網上這些人雲亦雲的教程實在害人不淺,還誤導別人:不從源碼編譯安裝軟件的不是好運維.
可是俺想說的是,最好的東西往往是最簡單的,真理從來都不需要詭辯,理由如下:

> * 包管理器的作用就是管理軟件包及處理依賴關系,編譯安裝的軟件不能納入包管理系統(Gentoo除外),Linux高效的自動化操作變成了手動操作.

> * 從包管理器安裝軟件一般都是從發行版倉庫下載,而且都會有籤名校驗,這樣就從軟件源頭上保護了系統安全,而編譯安裝可能會引入污染.

> * 如果倉庫裏的包實在滿足不了要求,比如不包含某項功能或依賴關系不滿足,給軟件包重新打包也是個不錯的選擇,編譯安裝實爲下策.

因此,俺選擇了打包,而不是編譯安裝.nginx官方爲debian提供了官方源,這樣在其源碼基礎上修改重打包就方便可靠多了:

# 創建工作目錄

~~~ bash
$ mkdir -p /tmp/build/nginx && cd /tmp/build/nginx
~~~

# 獲取nginx源碼

## 新建nginx軟件源文件

~~~ bash
$ sudo vim /etc/apt/sources.list.d/nginx.list
~~~

加入下面一行:

~~~ bash
deb-src http://nginx.org/packages/debian/ wheezy nginx
~~~

## 導入nginx GPG key

~~~ bash
$ wget -c http://nginx.org/keys/nginx_signing.key -O- | sudo apt-key add -
~~~

## 更新軟件源

~~~ bash
$ sudo apt-get update
~~~

## 獲取源碼

~~~ bash
$ apt-get source nginx
~~~

運行後會得到下面的錯誤提示:

~~~ bash
sh: 1: dpkg-source: not found
Unpack command 'dpkg-source -x nginx_1.6.1-1~wheezy.dsc' failed.
Check if the 'dpkg-dev' package is installed.
E: Child process failed
~~~

## 解包失敗處理

~~~ bash
$ sudo apt-get install dpkg-dev && apt-get source nginx
~~~

至此nginx源碼準備就緒.

# 獲取ngx_pagespeed源碼
目前ngx_pagespeed的版本號是1.8.31.4-beta

安裝ngx_pagespeed的編譯依賴

~~~ bash
$ sudo apt-get install build-essential zlib1g-dev libpcre3 libpcre3-dev
~~~

下載 ngx_pagespeed

~~~ bash
$ cd /tmp/build
$ wget -c https://github.com/pagespeed/ngx_pagespeed/archive/v1.8.31.4-beta.tar.gz -O- | tar xvzf -
$ cd ngx_pagespeed-1.8.31.4-beta
$ wget -c https://dl.google.com/dl/page-speed/psol/1.8.31.4.tar.gz -O- | tar xvzf -
~~~

至此,ngx_pagespeed源碼準備就緒.

# 修改nginx編譯設置

## 基本編譯優化設置
nginx官方編譯選項很保守,下面將開啓GCC O2級別的優化,及取消編譯調試

~~~ bash
$ cd /tmp/build/nginx/nginx-1.6.1 && vim auto/cc/gcc
~~~

修改# optimizations段爲如下所示:

~~~ bash
NGX_GCC_OPT="-O2"
#NGX_GCC_OPT="-Os""
#NGX_GCC_OPT="-O"
~~~

修改# debug段爲如下所示:

~~~ bash
#CFLAGS="$CFLAGS -g"
~~~

## 開啓TCP_FASTOPEN(可選)
TCP_FASTOPEN可以在TCP三次握手時也能交換數據.在某些場合效果很明顯.要完整使用TCP_FASTOPEN要求以下部分都要開啓TCP_FASTOPEN:
> 服務器操作系統(Linux)-----web server(nginx)-----瀏覽器(chrome)-----客戶端操作系統(Linux)

### 服務器和客戶端開啓TCP_FASTOPEN

Linux kernel從3.7開始就能完整支持TCP_FASTOPEN,並且在3.10默認開啓,服務器和客戶端操作系統要求一樣:
首先確定Linux kernel版本在3.7.1以上

~~~ bash
$ uname -r
~~~

臨時開啓TCP_FASTOPEN:

~~~ bash
$ sudo sysctl net.ipv4.tcp_fastopen=3
~~~

永久開啓TCP_FASTOPEN:

將下面一行加入到`/etc/sysctl.conf`文件中

~~~ bash
net.ipv4.tcp_fastopen = 3
~~~

使設置生效

~~~ bash
$ sudo sysctl -p
~~~

### nginx開啓TCP_FASTOPEN
nginx從1.5.8開始支持TCP_FASTOPEN,在編譯時如果檢測到系統支持TCP_FASTOPEN,nginx會打開TCP_FASTOPEN.
可是俺在編譯時發現,事情並不像那樣簡單,即使服務器開啓了TCP_FASTOPEN,nginx在configurate的時候還是出現了下面的信息:

~~~ bash
Checking for TCP_FASTOPEN.......not found
~~~

後來發現是glibc版本的問題,`/usr/include/netinet/tcp.h`頭文件中沒有TCP_FASTOPEN的定義,難道要動頭文件??開玩笑,當然不用了,可以曲線救國

~~~ bash
$ cd /tmp/build/nginx/nginx-1.6.1 && vim debian/rules
~~~

修改--with-cc-opt="$(CFLAGS)”爲如下所示:

~~~ bash
--with-cc-opt="$(CFLAGS) -DTCP_FASTOPEN=23"
~~~

修改nginx配置文件listen語句爲如下所示:

~~~ bash
listen 80 fastopen=8192;
~~~

### 瀏覽器開啓TCP_FASTOPEN
打開chrome,輸入chrome://flags
找到TCP_FASTOPEN,選擇啓用,重啓瀏覽器生效.

## 添加ngx_pagespeed模塊
編輯rules文件

~~~ bash
$ cd /tmp/build/nginx/nginx-1.6.1 && vim debian/rules
~~~

在`--with-ipv6`之上增加下面這行:

~~~ bash
--add-module=/tmp/build/ngx_pagespeed-1.8.31.4-beta \
~~~

此時也可以自定義其他模塊是否編譯進nginx

編譯打包

~~~ bash
$ fakeroot dpkg-buildpackage
~~~

啊哦~系統給出了提示信息:

~~~ bash
dpkg-checkbuilddeps: Unmet build dependencies: debhelper (>= 7.0.50~) libssl-dev (>= 0.9.7)
~~~

說明沒有安裝nginx的編譯依賴,安裝就行了.

~~~ bash
$ sudo apt-get install debhelper libssl-dev && fakeroot dpkg-buildpackage
~~~

擦..又來了錯誤信息,還TM有完沒完?

~~~ bash
dpkg-source: info: local changes detected, the modified files are:
nginx-1.6.1/auto/cc/gcc
dpkg-source: info: you can integrate the local changes with dpkg-source --commit
~~~

debian太嚴謹了,提示我們修改了/auto/cc/gcc這個文件忘記注釋了,運行下面的命令即可:

~~~ bash
$ dpkg-source --commit
~~~

輸入個補丁名稱就OK~,再次編譯打包

~~~ bash
$ fakeroot dpkg-buildpackage
~~~

終於解決了報錯,稍等片刻,具有超級牛力的nginx將打包完成:)
最終,將會在/tmp/build/nginx目錄下生成我們需要的nginx軟件包,包名爲nginx_1.6.1-1~wheezy_amd64.deb

# 安裝nginx

~~~ bash
$ cd /tmp/build/nginx && sudo dpkg -i nginx_1.6.1-1~wheezy_amd64.deb
~~~

# 配置ngx_pagespeed模塊
nginx其他配置這裏就不說了,這裏只說ngx_pagespeed模塊的配置.
在nginx配置文件server段內加入以下內容:

~~~ bash
pagespeed on;

# Needs to exist and be writable by nginx.  Use tmpfs for best performance.
pagespeed FileCachePath /var/ngx_pagespeed_cache;
~~~

如果內存充足的話,建議掛載pagespeed文件緩存目錄爲tmpfs,

~~~ bash
$ cat /etc/passwd|grep nginx
~~~

得到nginx用戶的uid和gid,比如俺的系統上,nginx用戶uid爲104,gid爲106
接着,在/etc/fstab中添加這麼一行,將uid和gid替換爲你自己系統上的:

~~~ bash
tmpfs       /var/ngx_pagespeed_cache        tmpfs       rw,relatime,nr_inodes=5k,noexec,nodev,nosuid,uid=104,gid=106,mode=1700      0 0
~~~

使掛載選項生效

~~~ bash
$ sudo mount -a
~~~

ngx_pagespeed模塊提供了三個級別的filters.**PassThrough**,**CoreFilters**,**OptimizeForBandwidth**
Corefilters對於大多數網站的優化都是安全的,黨開啓了Corefilters,具體的filters可以手動指定開啓或關閉.
Passthrough適用於高級用戶,所有的filters必須手動指定來開啓.
在server段加入下面這行:

~~~ bash
pagespeed RewriteLevel Corefilters;
~~~

使用下面的命令驗證ngx_pagespeed模塊是否啓用成功,例如俺的小站:

~~~ bash
$ curl -I http://ibrother.me
~~~

如果返回的header中包含如下內容.則說明啓用成功

~~~ bash
X-Page-Speed: 1.8.31.4-4009
~~~

建議閱讀Google Page Speed項目filters文檔,谷歌提供了很多有用的[filters][7],並對filters的功能,依賴filters,風險等信息都有詳細說明.
如果對filters足夠了解了,可以啓用Passthrough級別,具體可以參考下俺的簡單[配置][8]

# 參考網站
1. [定制deb安裝包\|開源小站](http://www.litrin.net/2011/06/11/%E5%AE%9A%E5%88%B6deb%E5%AE%89%E8%A3%85%E5%8C%85/ "定制deb安裝包")

2. [nginx: Linux packages](http://nginx.org/en/linux_packages.html#stable "nginx: Linux packages")

3. [Build ngx_pagespeed From Source](https://developers.google.com/speed/pagespeed/module/build_ngx_pagespeed_from_source "Build ngx_pagespeed From Source")

4. [Building nginx with TCP_FASTOPEN enabled - Ruby Forum](https://www.ruby-forum.com/topic/5392464 "Building nginx with TCP_FASTOPEN enabled")

[1]: http://www.google.com/analytics/ "谷歌分析"

[2]: https://developers.google.com/speed/pagespeed/module "Pagespeed Module"

[3]: http://zh.wikipedia.org/wiki/SPDY "SPDY"

[4]: http://blog.csdn.net/force_eagle/article/details/17335625 "QUIC簡介"

[5]: http://en.wikipedia.org/wiki/TCP_Fast_Open "TCP Fast Open"

[6]: http://nginx.org/ "nginx"

[7]: https://developers.google.com/speed/pagespeed/module/filters "PageSpeed filters"

[8]: https://github.com/ibrother/vpsbackup/blob/master/debian/etc/nginx/conf.d/pagespeed.conf "pagespeed.conf"
