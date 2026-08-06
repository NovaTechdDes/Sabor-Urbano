'use Client'
import Image from 'next/image'
import React from 'react'
import rotiseria from '../../rotiseria.config'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useCarritoStore } from '@/store/useCarritoStore'
import { totalProductos } from '../helpers/totalProductos'
import { FiClock, FiPhone } from 'react-icons/fi'
import { AiOutlineHome, AiOutlineInstagram } from 'react-icons/ai'
import { FaWhatsapp } from 'react-icons/fa'

export const Header = () => {

    const { abrir, productos } = useCarritoStore()

    return (
        <header className="mx-1">
            <div className="flex gap-5 items-center justify-between">
                <div className='flex gap-5 items-center'>
                    <Image src="/images/icon.png" alt={rotiseria.nombre} width={50} height={50} />
                    <h1 className="text-sm text-white md:text-2xl font-bold">{rotiseria.nombre}</h1>
                </div>

                <div className='cursor-pointer hover:bg-white/20 p-2 hover:rounded-full' onClick={abrir}>
                    <p className='ml-5 p-1 text-black text-center bg-yellow-400 rounded-full'>{totalProductos(productos)}</p>
                    <MdOutlineShoppingCart size={20} className='text-yellow-400' />

                </div>
            </div>
            <div className='bg-slate-800 rounded-sm py-2 w-full flex flex-col md:flex-row justify-between'>
                <div className='flex gap-2 px-2'>
                    <FiClock className='text-yellow-400 mt-1' />
                    <p className='text-yellow-400 flex flex-col'>Horarios
                        {rotiseria.horarios.map(hora => (
                            <span key={hora} className='text-white text-xs md:text-sm'>{hora}</span>
                        ))}
                    </p>
                </div>

                <div className='gap-5 px-2 mt-2 md:mt-0 hidden md:flex'>
                    <div className='flex gap-2'>
                        <AiOutlineHome className='text-slate-300' />
                        <a href={rotiseria.ubicacion} target='_blank' className='text-xs hidden md:block text-slate-300'>{rotiseria.direccion}</a>
                    </div>

                    <div className='flex gap-2'>
                        <FiPhone className='text-slate-300' />
                        <p className='text-xs hidden md:block text-slate-300'>{rotiseria.whatsapp}</p>
                    </div>

                    <div className='flex gap-2'>
                        <AiOutlineInstagram className='text-slate-300' />
                        <a href={`${rotiseria.instagram}`} target='_blank' className='text-xs hidden md:block text-slate-300'>Instagram</a>
                    </div>

                    <div className='flex gap-2'>
                        <FaWhatsapp className='text-slate-300' />
                        <a href={`${rotiseria.urlWhatsApp}`} target='_blank' className='text-xs hidden md:block text-slate-300'>Instagram</a>
                    </div>
                </div>
            </div>
        </header>
    )
}
