const reducerFonksiyonu = (state, action) => {
  switch (action.type) {

    case "veriCek":
      console.log("Veri çekme işlemi çalıştı");
      return { ...state, veri: action.veri, filtreler: {...state.filtreler, filtreliVeri: action.veri} };

    case "ekle":
      const yeniIs = { id: Date.now(), isAdi: action.isAdi, tamamlandi: false };
      let yeniVeri = [...state.veri, yeniIs];

      yeniVeri = alfabetikSirala(yeniVeri, state.siralama.alfabetikSiralama);

      return {...state, veri: yeniVeri, filtreler: {...state.filtreler, filtreliVeri: tamamlanmaDurumuFiltrele(yeniVeri, state.filtreler.tamamlanmaDurumu)}}   //[...state, yeniIs];

    case "sil":
      console.log("Veri silme işlemi çalıştı");
      const silinmisVeri = state.veri.filter((is) => is.id !== action.id)
      return {...state, veri: silinmisVeri, filtreler: {...state.filtreler, filtreliVeri: tamamlanmaDurumuFiltrele(silinmisVeri, state.filtreler.tamamlanmaDurumu)}}    //state.filter((is) => is.id !== action.id);

    case "guncelle":
      const guncelVeri = state.veri.map((is) => {
        if (is.id === action.id) {
          return { ...is, tamamlandi: !is.tamamlandi }; 
        }
        return is; 
      });
      return {...state, veri: guncelVeri};

    case "alfabetikSirala":
      const veri = state.veri;
      const siralanmisVeri = alfabetikSirala(veri, action.yon);

      return { ...state, veri: siralanmisVeri, siralama: {alfabetikSiralama: action.yon}, filtreler: {...state.filtreler, filtreliVeri: tamamlanmaDurumuFiltrele(siralanmisVeri, state.filtreler.tamamlanmaDurumu)} };

    case "tamamlanmaDurumuFiltrele":
      return {...state, filtreler: {...state.filtreler, filtreliVeri: tamamlanmaDurumuFiltrele(state.veri, action.tamamlanmaDurumu), tamamlanmaDurumu: action.tamamlanmaDurumu}};
   
    default: // default olarak state'i döndürüyoruz.
      return state;
  }
};

function tamamlanmaDurumuFiltrele(veri, tamamlanmaDurumu) {
  if (tamamlanmaDurumu === "tumu") {
    return veri;
  } else if (tamamlanmaDurumu === "tamamlanan") {
    return veri.filter((is) => is.tamamlandi);
  } else if (tamamlanmaDurumu === "bekleyen") {
    return veri.filter((is) => !is.tamamlandi);
  }
}

function alfabetikSirala(veri, yon) {
  if(yon === "")
    return veri;

  if ( yon === "az") {
    return [...veri].sort((a, b) => a.isAdi.localeCompare(b.isAdi, "tr"));
  } else if ( yon === "za") {
    return [...veri].sort((a, b) => b.isAdi.localeCompare(a.isAdi, "tr"));
  }
} 

export default reducerFonksiyonu; // reducerFonksiyonu fonksiyonunu dışarı aktarıyoruz.