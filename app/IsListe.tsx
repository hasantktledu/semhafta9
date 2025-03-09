import Is from "./Is";

export default function IsListe({isler, tamamlandiGuncelle, isSil}) {
    return (
        <div className="flex flex-col gap-4">
            {
                isler.map((is) => (
                    <Is key={is.id} is={is} tamamlandiGuncelle={tamamlandiGuncelle} isSil={isSil} />
                ))
            }
        </div>
    );
}