---
layout: post
title: "使用GnuPG加密和簽名"
description: 
headline: 
modified: 2014-12-09
category: GnuPG
tags: [GnuPG, encrypt, mutt]
image: 
  feature: 
comments: true
mathjax: 
---
> *老大哥在看著你。       ---《1984》*
<!--more-->

# 背景引入

## 當前的網絡環境

1. 當前的互聯網是由網絡巨頭把持的。

2. 網絡巨頭很難不作惡，法律都靠不住，更加不能指望道德的約束。

3. 某些邪惡政府要求網絡巨頭提供用戶數據，屁民很難獨善其身。

下面援引兩個**事實**：

> [王小寧][1]2003年9月12日，被以“煽動顛覆國家政權罪”判處十年徒刑。王小寧的被捕和被判刑，同[雅虎公司][2]向中國當局洩露他的網上保密信息直接有關。

> 因洩露國家機密指控被判入獄的中國記者兼詩人[師濤][3]已被提前釋放。這起案件曾導致雅虎受到來自美國國會和言論自由倡導者的強烈譴責。師濤在8月23日被釋放，比他的10年刑期提前了15個月。師濤的案子凸顯出外國互聯網公司在政府密切監控信息和壓制異見的市場運營時所面臨的問題。中國國安局利用雅虎提供的郵件信息作為證據指控其洩漏國家機密。   ---[solidot][4]

這兩人都被列入了[中華人民共和國持不同政見者列表][5]，俺很好奇為毛[GFW][6]沒有封鎖這個列表，興許是[工作][13]太忙，搞忘了吧。

## PGP的出現

> *[PGP][7]是一套用於消息加密、驗證的應用程序，其加密/驗證機制採用名為IDEA算法的散列算法。PGP及其同類產品均遵守OpenPGP數據加解密標準。*

但是PGP的普及並非一帆風順，PGP的主要開發者Philip R. Zimmermann，在1991年的時候將源碼放到了互聯網上。由於美國在當時對於加解密算法和軟件的出口有嚴格的[限制][11]，Zimmermann被FBI偵訊達數年。不過，美國是保護個人著作的。於是，Zimmermann在志願者的幫助下，將PGP的源碼被出版為書，銷往歐洲，由於**合法**,所以才有了今天的普及。

而由於PGP是商業軟件，[GnuPG][10]是遵循OpenPGP數據加解密標準的自由軟件實現，中文譯為**GNU隱私衛士**，衛士之名當之無愧，不像某些公司，阿貓阿狗都敢叫*衛士*。

## 對稱加密和非對稱加密

* [對稱加密][8]
簡單的說，加密和解密時使用相同的密鑰即對稱加密，比如我們日常使用的壓縮軟件加密使用的就是對稱加密。

* [非對稱加密][9]
採用這種方法，首先需要生成一對密鑰。公開發佈出去的稱為公鑰，用戶自己保密的稱為私鑰。公鑰用來加密，私鑰用來解密。

## RSA算法

[RSA][12]加密算法是常用的非對稱加密算法，一般認為RSA是1977年由在MIT工作的Ron Rivest、Adi Shamir和Leonard Adleman一起提出的，其實早在1973年，在英國政府通訊總部工作的數學家Clifford Cocks在一個內部文件中提出了一個相同的算法，但他的發現被列入機密，一直到1997年才被發表。

### RSA算法的可靠性

要知道，沒有絶對的安全，但是要破解RSA需要相當長的時間或是很大的代價，就可以認為它是安全的。

* 密鑰長度是256位，個人電腦幾小時就能分解其因子。

* 1999年，數百台電腦合作分解了512位長的密鑰。

* 1994年Peter Shor）證明一台量子計算機可以在多項式時間內進行因數分解。

> *對極大整數做因數分解的難度決定了RSA算法的可靠性。*
> *今天只有短的RSA鑰匙才可能被強力方式解破。到2013年為止，世界上還沒有任何可靠的攻擊RSA算法的方式。只要其鑰匙的長度足夠長，用RSA加密的信息實際上是不能被解破的。*

因此，未來出現了量子計算機，或者找到了一種有效分解大整數的算法，RSA就被看作是不可靠的。
看到這，你應該明白，一定要用4096位長的密鑰。

# 使用GnuPG

## 安裝GnuPG

* Linux用戶直接使用包管理器安裝，也可安裝GUI前端[KGpg][23]。

