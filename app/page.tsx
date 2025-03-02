"use client";

import React, { useState, useCallback } from "react";

export default function Home() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);


  /*
  const increment1 = () => {
    setCount1(count1 + 1);
  };
  */

  /*
  const increment2 = () => {
    setCount2(count2 + 1);
  }
  */

  
  const increment1 = useCallback(() => {
    setCount1(count1 + 1);
  }, [count1]);
   
  const increment2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      {/* İçerik buraya gelecek */}
      <h1>useCallback Örneği - 1</h1>

      <div className="flex flex-col items-center gap-3">
        <p>Count 1: {count1}</p>
        <Button onClick={increment1}>Increment Count 1</Button>
        <p>Count 2: {count2}</p>
        <Button onClick={increment2}>Increment Count 2</Button>
      </div>
    </div>
  );
}

function Button({ onClick, children }) {
  console.log("Button rendered");
  return <button onClick={onClick} className="border border-red-200 py-2 px-4 rounded-md shadow-sm hover:shadow-lg hover:shadow-white transition-shadow duration-300">{children}</button>;
}
