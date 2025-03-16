"use client";

import { Button } from '@/components/ui/button';
import { Is as IsType } from '../types/is';
import { Trash2 } from 'lucide-react';

interface IsProps {
  is: IsType;
  vekilFonksiyon: (action: {type: string, id?: number}) => void;
}

export default function Is({ is, vekilFonksiyon }: IsProps) {
  return (
    <div>
      <label className='flex items-center justify-between w-full gap-2'>
        <div className='flex items-center gap-2'>
          <input type="checkbox" checked={is.tamamlandi} onChange={ ()=>vekilFonksiyon({type:"guncelle", id: is.id}) } />
          <span>{is.isAdi}</span>
        </div>
        <Button variant="destructive" size="sm" onClick={ ()=> vekilFonksiyon({type:"sil", id: is.id}) }>
          <Trash2 className="h-4 w-4 mr-1" />
          Sil
        </Button>
      </label>
    </div>
  );
}
