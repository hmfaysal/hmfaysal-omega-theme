---
layout: post
title: "VPS的選擇"
description: 介紹常用的虛擬化技術及其優缺點,推薦幾個我用過的VPS,
headline: 
modified: 2014-12-07
category: VPS
tags: [vps]
image: 
  feature: 
comments: true
mathjax: 
---

前一陣子,俺一直在找一個靠譜,合胃口的VPS賣家.不知道處女座的animal是不是都有選擇困難症,在一口氣試了4家VPS後俺覺得需要剁手了...PS:上次在v2ex上看到發燒友買了好幾十個VPS.
<!--more-->

以下先對VPS常使用虛擬化技術做個對比:

|   |OpenVZ|XEN|KVM|
|---|:----:|:-:|:-:|
|虛擬化程度|低(操作系統級虛擬化)|早期是半虛擬化,新版本支持全虛擬化|全虛擬化|
|性能損失|最小|小|較小|
|資源隔離程度|低|高|最高|
|Guest OS支持|只支持安裝Linux|Linux和Windows都支持,但是都需要patch|支持大多數操作系統|
|價格|便宜|略貴|貴|
|是否超售|肯定的|以前認爲XEN不能超售,其實也是可以的|未知,有人知道可以告訴我|
|可定制性|差|好|最好|

到這一步,應該有點想法了,是考慮價格,還是考慮可定制性等等.接下來就將俺使用過的幾家VPS做個介紹和對比.

注意:下面的鏈接帶有俺邪惡的小尾巴,點了會懷孕的.

|   |[BuyVM][1]|[RamNode][2]|[傲遊主機][3]|[DigitalOcean][4]|
|---|:---:|:-----:|:------:|:----------:|
|虛擬化技術|OpenVZ,KVM|OpenVZ,KVM|XEN|KVM|
|OS模板|大多數常見的發行版,以及很多應用模板|大多數常見發行版,同樣有很多應用模板|OS模板老舊,且沒有64位系統,僅有Debian CentOS Ubuntu Windows|Debian CoreOS Ubuntu CentOS fedora,以及一些應用模板|
|網絡節點|拉斯維加斯(快),新澤西|西雅圖(較快),紐約,亞特蘭大,荷蘭|香港(最快),洛杉磯(快)|新加坡(線路沒有優化),舊金山(不夠理想),紐約,倫敦,阿姆斯特丹|
|服務可靠性|穩定可靠|穩定可靠|個人遇到過硬盤故障|網絡太差,因此沒使用,不作評價|
|PPP TUN支持|支持|OpenVZ需要提交工單開啓|支持|支持|
|更換內核|KVM支持|KVM支持|支持,但內核需要patch|不支持|
|中文客服|暫無|暫無|是|暫無|
|支付方式|信用卡,paypal,支付寶|信用卡,paypal|支付寶充值|信用卡,paypal|
|最小計費周期|月付|月付|月付|小時|
|福利|免費DNS Hosting,5G備份空間|免費DNS Hosting|4.5折優惠碼: haixiuge|github education pack|

總結下: 如果你想要穩定快速的網絡和可靠的服務,建議選擇BuyVM.如果想練練手,或者喜歡做實驗,Do的快照就非常適合.Do由於網絡不太好(可能是俺所處地區的問題),但是支持按小時計費,關機後就停止計費,因此非常適合作爲練手的機器(雲備胎T\_T)

[1]: https://my.frantech.ca/aff.php?aff=1118 "BuyVM"

[2]: https://clientarea.ramnode.com/aff.php?aff=1863 "RamNode"

[3]: http://my.aoyouhost.com/page.aspx?c=referral&u=18765 "傲遊主機"

[4]: https://www.digitalocean.com/?refcode=4f60b2a8e864 "DigitalOcean"
