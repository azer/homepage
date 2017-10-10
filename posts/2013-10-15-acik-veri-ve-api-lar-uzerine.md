---
title: Açık Veri ve API’lar Üzerine
desc: Neden daha fazla API'a ihtiyacımız var ?
image: https://cdn-images-1.medium.com/max/800/0*PxMVNUsIsGFl2L-J.jpeg
date: "2013-10-15T07:00:00.000Z"
path: "/journal/acik-veri-ve-api-lar-uzerine"
---

Yukarıdakı fotoğrafta hackerların çeşitli API’ları kullanarak giriştikleri yaratıcılık serüvenlerinden bir kare görüyoruz.

Bu yazıda, Türkiye’de eksikliğini çektiğimiz gerçek anlamdaki “hacker” kültürünün ham maddesi olan açık veri ve API’ların, yazılım endüstrisi açısından neden hayati bir öneme sahip olduğunu açıklamaya çalışacağım.

# API Nedir ?

API’ın tanımını şöyle basitleştirebiliriz; bir programın, diğer programlarla iletişim kurmak amacıyla ortaya çıkardığı bir arayüzdür. Bu arayüz sayesinde, -herhangi bir seremoniye gerek kalmadan- dilediğimiz sitedeki bir veriyi kullanarak yeni bir uygulama yaratabiliruz. Başka bir API ile birleştirip, yepyeni bir ürün bile geliştirebiliriz.

## Web Uygulamalarında API

Web uygulamalarında Public (Herkese açık) API’lar üç nedenle gereklidir;

1. Yaratıcı, dinamik bir marketi aktif hale getirmek için
2. Farklı şirketlerin (Örn: Facebook ve Twitter) geliştirdiği uygulamaların birbirlerine entegre olabilmeleri için
3. Şirketlerin daha kaliteli ve sağlıklı yazılımlar üretmesi için. API’lar yazılımı daha iyi abstraction’lara ve katmanlar arasında kesin kontratlar yapmaya zorlar. Bu iki husus yazılım kalitesini artırır, ana prototipin ortaya çıkışından sonraki üretim ve bakım maliyetlerini hatrı sayılır miktarda düşürür.
4. İşbirliği yapabilmek için

Benim bu yazıda değineceğim madde ise, birinci madde. Bu maddeyi biraz daha açmak gerekirse, API’lar şirketlerin ekonomisinin gençlerin fikirleri ve enerjisiyle (dolayısıyla da hayatın kendisiyle!) daha sağlam bağlar kurmasını ve sürekli olarak yeni fikirlerin düşük maliyetle denendiği yaratıcı süreçlerin döngüsünü sağlar.

Somut bir örnek olarak, müzik dinleme servisi olan Rdio’nun API’ını kullanarak yaptığım bir jimnastik uygulamasını ele alalım: 7min.io

Bu uygulama ile Rdio kullanıcıları kendi jimnastik playlistlerini oluşturarak, seçtikleri müziklerin sırayla egzersize göre değişmesini sağlıyorlar.

7min.io gibi binlerce “third party” uygulama, Rdio’nun API’ını kullanarak birkaç saatte bootstrap edilip paylaşılabiliyor.

Buradaki ekonomik güç, şirketin çok dinamik ve gençlerin eğlenerek üretimin bir parçası olacakları kaotik bir pazarı aktif hale getirmek.

Üretken bir topluluğu şirketinizin arkasına almak, ürününüzü çok daha güçlendirecektir.

## E-Devlet Uygulamalarında Açık Data ve API

Devletlerin yazılım endüstrisinde pek parlak işler çıkarmadığı sanırım herkesin gözlemlediği bir durumdur. Bunun üç ana nedeni var;

* Devlet mekanizmasının teknoloji sektöründe rekabet edememesi (doğal olarak), ve yenilikleri adapte eden sürekliliği sağlayamaması
* İnsanların neye ihtiyacı olduğunu şirketler kadar iyi anlayamaması
* Kar üretmedikleri için, yazılım üretmek için gerekli işgücü/kazanç dengesine sahip olmamaları

ABD’da bu eksiklikler “Code for America” adlı, hackerların doğrudan devletin yazılım sürecine dahil edilip, devlet uygulamaları geliştirmesini sağlayan organizasyonla gideriliyor.

Bu organizasyonun internet sitesine girdiğinizde gözünüze çarpan sayfalardan biri de, “Embrace Open Data”, yani “Açık Veriyi Destekleyin” olacaktır.

Zira Code For America’daki hem mühendisler, hem de devletin kendisi, devletin yazılım sektöründe rekabetçi rolünde olmasından ziyade, ellerindeki verinin halka açılıp, insanların kendi uygulamalarını geliştirmesinden yana.

Bu çalışmalara örnek olarak Oakland şehrinin açık veri sitesini gösterebiliriz; [data.openoakland.org](http://data.openoakland.org/)

Bir diğer önemli örnek de, geçen ay grev yapan BART (San Francisco’da Metro’nun tuhaf isimlendirilişi) çalışanlarının gelirlerininin, bir [Shirley Wu](https://twitter.com/shirleyxywu) tarafından görselleştirilmesi; sxywu.github.io/80k

Bu noktada data formatlarının geliştiriciyi limitlediği dikkatinizi çekebilir. Code For America’ya önemli katkılarda bulunan [Max Ogden](http://twitter.com/maxogden)’in Dat projesi gelecekte Open Oakland’daki gibi dataların, JSON vb. diğer formatlarda kolayca paylaşılmasını sağlayacak.

Türkiye’de de açık veriyi devletten talep etmemiz ve Dat gibi projeleri yakından takip ederek, katkıda bulunarak, hayatımıza entegre etmemiz gerekiyor.

Güçlü bir yazılım endüstrisi için hayatla sıkı bağlar kurabilen yazılımlara ve açık marketlere ihtiyacımız var. Şirketlerin ve devletin bu konuda dikkatinin nasıl çekileceğine emin değilim, ama onları beklememiz gerekmiyor. Başlangıç noktası olarak kendi API serverlarımızı kurup yayınlayabiliriz.
