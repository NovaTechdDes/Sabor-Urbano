import React from 'react'

interface Props {
    text: string;
    type: 'primary' | 'secondary' | 'neutral';
    action: () => void;
}

export const ButtonPrimary = ({ text, type, action }: Props) => {

    let estilos = '';

    if(type === 'primary') estilos = 'bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-md';
    if(type === 'secondary') estilos = 'bg-white hover:bg-gray-100 text-primary font-bold py-3 px-6 rounded-2xl transition-all shadow-md';
    if(type === 'neutral') estilos = 'bg-primary/60 hover:bg-primary/70 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-md';

    return (
        <button onClick={action} className={`${estilos} cursor-pointer text-xl`}>
            {text}
        </button>
    )
}
