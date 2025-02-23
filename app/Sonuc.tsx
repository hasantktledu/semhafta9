"use client";

import { useEffect, useState } from "react";
import MaddeListe from "./MaddeListe";

export default function Sonuc({ aranan }: { aranan: string }) {
  const [bulunanMaddeler, setBulunanMaddeler] = useState([])
  const [yukleniyor, setYukleniyor] = useState(true)

  useEffect(() => {
    async function anlamGetir() {
      const response = await fetch(`/gts.json`);
      const veri = await response.json();

      setBulunanMaddeler(veri.filter((eleman: { madde: string }) => eleman.madde.toLocaleLowerCase('tr-TR') === aranan.toLocaleLowerCase('tr-TR')));
      setYukleniyor(false);
    }

    anlamGetir();
  }, [aranan]);

  return (
    <div>
      {yukleniyor ? (
        <p>Arama başlatıldı..</p>
      ) : (
        <MaddeListe maddeler={bulunanMaddeler} />
      )}
    </div>
  );
}
