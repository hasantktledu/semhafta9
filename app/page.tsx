"use client";

import Urun from "./Urun";
import { Button } from "@/components/ui/button"
import { CirclePlus, Eye } from "lucide-react"
import { useState } from "react";

export default function Home() {
  const [gizliMi, setGizliMi] = useState(false);
  const [urunAdet, setUrunAdet] = useState(0);

  function urunGosterGizle() {
    setGizliMi( eskiDurum => !eskiDurum ); // Eğer true ise false, false ise true yapar.
  }

  function urunAdetArttir() {
    setUrunAdet( eskiAdet => eskiAdet + 1 );
  }

  return (
    <main className="container mx-auto max-w-[1280px] p-6">

      <div className="flex gap-4 mb-4">
        <Button onClick={ urunGosterGizle } variant={"outline"}><Eye />  Ürünü Göster/Gizle</Button>
        <Button onClick={ urunAdetArttir } variant={"outline"} className="border-red-500"><CirclePlus />  Adet Arttır</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
         { gizliMi === false && <Urun urunAdet={urunAdet} />  /* Eğer gizliMi false ise Urun componentini gösterir. */ } 
      </div>
    </main>
  );
}
