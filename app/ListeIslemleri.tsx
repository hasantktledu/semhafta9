"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";

export default function ListeIslemleri({
  setSiralamaTuru,
  siralamaTuru,
  setFiltrelemeTuru,
  filtrelemeTuru
}) {
  const yeniSiralamaTuru = siralamaTuru === "az" ? "za" : "az"; // yeni sıralama türünü belirliyoruz.
  const ikonClassName = siralamaTuru !== "" ? "h-4 w-4" : "h-4 w-4 opacity-50";

  return (
    <div className="flex justify-between items-center gap-4">
      <Button
        onClick={() => setSiralamaTuru(yeniSiralamaTuru)}
        variant="secondary"
        size="sm"
        className="border p-2 rounded-md inline-block"
      >
        {siralamaTuru === "az" || siralamaTuru === "" ? (
          <ArrowDownAZ className={ikonClassName} />
        ) : (
          <ArrowDownZA className={ikonClassName} />
        )}
      </Button>

      <div className="flex gap-2">
        <Button
          onClick={() => setFiltrelemeTuru("tumu")}
          variant={filtrelemeTuru === "tumu" ? "default" : "outline"}
          size={"sm"}
        >
          Tümü
        </Button>
        <Button
          onClick={() => setFiltrelemeTuru("tamamlanan")}
          variant={filtrelemeTuru === "tamamlanan" ? "default" : "outline"}
          size={"sm"}
        >
          Tamamlanan
        </Button>
        <Button
          onClick={() => setFiltrelemeTuru("bekleyen")}
          variant={filtrelemeTuru === "bekleyen" ? "default" : "outline"}
          size={"sm"}
        >
          Bekleyen
        </Button>
      </div>
    </div>
  );
}
