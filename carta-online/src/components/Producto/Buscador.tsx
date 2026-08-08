'use client';

import { CiSearch } from 'react-icons/ci';
import { Rubros } from '../Rubros';

interface Props {
  value: string;
  setValue: (arg: string) => void;
}

const Buscador = ({ value, setValue }: Props) => {
  return (
    <div className="space-y-4 max-w-full overflow-hidden pt-8 pb-3">
      <div className="flex items-center gap-3 bg-[#F3F4F6] dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 px-5 py-3 rounded-full shadow-sm dark:shadow-inner border border-gray-200 dark:border-neutral-800 focus-within:border-primary/50 transition-colors">
        <CiSearch size={22} className="text-gray-500 dark:text-gray-400 shrink-0" />
        <input
          type="text"
          className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-base font-medium"
          placeholder="Buscar..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Rubros />
    </div>
  );
};

export default Buscador;
