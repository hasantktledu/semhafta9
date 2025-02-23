"use client";

import { useEffect, useState } from "react";
import MaddeListe from "./MaddeListe";

export default function Sonuc({ aranan }: { aranan: string }) {
  const [bulunanMaddeler, setBulunanMaddeler] = useState([]);

  useEffect(() => {
    async function anlamGetir() {
      const response = await fetch(`/gts.json`);
      const veri = await response.json();

      setBulunanMaddeler(veri.filter((eleman: { madde: string }) => eleman.madde === aranan));
    }

    anlamGetir();
  }, [aranan]);

  console.log(bulunanMaddeler)

  return (
    <div>
      {bulunanMaddeler.length > 0 ? (
        <MaddeListe maddeler={bulunanMaddeler} />
      ) : (
        <p>Aradığınız kelime bulunamadı.</p>
      )}
    </div>
  );
}
