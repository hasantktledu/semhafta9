"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";

export default function ListeIslemleri({
  vekilFonksiyon,
  yapilacaklar
}) {
  const yeniAlfabetikSiralamaYonu = yapilacaklar.siralama.alfabetikSiralama === "az" ? "za" : "az"; // yeni sıralama türünü belirliyoruz.
  const ikonClassName = yapilacaklar.siralama.alfabetikSiralama !== "" ? "h-4 w-4" : "h-4 w-4 opacity-50";

  return (
    <div className="flex justify-between items-center gap-4">
      <Button
        onClick={() => vekilFonksiyon({type: "alfabetikSirala", yon: yeniAlfabetikSiralamaYonu})}
        variant="secondary"
        size="sm"
        className="border p-2 rounded-md inline-block"
      >
        {yapilacaklar.siralama.alfabetikSiralama === "az" || yapilacaklar.siralama.alfabetikSiralama === "" ? (
          <ArrowDownAZ className={ikonClassName} />
        ) : (
          <ArrowDownZA className={ikonClassName} />
        )}
      </Button>

      <div className="flex gap-2">
        <Button
          onClick={() => vekilFonksiyon({type: "tamamlanmaDurumuFiltrele", tamamlanmaDurumu: "tumu"}) }
          variant={yapilacaklar.filtreler.tamamlanmaDurumu === "tumu" ? "default" : "outline"}
          size={"sm"}
        >
          Tümü
        </Button>
        <Button
          onClick={() => vekilFonksiyon({type: "tamamlanmaDurumuFiltrele", tamamlanmaDurumu: "tamamlanan"})}
          variant={yapilacaklar.filtreler.tamamlanmaDurumu === "tamamlanan" ? "default" : "outline"}
          size={"sm"}
        >
          Tamamlanan
        </Button>
        <Button
          onClick={() => vekilFonksiyon({type: "tamamlanmaDurumuFiltrele", tamamlanmaDurumu: "bekleyen"})}
          variant={yapilacaklar.filtreler.tamamlanmaDurumu === "bekleyen" ? "default" : "outline"}
          size={"sm"}
        >
          Bekleyen
        </Button>
      </div>
    </div>
  );
}
