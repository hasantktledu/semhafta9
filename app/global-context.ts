import { createContext } from "react";

export interface GlobalContextType {
  isim: string;
  setIsim: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalHavuz = createContext<GlobalContextType>({
  isim: '',  // Provide default values
  setIsim: () => {}  // Provide a default function
});

export default GlobalHavuz;