* OS X用戶有[GPGTools][14]項目可以使用GnuPG。

* Windows用戶可以在[Gpg4win][15]項目找到安裝程序。

## 生成鑰匙對

~~~ bash
$ gpg --gen-key
~~~

接着會出現算法選擇的問題：

~~~ bash
gpg (GnuPG) 1.0.7; Copyright (C) 2002 Free Software Foundation, Inc.
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it
under certain conditions. See the file COPYING for details.

Please select what kind of key you want:
(1) RSA and RSA (default)
(2) DSA and Elgamal
(3) DSA (sign only)
(4) RSA (sign only)
Your selection?
~~~

默認的是RSA，既支持加密也支持簽名，輸入1並回車。接着選擇密鑰長度：

~~~ bash
RSA keypair will have 1024 bits.
RSA keys may be between 1024 and 4096 bits long.
  What keysize do you want? (2048)2048
~~~

默認的長度是2048位，直接回車即可。不過俺強烈建議使用4096位，輸入4096並回車，接下來選擇鑰匙有效期限：

~~~ bash
Please specify how long the key should be valid.
      0 = key does not expire
<n> = key expires in n days
<n>w = key expires in n weeks
<n>m = key expires in n months
<n>y = key expires in n years
Key is valid for? (0)0
Key does not expire at all
Is this correct (y/n)? y
~~~

默認永久有效，建議輸入一個有效期限並回車，120表示120天，24w表示24個星期，6m表示6個月，1y表示1年。
我用的默認永久有效，直接回車。問你是否確定，輸入y並回車。

接着填寫個人信息：

~~~ bash
GnuPG needs to construct a user ID to identify your key.

Real name: ibrother
Email address: ibrother.linux@gmail.com
Comment: ibrother in github
You selected this USER-ID:
"ibrother (ibrother in github) <ibrother.linux@gmail.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
~~~

這3行個人信息將用於產生鑰匙的uid
第1行建議填寫網名，比如俺常用的網名是ibrother。
第2行填寫你的email地址，比如俺的郵箱<ibrother.linux@gmail.com>
第3行是備註，用於進一步標明身份。

接下來，輸入密碼用於保護私鑰，程序就會開始生成鑰匙對，過程可能幾秒鐘到幾分鐘。此時，動動滑鼠讓電腦工作起來有助於產生足夠的隨機數。

~~~ bash
You need a Passphrase to protect your secret key.

Enter passphrase:
~~~

一旦生成鑰匙對，強烈建議立即生成註銷證書

首先查看一下公鑰ID

~~~ bash
$ gpg --list-keys
/home/ibrother/.gnupg/pubring.gpg
---------------------------------
pub   2048R/A0A2A2F8 2014-07-09
uid       [ultimate] ibrother (ibrother in github) <ibrother.linux@gmail.com>
sub   2048R/4AAB15B9 2014-07-09
~~~

## 生成註銷證書

~~~ bash
gpg --output revoke.asc --gen-revoke A0A2A2F8

sec 2048R/A0A2A2F8 2014-07-09 ibrother (ibrother in github) <ibrother.linux@gmail.com>

Create a revocation certificate for this key? y
Please select the reason for the revocation:
  0 = No reason specified
  1 = Key has been compromised
  2 = Key is superseded
  3 = Key is no longer used
  Q = Cancel
(Probably you want to select 1 here)
Your decision? 1
Enter an optional description; end it with an empty line:
> Someone cracked me and got my key and passphrase
>
Reason for revocation: Key has been compromised
Someone cracked me and got my key and passphrase
Is this okay? y

You need a passphrase to unlock the secret key for
user: "ibrother (ibrother in github) <ibrother.linux@gmail.com>"
2048-bit RSA key, ID A0A2A2F8, created 2014-07-09

ASCII armored output forced.
Revocation certificate created.

Please move it to a medium which you can hide away; if Mallory gets
access to this certificate he can use it to make your key unusable.
It is smart to print this certificate and store it away, just in case
your media become unreadable.  But have some caution:  The print system of
your machine might store the data and make it available to others!
~~~

註銷證書已經生成，請妥善保管。如果不小心被人盜取了密碼，這是你註銷公鑰的唯一憑證。

## 發佈公鑰

由於是公鑰加密，我們必須將公鑰發佈出去，有以下兩種方法：

### 導出公鑰

~~~ bash
$ gpg -a --output key.public --export UID
~~~

