export default function IsEkleForm() {
    return (
        <form className="flex gap-4">
            <input type="text" placeholder="Yapılacak işi girin" className="border border-gray-300 p-2 text-gray-600" />
            <button type="submit" className="bg-blue-500 text-white p-2">Ekle</button>
        </form>
    );
}