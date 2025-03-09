export default function IsEkleForm({vekilFonksiyon}) {

    function formGonder(olay) {
        olay.preventDefault(); // Sayfanın yenilenmesini engelliyoruz.

        /*
        const formData = new FormData(olay.target); // formdaki verileri alıyoruz.
        const formIsAdi = formData.get("formIsAdi"); // formdaki is adını alıyoruz.
        */
        const formIsAdi = olay.target.formIsAdi.value; // formdaki is adını alıyoruz.
        if(formIsAdi.trim() === "") { alert("İş bilgisi boş.."); return } // Eğer is adı boşsa fonksiyonu sonlandırıyoruz.

        vekilFonksiyon({type: "ekle", isAdi: formIsAdi}); // yeniIsEkle fonksiyonunu çalıştırıyoruz.
    }

    return (
        <form className="flex gap-4" onSubmit={formGonder}>
            <input name="formIsAdi" type="text" placeholder="Yapılacak işi girin" className="border border-gray-300 p-2 text-gray-600" />
            <button type="submit" className="bg-blue-500 text-white p-2">Ekle</button>
        </form>
    );
}