import { useContext } from "react";
import { GlobalHavuz, GlobalContextType } from "./global-context";

export default function C3() {
    const { isim } = useContext<GlobalContextType>(GlobalHavuz);

    return (
        <div className="border border-gray-800 p-4 mt-4 rounded">
            <h1>Component 3 - {isim}</h1>
            <p>Son komponent</p>
        </div>
    )
}