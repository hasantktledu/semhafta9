"use client";

import { useEffect, useState, useReducer } from "react";
import IsEkleForm from "./IsEkleForm";
import IsListe from "./IsListe";
import { Is } from "@/types/is";
import ListeIslemleri from "./ListeIslemleri";
import reducerFonksiyonu from "./reducers/yapilacaklar";


export default function Home() {
  const [siralamaTuru, setSiralamaTuru] = useState<string>("");
  const [filtrelemeTuru, setFiltrelemeTuru] = useState<string>("tumu");

  const [yapilacaklar, vekilFonksiyon] = useReducer(reducerFonksiyonu, []);

  useEffect(() => {
    async function veriCek() {
      // veriCek adında bir fonksiyon oluşturduk.
      const response = await fetch("/isler.json"); // fetch ile isler.json dosyasını çekiyoruz.
      const data = await response.json(); // js formatına çeviriyoruz.

      //setIsler(data); // setIsler fonksiyonu ile data'yı set ediyoruz.
      vekilFonksiyon({ type: "veriCek", veri: data }); // vekilFonksiyon ile reducer'a veriCek tipinde bir action gönderiyoruz.
    }

    veriCek(); // veriCek fonksiyonunu çalıştırıyoruz.
  }, []); // useEffect'i sadece bir kere çalıştırmak için boş bir array verdik.


  function sirala(yon: string, veri: Is[]) {
    if (yon === "az") {
      // eğer yon a-z ise
      return [...veri].sort((a, b) => a.isAdi.localeCompare(b.isAdi, "tr"));
    } else if (yon === "za") {
      // eğer yon z-a ise
      return [...veri].sort((a, b) => b.isAdi.localeCompare(a.isAdi, "tr"));
    }

    return veri; // sıralama yapmadıysa aynı diziyi döndür.
  }

  function filtrele(filtreTuru: string, veri: Is[]) {
    // filtre türleri: "tumu", "tamamlanan", "bekleyen"
    if (filtreTuru === "tumu") {
      return veri;
    } else if (filtreTuru === "tamamlanan") {
      return veri.filter((is) => is.tamamlandi);
    } else if (filtreTuru === "bekleyen") {
      return veri.filter((is) => !is.tamamlandi);
    }
  }

  const siralanmisIsler = sirala(siralamaTuru, yapilacaklar); // sıralama fonksiyonunu çalıştırıp sıralanmış işleri alıyoruz.
  const filtrelenmisIsler = filtrele(filtrelemeTuru, siralanmisIsler); // filtreleme fonksiyonunu çalıştırıp filtrelenmiş işleri alıyoruz.

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1>
        ToDo Uygulaması {yapilacaklar.filter((is) => is.tamamlandi).length} /{" "}
        {yapilacaklar.length}{" "}
      </h1>
      <ListeIslemleri
        setSiralamaTuru={setSiralamaTuru}
        siralamaTuru={siralamaTuru}
        setFiltrelemeTuru={setFiltrelemeTuru}
        filtrelemeTuru={filtrelemeTuru}
      />
      <IsListe
        isler={filtrelenmisIsler}
        vekilFonksiyon={vekilFonksiyon}
      />
      <IsEkleForm vekilFonksiyon={vekilFonksiyon} />
    </main>
  );
}
