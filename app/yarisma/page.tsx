"use client";

import { useEffect, useState } from "react";
import SecenekButon from "./SecenekButon";

import veri from "./veri";
import SoruEkrani from "./SoruEkrani";
import BitisEkrani from "./BitisEkrani";

export default function Page() {
  const [puan, puanGuncelle] = useState(0); // puan state'i ve puanGuncelle fonksiyonu
  const [can, canGuncelle] = useState(3); // can state'i ve canGuncelle fonksiyonu
  const [dogruIndex, dogruIndexGuncelle] = useState(null); // doğruIndex state'i ve dogruIndexGuncelle fonksiyonu
  const [yanlisIndex, yanlisIndexGuncelle] = useState(null); // yanlisIndex state'i ve yanlisIndexGuncelle fonksiyonu
  const [aktifSoruIndex, aktifSoruIndexGuncelle] = useState(0); // aktifSoruIndex state'i ve aktifSoruIndexGuncelle fonksiyonu
  const [soruDegisiyor, soruDegisiyorGuncelle] = useState(false); // soruDegisiyor state'i ve soruDegisiyorGuncelle fonksiyonu
  const [oyunBitti, oyunBittiGuncelle] = useState(false); // oyunBitti state'i ve oyunBittiGuncelle fonksiyonu

  console.log("Sayfa render oluyor...")

  useEffect(() => {
    if(can === 0) { // Eğer can 0 ise oyunu bitir
      oyunBittiGuncelle(true);
    }
  }, [can]); // can değiştiğinde çalışacak. (useeffect içine state veya props eklersek, sadece o state veya props değiştiğinde çalışır)


  // Kullanıcının seçim yapmasını sağlayan fonksiyon
  function secimYap(indeks) {
    // Kullanıcının seçtiği seçenek doğru cevap mı kontrol et
    if (veri[aktifSoruIndex].dogruCevapIndeks === indeks) {
      // Doğru cevap ise
      puanGuncelle(puan + 5); // Doğru cevap ise puanı 5 arttır
    } else {
      // yanlış cevap ise
      yanlisIndexGuncelle(indeks); // Yanlış cevabın indeksini güncelle
      canGuncelle(can - 1); // Yanlış cevap ise canı 1 azalt
    }

    dogruIndexGuncelle(veri[aktifSoruIndex].dogruCevapIndeks); // Doğru cevabın indeksini güncelle

    soruDegisiyorGuncelle(true); // Soru değişiyor durumunu true yap
    // 3 saniye sonra bir sonraki soruya geç
    setTimeout(() => {
      // Eğer aktifSoruIndex son soruya ulaştıysa oyunu bitir
      if (aktifSoruIndex === veri.length - 1) {
        oyunBittiGuncelle(true); // Oyun bitti durumunu true yap
        return;
      }

      // Bir sonraki soruya geç
      aktifSoruIndexGuncelle(aktifSoruIndex + 1);

      // Doğru ve yanlış cevap indekslerini sıfırla
      dogruIndexGuncelle(null);
      yanlisIndexGuncelle(null);
      soruDegisiyorGuncelle(false); // Soru değişiyor durumunu false yap
    }, 1000); // 1 saniye bekle
  }

  return (
    <main className="p-8 flex flex-col items-center justify-center h-screen relative">
      <div id="oyun-bilgi" className="absolute top-8 right-8 flex gap-6">
        <div>
          Puan: <span className="border rounded-lg p-3">{puan}</span>
        </div>
        <div>
          Can: <span className="border rounded-lg p-3">{can}</span>
        </div>
      </div>

      {oyunBitti ? ( // Oyun bitti mi kontrol et
        <BitisEkrani puan={puan} can={can} />
      ) : ( // Oyun bitmediyse
        <SoruEkrani
          veri={veri}
          aktifSoruIndex={aktifSoruIndex}
          secimYap={secimYap}
          dogruIndex={dogruIndex}
          yanlisIndex={yanlisIndex}
          soruDegisiyor={soruDegisiyor}
        />
      )}
    </main>
  );
}
