"use client";

import { useEffect, useReducer } from "react";
import IsEkleForm from "./IsEkleForm";
import IsListe from "./IsListe";
import ListeIslemleri from "./ListeIslemleri";
import reducerFonksiyonu from "./reducers/yapilacaklar";


export default function Home() {
  const [yapilacaklar, vekilFonksiyon] = useReducer(reducerFonksiyonu, {veri: [], filtreler: { filtreliVeri: [], tamamlanmaDurumu: "tumu", kategori: "tumu", bitisTarihi: "tumu" }, siralama: { alfabetikSiralama: "" }});

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


  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1>
        ToDo Uygulaması {yapilacaklar.filtreler.filtreliVeri.filter((is) => is.tamamlandi).length} /{" "}
        {yapilacaklar.filtreler.filtreliVeri.length}{" "}
      </h1>
      <ListeIslemleri
        yapilacaklar={yapilacaklar}
        vekilFonksiyon={vekilFonksiyon}
      />
      <IsListe
        isler={yapilacaklar.filtreler.filtreliVeri}
        vekilFonksiyon={vekilFonksiyon}
      />
      <IsEkleForm vekilFonksiyon={vekilFonksiyon} />
    </main>
  );
}
