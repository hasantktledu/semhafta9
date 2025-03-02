"use client";

import { useMemo, useState } from "react";


export default function Home() {
  const [sayi, setSayi] = useState(0);
  const [sayac2, setSayac2] = useState(0);

  const zorHesaplamaSonucu = useMemo(() => zorHesaplama(sayi), [sayi]);
  
  function sayiArttir() {
    setSayi(sayi + 1);
  }

  function sayac2Arttir() {
    setSayac2(sayac2 + 1);
  }

  return (
    <main className="container flex flex-col items-center justify-center h-screen">
      <h1>useMemo - <button onClick={sayiArttir}>Tıkla</button></h1>
      <p>{sayi}</p>
      <p> { zorHesaplamaSonucu }  </p>
      <button className="text-lg" onClick={sayac2Arttir}>Sayaç 2 {sayac2}</button>
    </main>
  );
}

function zorHesaplama(sayi) {
  console.log("Zor Hesaplama Çalıştı"); 

  for (let i = 0; i < 900000000; i++) {
    sayi += i;
  }

  return sayi;
}