import { useContext } from "react";
import C3 from "./C3";
import GlobalHavuz, { GlobalContextType } from "./global-context";
import { Button } from "@/components/ui/button";

export default function C2() {
    const { setIsim } = useContext<GlobalContextType>(GlobalHavuz);

    function isimDegistir(): void {
        setIsim("Ahmet");
    }

    return (
        <div className="border border-gray-600 p-4 mt-4 rounded">
            <h1>Component 2 <Button onClick={ isimDegistir } variant="outline" className="border-red-500">Click me</Button></h1>
            <C3 />
        </div>
    )
}


