export interface Anlam {
    anlam: string;
}

interface AnlamListeProps {
    anlamlarListe: Anlam[];
    sira: number;
}

export default function AnlamListe({anlamlarListe, sira}: AnlamListeProps) {

    return (
        <>
            <div className="border p-4 rounded-lg mb-4">
                <h4 className="text-lg mb-2">{sira}. Madde</h4>
                <ul>
                    {
                        anlamlarListe.map((anlam, indeks) => (
                            <li key={indeks}>
                                <strong>{indeks+1}. anlam: </strong> {anlam.anlam}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}