把UID替換成你的名字或email地址。會在當前工作目錄得到key.public文件，使用以下命令查看內容：

~~~ bash
$ cat key.public
~~~

內容類似如下:

~~~ bash
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2
.......
-----END PGP PUBLIC KEY BLOCK-----
~~~

這樣你就可以把公鑰放在博客上，或者email給你的小夥伴。另一種方法是將公鑰發送至公鑰服務器：

### 把公鑰發佈到公鑰服務器

~~~ bash
$ gpg --keyserver keys.gnupg.net --send-key ID
~~~

只需要將ID替換成你的公鑰ID。

以上說的是發佈你的公鑰，這樣小夥伴就可以發送加密的文件或郵件給你，那麼如何發送加密文件或郵件給小夥伴呢？這就需要獲取小夥伴的公鑰。

## 導入公鑰

~~~ bash
$ gpg --keyserver keys.gnupg.net -recv-key 0xA0A2A2F8
~~~

0xA0A2A2F8是俺的公鑰id，替換成你的小夥伴的公鑰id

或者導入公鑰文件

~~~ bash
$ gpg --import key.public
~~~

由於公鑰加密的特點，公鑰的發佈過程，和獲取公鑰的過程必須保證可靠性，因此有了指紋驗證：

## 驗證指紋並簽收公鑰

~~~ bash
$ gpg --fingerprint
~~~

輸出應該包含如下所示：

> pub   2048R/A0A2A2F8 2014-07-09
>       Key fingerprint = DE91 71DC AE38 DE8E AB5A  C423 3E6A 8CC1 A0A2 A2F8
> uid       [ultimate] ibrother (ibrother in github) <ibrother.linux@gmail.com>
> sub   2048R/4AAB15B9 2014-07-09

其中“DE91 71DC AE38 DE8E AB5A  C423 3E6A 8CC1 A0A2 A2F8”就是這個公鑰的指紋，和小夥伴核對確認無誤後就可以簽收了:

~~~ bash
$ gpg --sign-key ibrother
~~~

## 加密文件

~~~ bash
$ gpg -a --output message-ciper.txt -r ibrother -e message.txt
~~~

參數說明：

  * -a輸出文本格式
  * --output指定輸出文件名
  * -r知道接收者的公鑰uid
  * -e表示執行加密操作

如果加密二進制文件不需要-a參數

## 解密文件

~~~ bash
$ gpg --output message-plain.txt -d message-ciper.txt
~~~

參數說明：

  * --output指定解密後的文件名
  * -d表示執行解密操作

## 簽名一個文件

### 獨立簽名文件簽名方式

~~~ bash
$ gpg -a -b message.txt
~~~

獨立簽名方式是原文件和簽名文件分開，可以用如下命令驗證簽名：

~~~ bash
$ gpg --verify message.txt.asc
~~~

輸出一定要有“Good signature”字樣，就說明驗證成功。

### clear簽名方式

~~~ bash
$ gpg -a --clearsign message.txt
~~~

使用如下命令提取原始信息：

~~~ bash
$ gpg --output message-original.txt -d message.txt.asc
~~~

# GnuPG和mutt的整合

關於mutt的初步配置，建議看俺之前的[博文][16]

一旦mutt安裝好後，在/usr/share/doc/mutt-1.5.22-r3/samples/目錄下可以找到`gpg.rc.bz2`文件

~~~ bash
$ bzcat /usr/share/doc/mutt-1.5.22-r3/samples/gpg.rc.bz2 >> .mutt/gpg.rc
$ echo echo "source ~/.mutt/gpg.rc" >> .muttrc
~~~

然後編輯`~/.mutt/gpg.rc`，編輯或者加入以下幾行

~~~ bash
set pgp_good_sign="^\\[GNUPG:\\] GOODSIG"

set pgp_sign_as = 0xA0A2A2F8
set pgp_timeout = 3600
set crypt_autosign = yes
set crypt_replyencrypt = yes
~~~

將0xA0A2A2F8改為你自己的公鑰id。這樣使用mutt發送郵件默認使用簽名。

在mutt的發信界面可以選擇其他選項:

![][17]

輸入P

![][18]

e表示只加密，s表示簽名，b表示既加密又簽名，c表示不進行加密和簽名

收信界面，有s的即標明簽名郵件

![][19]

如果有公鑰的話，查看郵件，mutt會自動驗證簽名，並給出提示信息：

