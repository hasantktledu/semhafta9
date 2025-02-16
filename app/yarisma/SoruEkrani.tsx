import SecenekButon from "./SecenekButon";

export default function SoruEkrani({ veri, aktifSoruIndex, secimYap, dogruIndex, yanlisIndex, soruDegisiyor }) {
    
    
    return (
        <section className="flex flex-col items-center justify-center">
        <p className="mb-8 text-4xl">{veri[aktifSoruIndex].soru}</p>

        <div className="flex flex-col items-center justify-center gap-4">
            {
                veri[aktifSoruIndex].secenekler.map((secenek, indeks) => (
                    <SecenekButon key={indeks} soruDegisiyor={soruDegisiyor} secenek={secenek} indeks={indeks} secimYap={secimYap} dogruIndex={dogruIndex} yanlisIndex={yanlisIndex} />
                ))
            }
        </div>
      </section>
    );
}