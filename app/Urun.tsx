"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Urun({ urunAdet }) {
  const [sayi, setSayi] = useState(0);

  useEffect(function () {
    setSayi((eskiSayi) => eskiSayi + 1);
  }, []);

  console.log("1 - Urun componenti çalıştı 1. useEffect öncesinde çalışır.");

  useEffect(function () {
    console.log("4 - Urun componenti mount edildi."); // Component yüklendiğinde(ekrana render bittiğinde) çalışır.

    return function () {
      // Cleanup fonksiyonu
      console.log("5 - Urun componenti unmount(demonte) edildi."); // Component kaldırıldığında çalışır.
    };
  }, []); // useEffect'in ikinci parametresi olan dizi boş olduğu için sadece component mount ve unmount durumlarında çalışır.

  console.log("2 - Urun componenti çalıştı 2.");

  return (
    <div>
      {" "}
      3
      <Card>
        <CardHeader>
          <CardTitle>Card Title {sayi}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>
            Card Footer <span>{urunAdet}</span>{" "}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
