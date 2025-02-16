export default function BitisEkrani({puan, can}) {
    

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">Oyun Bitti!</h1>
            <p className="text-2xl">Puanınız: {puan}</p>
            <p className="text-2xl">Can: {can}</p>
        </div>
    );
}