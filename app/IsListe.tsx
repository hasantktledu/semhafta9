"use client"

import Is from "./Is";

export default function IsListe({isler, vekilFonksiyon}) {
    return (
        <div className="flex flex-col gap-4">
            {
                isler.map((is) => (
                    <Is key={is.id} is={is} vekilFonksiyon={vekilFonksiyon} />
                ))
            }
        </div>
    );
}