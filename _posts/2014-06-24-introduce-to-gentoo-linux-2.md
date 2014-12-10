---
layout: post
title: "Gentoo Linux 入坑系列(二)"
description: 
headline: 
modified: 2014-12-09
category: gentoo
tags: [gentoo]
image: 
  feature: 
comments: true
mathjax: 
---
我在[上一篇][1]博文當中提到了Gentoo Linux與一般發行版的不同之處及其具有的先進特性，這一篇算是給上一篇填坑。在這一篇中，我們將正式開始Gentoo Linux的安裝。
<!--more-->

# 準備安裝環境

## 要求

* 有一個可用的Linux系統。可以是live usb，也可以是本地硬盤已經存在的Linux系統。

* 安裝環境必須聯網。安裝過程軟件包需要從網上下載

## 相關概念

* 我們把當前的安裝環境稱為**當前系統**。

* 而即將要安裝到機器硬盤上的稱為**目標系統**。

這一步推薦使用最新的Ubuntu的live usb。更新的內核支持更多的硬件，所有硬件直接驅動的可能性大大增加。

# 準備硬盤

## 分區表類型選擇

### GPT分區

* 支持從大於2TB的硬盤上啟動

* 最多支持128個分區

* 即使你使用BIOS主板，Linux一樣可以在GPT分區的硬盤上啟動。PS: 這生命力是有多頑強？？

### MBR分區

* 最多只能創建4個主分區。或者是3個主分區和1個擴展分區，在擴展分區裡，創建邏輯分區。

* 不支持從大於2TB的硬盤上啟動。

* 可以多重引導啟動windows和硬盤上的windows共存。

## 分區規劃

### Linux目錄結構

|掛載點| 說明|
|------|-----|
|/bin  |用來存放單用戶模式需要的二進制文件,普通用戶有權限執行|
|/boot |存放引導管理器文件和Linux內核|
|/dev  |存放系統設備文件(包括塊設備和字元設備)|
|/etc  |存放應用程序的配置文件|
|/home |普通用戶的家目錄，你自己的文件和用戶級的配置都在這裡|
|/lib  |系統啟動過程必須的庫文件|
|/media|一些發行版會把可移動設備掛載到這裡|
|/mnt  |臨時的掛載點|
|/opt  |存放可選的第三方軟件，比如google-chrome和oracle的jdk|
|/proc |虛擬文件系統，是內存的映射，不占用空間，可以查看進程信息|
|/root |超級用戶的家目錄|
|/run  |存放進程的pid文件|
|/sbin |單用戶模式必須的二進制文件，僅限root用戶可以執行|
|/sys  |另一個虛擬文件系統，有些參數可以在這裡調。比如ip轉發。。|
|/tmp  |存放臨時文件，基本不占用空間，一般掛載為tmpfs|
|/usr  |存放包管理器安裝的二進制文件，頭文件，庫文件，已經man，info等文檔|
|/var  |用來存放系統日誌文件,鎖文件等等|

以上是一般的Linux發行版目錄結構，不同發行版差別微乎其微。接下來介紹Gentoo Linux特有的目錄。

|掛載點| 說明|
|------|-----|
|/usr/portage|該目錄存放portage樹，都是一些很小的ebuild文件，patch文件以及校驗和數據。|
|/usr/portage/distfiles|存放軟件包安裝過程中自動下載的源碼包。|

### 硬盤塊設備命名規則

~~~ bash
$ lsblk    #列出所有塊設備
~~~

1. sda是你的第一塊sata或者scsi硬盤,sdb就是第二塊硬盤。

2. sda1對應的是第一塊硬盤的第一個分區，sdc7對應的是第三塊硬盤的第7個分區。

3. GPT分區編號可以有1-128。

4. MBR分區表從5之後的都是邏輯分區,如果有邏輯分區，擴展分區編號為4，不能直接操作擴展分區，而應該使用邏輯分區。

### 怎樣合理掛載分區

雖然Linux最少只需要掛載個/目錄就能使用，但這種方式很不合理。

合理方式:

1. 將IO頻繁的目錄和IO不頻繁的目錄分開，將經常變動的目錄和基本不變動的目錄分開。

2. 機械硬盤的外圈更快，所以可以調整掛載順序，獲得IO性能提升。

因此，推薦以下方案：




## 開始對硬盤分區

### 使用gdisk

gdisk是一個終端下交互式的gpt分區工具，支持高級格式化硬盤的4k對齊。

1. 輸入以下命令。

~~~ bash
$ sudo su    #切換到root用戶，以後的操作都將以root用戶執行。
$ apt-get update    #更新軟件源
$ apt-get install gdisk    #安裝gdisk
~~~

2. 進入gdisk交互界面

~~~ bash
$ gdisk /dev/sda    #進入gdisk，分區請謹慎操作
~~~

以我的硬盤為例，你將會看到類似以下輸出

~~~ bash
GPT fdisk (gdisk) version 0.8.10

Partition table scan:
  MBR: protective
  BSD: not present
  APM: not present
  GPT: present

Found valid GPT with protective MBR; using GPT.

Command (? for help):
~~~

可以看出，我的硬盤當前使用的是GPT分區表，並且還有一個受保護的MBR。


Loading......

[1]: http://blog.ibrother.me/gentoo/introduce-to-gentoo-linux-1/ "Gentoo Linux 入坑系列(一)"