![][20]

# 其他郵件客戶端支持

* Linux用戶可以使用Thunderbird，KDE桌面用戶建議使用[Kmail][21],Kmail對Gmail有更好的支持。

* OS X自家的Mail就可以支持gpg郵件加密

* Windows用戶推薦[Thunderbird][22]

# 參考網站

1. [使用 GnuPG 實現文件加密和數字簽名——PGP 30分鐘簡明教程(2)\|ArchBoy](http://archboy.org/2013/05/15/gnupg-pgp-encrypt-decrypt-file-and-digital-signing-easy-tutorial/ "使用 GnuPG 實現文件加密和數字簽名——PGP 30分鐘簡明教程(2)")

2. [GnuPG\|Gentoo Wiki](http://wiki.gentoo.org/wiki/GnuPG "GnuPG --Gentoo Wiki")

3. [GnuPG\|Arch Wiki](https://wiki.archlinux.org/index.php/GnuPG "GnuPG --Arch Wiki")

4. [PGP\|維基百科](http://zh.wikipedia.org/wiki/PGP "PGP --維基百科")

5. [RSA加密算法\|維基百科](http://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95http://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95 "RSA加密算法 --維基百科")

6. [MuttGuide/UseGPG](http://dev.mutt.org/trac/wiki/MuttGuide/UseGPG "MuttGuide/UseGPG --Mutt")

[1]: https://zh.wikipedia.org/wiki/%E7%8E%8B%E5%B0%8F%E5%AE%81 "王小寧"

[2]: http://zh.wikipedia.org/wiki/%E9%9B%85%E8%99%8E%E4%B8%AD%E5%9B%BD#.E6.8A.AB.E9.9C.B2.E7.94.A8.E6.88.B6.E5.80.8B.E4.BA.BA.E4.BF.A1.E6.81.AF.E4.BA.89.E8.AE.AE "雅虎公司"

[3]: https://zh.wikipedia.org/wiki/%E5%B8%AB%E6%BF%A4 "師濤"

[4]: http://www.solidot.org/story?sid=36375 "中國提起釋放師濤"

[5]: https://zh.wikipedia.org/wiki/%E4%B8%AD%E8%8F%AF%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9C%8B%E6%8C%81%E4%B8%8D%E5%90%8C%E6%94%BF%E8%A6%8B%E8%80%85%E5%88%97%E8%A1%A8 "中華人民共和國持不同政見者列表"

[6]: http://zh.wikipedia.org/wiki/%E9%98%B2%E7%81%AB%E9%95%B7%E5%9F%8E "GFW"

[7]: http://zh.wikipedia.org/wiki/PGP "PGP"

[8]: http://zh.wikipedia.org/wiki/%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86 "對稱加密"

[9]: http://zh.wikipedia.org/wiki/%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86 "非對稱加密"

[10]: https://www.gnupg.org/ "GnuPG"

[11]: http://zh.wikipedia.org/wiki/%E5%AF%86%E7%A2%BC%E5%AD%B8#.E8.88.87.E5.AF.86.E7.A2.BC.E5.AD.B8.E6.9C.89.E9.97.9C.E7.9A.84.E6.B3.95.E5.BE.8B.E8.AD.B0.E9.A1.8C "與密碼學有關的法律議題"

[12]: http://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95 "RSA加密算法"

[13]: https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E8%A2%AB%E5%B0%81%E9%94%81%E7%BD%91%E7%AB%99%E5%88%97%E8%A1%A8 "被中華人民共和國封鎖的網站列表"

[14]: https://gpgtools.org/ "GPGTools"

[15]: http://www.gpg4win.org/ "Gpg4win"

[16]: http://blog.ibrother.me/2014/07/07/Use-email-with-mutt/ "使用mutt作為email客戶端"

[17]: http://ibrother.qiniudn.com/mailsend.png "發信界面"

[18]: http://ibrother.qiniudn.com/muttgpg.png "gpg選項"

[19]: http://ibrother.qiniudn.com/signmail.png "收信界面"

[20]: http://ibrother.qiniudn.com/goodsign.png "驗證成功"

[21]: http://www.kde.org/applications/internet/kmail/ "kmail"

[22]: https://www.mozilla.org/zh-CN/thunderbird/ "Thunderbird"

[23]: http://www.kde.org/applications/utilities/kgpg/ "KGpg"
