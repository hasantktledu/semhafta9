"use client";

import { ModeToggle } from "@/components/mode-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sonuc from "./Sonuc";
import { useState } from "react";

export default function Home() {
  const [aranan, setAranan] = useState("");

  function aramaYap() {

  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 justify-center items-center">
        <ModeToggle />

        <h1 className="text-6xl">TDK Sözlük v.1.0</h1>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Sözcük girin.." value={aranan} onChange={ (o)=>setAranan(o.currentTarget.value) } />
            <Button onClick={aramaYap} type="submit">
              Ara
            </Button>
          </div>
        </div>

        <Sonuc aranan={aranan} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>© 2025 Hasan Tokatlı</p>
      </footer>
    </div>
  );
}
