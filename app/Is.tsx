import { Is as IsType } from '../types/is';

interface IsProps {
  is: IsType;
  tamamlandiGuncelle: (id: number) => void;
}

export default function Is({ is, tamamlandiGuncelle }: IsProps) {
  return (
    <div>
      <label className='flex items-center gap-2'>
        <input type="checkbox" checked={is.tamamlandi} onChange={ ()=>tamamlandiGuncelle(is.id) } />
        <span>{is.isAdi}</span>
      </label>
    </div>
  );
}
