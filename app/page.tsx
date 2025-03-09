"use client";

import { useEffect, useState } from "react";
import IsEkleForm from "./IsEkleForm";
import IsListe from "./IsListe";
import { Is } from "@/types/is";


export default function Home() {
  const [isler, setIsler] = useState<Is[]>([]);

  function tamamlandiGuncelle(id:number) {
    setIsler((oncekiler) => {
      return oncekiler.map((is:Is) => {  // oncekiler dizisini map fonksiyonu ile dönüyoruz.
        if (is.id === id) { // Eğer is.id, id'ye eşitse yani işin id'si, tıklanan id'ye eşitse
          return { ...is, tamamlandi: !is.tamamlandi }; // is objesini kopyalayıp tamamlandi değerini tersine çeviriyoruz.      
        }
        return is; // Eğer işin id'si tıklanan id'ye eşit değilse aynı işi geri döndürüyoruz.
      }
      );
    });
  }

  function yeniIsEkle( isAdi:string ) {
    setIsler( mevcutIsler => {
      return [...mevcutIsler, { id: Date.now(), isAdi, tamamlandi: false }];
    });
  }

  function isSil(id:number) {
    setIsler((oncekiler) => { // setIsler fonksiyonu ile isler dizisini güncelliyoruz.
      return oncekiler.filter((is) => is.id !== id); // filter fonksiyonu ile is.id'si tıklanan id'ye eşit olmayanları döndürüyoruz.
    }); 
  }

  useEffect(() => {
    async function veriCek() {
      // veriCek adında bir fonksiyon oluşturduk.
      const response = await fetch("/isler.json"); // fetch ile isler.json dosyasını çekiyoruz.
      const data = await response.json(); // js formatına çeviriyoruz.
      setIsler(data); // setIsler fonksiyonu ile data'yı set ediyoruz.
    }

    veriCek(); // veriCek fonksiyonunu çalıştırıyoruz.
  }, []); // useEffect'i sadece bir kere çalıştırmak için boş bir array verdik.

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1>ToDo Uygulaması  { isler.filter(is=>is.tamamlandi).length }  / { isler.length } </h1>
      <IsListe isler={isler} tamamlandiGuncelle={tamamlandiGuncelle} isSil={isSil} />
      <IsEkleForm yeniIsEkle={yeniIsEkle} />
    </main>
  );
}
