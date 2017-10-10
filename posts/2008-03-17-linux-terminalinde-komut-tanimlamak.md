---
title: Linux Terminalinde Komut Tanımlamak
desc:
image:
date: "2008-03-17T07:00:00.000Z"
path: "/journal/linux-terminalinde-komut-tanimlamak"
---

Linux kabugunun en sevdigim ozelligi, `alias` ile yeni komutlar olusturabilmek.Bu sayede pek cok isi tek komutla yapabilirsiniz, ornegin?

Sistemi her yeniden yukleyisinizde `apt-get` programiyla ihtiyaciniz olan yazilimlari tek tek kurmak yerine, tek komutla bu isi halledebiliriz.

Adimlari izleyin:

* Herhangi bir editorle /home/$kullanici/.bash_aliases dosyasini acin.
* Ve istediginiz komutlari alias ile bu dosyada tanimlayin: `alias installMyPrograms="apt-get install rar unrar unzip cabextract"``
* Dosyayi save edin ve yeni bir shell oturumu acin, artik komutunuzu kullanabilirsiniz.

komutlari dosyaya yazmamizin sebebi, kalici olmalarini saglamak.eger kalici olmasina gerek olmayan bir komut tanimlamak isterseniz, dogrudan komut satirinda da alias kullanilabiliyor.

Eger konsol yazdiginiz komutlari dikkate almiyorsa, alias dosyanizi include etmiyor olabilir.
Bu problemi cozmek icin `/home/$kullanici/.bashrc` dosyasini editorunuzle acin ve su satirlarin onundeki comment'leri kaldirin:

```
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

Tekrar yeni bir shell oturumu acarak deneyin, artik calistigini goreceksiniz..
