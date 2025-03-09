"use client";

import { useEffect, useState } from "react";
import IsEkleForm from "./IsEkleForm";
import IsListe from "./IsListe";
import { Is } from "@/types/is";
import ListeIslemleri from "./ListeIslemleri";

export default function Home() {
  const [isler, setIsler] = useState<Is[]>([]);
  const [siralamaTuru, setSiralamaTuru] = useState<string>("");
  const [filtrelemeTuru, setFiltrelemeTuru] = useState<string>("tumu");

  useEffect(() => {
    async function veriCek() {
      // veriCek adında bir fonksiyon oluşturduk.
      const response = await fetch("/isler.json"); // fetch ile isler.json dosyasını çekiyoruz.
      const data = await response.json(); // js formatına çeviriyoruz.

      setIsler(data); // setIsler fonksiyonu ile data'yı set ediyoruz.
    }

    veriCek(); // veriCek fonksiyonunu çalıştırıyoruz.
  }, []); // useEffect'i sadece bir kere çalıştırmak için boş bir array verdik.

  function yeniIsEkle( isAdi:string ) {
    const yeniIs = { id: Date.now(), isAdi, tamamlandi: false }
    setIsler( mevcutIsler => {
      return [...mevcutIsler, yeniIs];
    });
  }

  function isSil(id:number) {
    setIsler((oncekiler) => { // setIsler fonksiyonu ile isler dizisini güncelliyoruz.
      return oncekiler.filter((is) => is.id !== id); // filter fonksiyonu ile is.id'si tıklanan id'ye eşit olmayanları döndürüyoruz.
    });
  }

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

  function sirala(yon:string, veri: Is[]) {
      if( yon === "az" ) { // eğer yon a-z ise
        return [...veri].sort((a, b) => a.isAdi.localeCompare(b.isAdi, "tr"));
      }
      else if( yon === "za" ) { // eğer yon z-a ise
        return [...veri].sort((a, b) => b.isAdi.localeCompare(a.isAdi, "tr"));
      }

      return veri; // sıralama yapmadıysa aynı diziyi döndür.
  }

  function filtrele(filtreTuru:string, veri: Is[]) { // filtre türleri: "tumu", "tamamlanan", "bekleyen"
    if( filtreTuru === "tumu" ) {
      return veri;
    }
    else if( filtreTuru === "tamamlanan" ) {
      return veri.filter(is => is.tamamlandi);
    }
    else if( filtreTuru === "bekleyen" ) {
      return veri.filter(is => !is.tamamlandi);
    }
  }

  const siralanmisIsler = sirala(siralamaTuru, isler); // sıralama fonksiyonunu çalıştırıp sıralanmış işleri alıyoruz.
  const filtrelenmisIsler = filtrele(filtrelemeTuru, siralanmisIsler); // filtreleme fonksiyonunu çalıştırıp filtrelenmiş işleri alıyoruz.

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1>ToDo Uygulaması  { isler.filter(is=>is.tamamlandi).length }  / { isler.length } </h1>
      <ListeIslemleri setSiralamaTuru={setSiralamaTuru} siralamaTuru={siralamaTuru} setFiltrelemeTuru={setFiltrelemeTuru} filtrelemeTuru={filtrelemeTuru} />
      <IsListe isler={filtrelenmisIsler} tamamlandiGuncelle={tamamlandiGuncelle} isSil={isSil} />
      <IsEkleForm yeniIsEkle={yeniIsEkle} />
    </main>
  );
}
