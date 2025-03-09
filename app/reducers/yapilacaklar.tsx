
const reducerFonksiyonu = (state, action) => {
  switch (action.type) {
    case "veriCek":
      console.log("Veri çekme işlemi çalıştı");
      return action.veri;
    case "ekle":
      const yeniIs = { id: Date.now(), isAdi: action.isAdi, tamamlandi: false };
      return [...state, yeniIs];
    case "sil":
      console.log("Veri silme işlemi çalıştı");
      return state.filter((is) => is.id !== action.id);
    case "guncelle":
      return state.map((is: Is) => {
        if (is.id === action.id) {
          return { ...is, tamamlandi: !is.tamamlandi }; 
        }
        return is; 
      });
    default: // default olarak state'i döndürüyoruz.
      return state;
  }
};

export default reducerFonksiyonu; // reducerFonksiyonu fonksiyonunu dışarı aktarıyoruz.