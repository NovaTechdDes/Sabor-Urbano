import React from 'react'
import {  IconType } from 'react-icons';

interface Props {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    Icon?: IconType;
    name?: string;
    classNameInput?: string;
    classNameDiv?: string;
    classNameIcon?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    ref?: React.RefObject<HTMLInputElement>;
}

export const Input = ({type, placeholder,classNameIcon, value, onChange, Icon, name, classNameInput, classNameDiv, onKeyDown, ref}: Props) => {
  return (
    <div className={`my-2 flex bg-slate-700 gap-2 border-gray-400 border rounded-sm items-center ${classNameDiv} `}>
        {Icon && <Icon size={20} className={classNameIcon}/>}
        <input name={name} type={type} ref={ref} onKeyDown={onKeyDown} className={`w-full p-2 text-white ${classNameInput}  placeholder:text-slate-400`} placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
  )
}
