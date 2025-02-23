import AnlamListe from "./AnlamListe";

import { Anlam } from "./AnlamListe";

interface Madde {
  anlamlarListe: Anlam[];
}

interface MaddeListeProps {
  maddeler: Madde[];
}

export default function MaddeListe({ maddeler }: MaddeListeProps) {
  return (
    maddeler.length > 0 ?
    (
      <div>
        <h3 className="text-xl mb-6">Maddeler</h3>
        <div>
          {maddeler.map((madde, indeks) => (
            <AnlamListe sira={indeks+1} key={indeks} anlamlarListe={madde.anlamlarListe} />
          ))}
        </div>
      </div>
    ) : (
      <p>Aradığınız kelimeye ait madde bulunamadı.</p>
    )
  );
}
