---
layout: post
title: "Gentoo Linux 入坑系列(一)"
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
Linux發行版可以說是多如牛毛，最華麗的opensuse、開箱即用的LinuxDeepin、專注新技術的fedora、以及用於服務器堅如磐石般的debian和RHEL等等，Gentoo作為一個元發行版在其中絶對是特殊的一位。
<!--more-->

# Gentoo Linux 入坑開始

[Gentoo官網][1]上的介紹：

>Gentoo Linux是一套通用的、快捷的、完全免費的Linux發行，它面向開發人員和網絡職業人員。與其他發行不同的是，Gentoo Linux擁有一套先進的包管理系統叫作Portage。在BSD ports的傳統中，Portage是一套真正的自動導入系統，然而Gentoo裡的Portage是用Python編寫的，並且它具有很多先進的特性， 包括文件依賴、精細的包管理、OpenBSD風格的虛擬安裝，安全卸載，系統框架文件、虛擬軟件包、配置文件管理等等。

>Gentoo Linux是一種可以針對任何應用和需要而自動優化和自定義的特殊的Linux發行版。Gentoo擁有優秀的性能、高度的可配置性和一流的用戶及開發社區。

## 特殊的安裝方式

* 安裝過程大量使用終端

* 可以使用其他發行版的iso來簡化安裝

* 當機器上已經有了一個可用的Linux系統，不需要下載iso鏡像文件，僅需要下載一個不到200M的stage3 tarball和一個不到60M的portage快照就能安裝

* 可以讓你的極客朋友ssh到你的機器幫助安裝

## 特殊的發行方式

* 滾動更新

Gentoo Linux採用了**滾動更新**的方式來發佈新版本，沒有版本號的概念。只要你更新一下系統軟件包，你就用上了最新的系統，所有的這一切都是平滑的。
採用滾動更新的發行版目前只有Gentoo、Arch、LMDE這幾款。但是Gentoo是最穩定的一個。當其他Linux發行版出新版了，發燒友們都要忙着重新安裝最新版了

## 特殊的包管理器

* 得益於portage的先進特性，你可以自己設定軟件的編譯選項從而實現可定製性和控制軟件依賴。

* 穩定分支和不穩定分支**安全混用**。

* slot殺手級特性允許你安裝同一個軟件的不同版本，並且**安全共存**。比如gentoo上就有python2.7和python3.3。還可以安裝不同版本的gcc共存於系統。

* 由於內核、軟件包、甚至是工具鏈和系統基礎庫本身都可以在本地機器重新編譯，因此會得到**性能優化**。相對於其他好處，這只是小甜品。

## 特殊的哲學理念

**make your own choice** 從安裝一開始你就會面臨各種選擇，gentoo給你最大程度的自由。

* 硬盤的分區方式是採用GPT還是MBR？根目錄如何組織？哪些需要單獨掛載出來？文件系統選擇什麼？甚至精細到掛載選項。

* 選擇gentoo用作服務器還是當桌面系統？需不需要X-window？是安裝一個DE還是WM？

* init system是選擇默認的openrc還是風頭正勁的systemd？

* 上網通過PPPoE寬頻還是dhcp？有沒有無線網卡？

* 安裝哪種內核？gentoo有很多種打了不同補丁的內核供你選擇。

所有這些你都需要自己做決定，沒有最好的，只有最適合自己的。這也是gentoo的哲學。

## 為什麼選擇Gentoo Linux

[豆瓣][2]這個文藝青年和小清新妹子聚集的網站用的就是gentoo作操作系統的服務器。引用其架構文檔中的話:

>• 容易維護
>• emerge mysql
>• ebuild 便於管理 patch
>• 只安裝需要的東西
>• 安全性
>• GLSA(Gentoo Linux Security Advisories)

## 哪些人適合裝Gentoo

1. 電腦配置足夠高
因為安裝軟件需要本地機器編譯。

2. 網速夠快，網絡環境簡單
安裝過程需要從網上下載軟件包，一個易配置的網絡是成功安裝Gentoo的開始。

3. 英文水平夠用
安裝過程需要查閲大量文檔。因為一些中文文檔年久失修。

4. 身體好
安裝過程對於新手來說太過漫長，不能一鼓作氣而下的，只好斷斷續續地安裝。

5. 有耐心
初次接觸可能遇到種種問題，絶大部分網上都能找到解決方案，有些問題需要自己看輸出，查日誌，不斷去嘗試。

## 瞭解更多

* [Gentoo Wiki](https://wiki.gentoo.org/ "gentoo wiki")

* [Gentoo amd64 handbook](http://www.gentoo.org/doc/en/handbook/handbook-amd64.xml "Gentoo amd64手冊")

[1]: http://www.gentoo.org/ "gentoo.org"

[2]: http://www.douban.com "豆瓣"
