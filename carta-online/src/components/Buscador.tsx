'use client'

import { CiSearch } from 'react-icons/ci';
import { Input } from './Input';

interface Props {
    value: string;
    setValue: (arg: string) => void;
}

const Buscador = ({value, setValue}: Props) => {
return (
        <Input type='text' classNameIcon='text-white' Icon={CiSearch} placeholder='Buscar Producto' value={value} onChange={(e) => setValue(e.target.value)}/>
    )
}

export default Buscador