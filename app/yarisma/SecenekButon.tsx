export default function SecenekButon({ soruDegisiyor, secenek, indeks, secimYap, dogruIndex, yanlisIndex }) {
  return (
    <button
            onClick={() => soruDegisiyor === false && secimYap(indeks)} // Soru değişiyor durumu false ise seçim yap
            className={`border py-2 px-4 rounded-md 
            ${dogruIndex === indeks ? "bg-green-600" : ""} 
            ${yanlisIndex === indeks ? "bg-red-600" : ""}`
            }
          >
            {secenek}
          </button>
  );
}