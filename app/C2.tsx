import C3 from "./C3";

export default function C2({isim}) {

    return (
        <div className="border border-gray-600 p-4 mt-4 rounded">
            <h1>Component 2 - {isim}</h1>
            <C3 isim={isim} />
        </div>
    )
}