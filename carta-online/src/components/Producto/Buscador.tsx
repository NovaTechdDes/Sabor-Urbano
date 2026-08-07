'use client'

import { CiSearch } from 'react-icons/ci';
import { Rubros } from '../Rubros';

interface Props {
    value: string;
    setValue: (arg: string) => void;
}

const Buscador = ({value, setValue}: Props) => {
return (
        <div className="space-y-4 bg-background rounded-lg max-w-full overflow-hidden">
            <div className="flex items-center gap-3 bg-[#F3F4F6] text-gray-700 px-5 py-3 rounded-full shadow-sm border border-gray-200">
                <CiSearch size={22} className="text-gray-500 shrink-0" />
                <input
                    type="text"
                    className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-base font-medium"
                    placeholder="Buscar"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <Rubros />
        </div>
    )
}

export default Buscador