import C2 from "./C2";

export default function C1({isim}) {

    return (
        <div className="border border-gray-400 p-4 mt-4 rounded">
            <h1>Component 1 - {isim}</h1>
            <C2 isim={isim} />
        </div>
    )
}