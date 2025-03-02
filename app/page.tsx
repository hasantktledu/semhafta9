"use client"

import { useEffect, useRef, useState } from "react"

export default function Home() {
  // let ad = "Hasan"
  const ad = useRef("Hasan")

  const inputReferans = useRef(null) // DOM #isim-input'a erişmek için oluşturduk

  const [sayi, setSayi] = useState(0)

  function arttir() {
    const yaziUzunluk = inputReferans.current.value.length
    setSayi(eskiDeger => eskiDeger + yaziUzunluk)

    console.log(sayi) 
  }

  function adDegistir() {
    // ad = "Mehmet"
    ad.current = "Mehmet"
  } 

  useEffect(() => {
    inputReferans.current.focus()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-200 rounded-lg shadow-lg p-8">
        {/* Your content will go here */}
        <h1>Merhaba, {ad.current} Puan: {sayi}</h1>
        <button className="border border-red-500 rounded-lg px-4 py-2" onClick={arttir}>Arttır +</button>

        <button className="border border-green-500 rounded-lg px-4 py-2" onClick={adDegistir}>Ad Değiştir</button>

        <input ref={inputReferans} id="isim-input" type="text" className="border border-gray-800 text-emerald-700 rounded-lg px-4 py-2" />
      </div>
    </div>
  );
}
