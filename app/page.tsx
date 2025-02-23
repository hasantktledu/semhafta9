"use client";

import { useState } from "react";
import C1 from "./C1";

export default function Home() {
  const [isim, setIsim] = useState("Mehmet");

  return (
    <main className="container mx-auto max-w-[1200px] border border-gray-200 p-4">
      <h1 className="text-2xl font-bold">useContext Hooku</h1>
        <C1 isim={isim} />
    </main>
  );
}
