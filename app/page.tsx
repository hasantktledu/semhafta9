"use client";

import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl my-3">Ana Sayfa</h1>
      
      <button onClick={() => router.push('/yarisma')} className="rounded-lg border py-3 px-5">Yarışmaya Başla</button>
    </main>
  );
}
