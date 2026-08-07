'use Client'
import Image from 'next/image'
import React from 'react'
import rotiseria from '../../../rotiseria.config'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useCarritoStore } from '@/store/useCarritoStore'
import { totalProductos } from '../../helpers/totalProductos'
import { FiClock, FiPhone } from 'react-icons/fi'
import { AiOutlineHome, AiOutlineInstagram } from 'react-icons/ai'
import { FaWhatsapp } from 'react-icons/fa'
import { ButtonPrimary } from './ButtonPrimary'

export const Header = () => {

    const { abrir, productos } = useCarritoStore()

    return (
        <header className="px-4 py-3  text-white">  
            <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <Image src="/images/icon.png" alt="logo" width={50} height={50} className="rounded-md object-contain"/>
                        <h1 className='text-2xl font-bold text-white'>{rotiseria.nombre}</h1>
                    </div>
                    <div className="relative cursor-pointer" onClick={abrir}>
                        <div className="p-2 bg-secondary text-primary rounded-full hover:scale-105 transition-transform flex items-center justify-center">
                            <MdOutlineShoppingCart size={28} />
                        </div>
                        {totalProductos(productos) > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-neutral">
                                {totalProductos(productos)}
                            </span>
                        )}
                    </div>
            </div>

            {/* Hero Banner / Sección Principal */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Lado Izquierdo: Texto y Botones */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white uppercase">
                        Carrito Online
                    </h2>
                    <div className="flex flex-wrap gap-4 pt-4">
                        
                        <ButtonPrimary text='Productos' type='primary' action={() => {}} />
                    </div>
                </div>

                {/* Lado Derecho: Tarjeta con Imagen de Fondo slide.png y Overlay de Horarios */}
                <div className="relative w-full md:w-112.5 h-55 rounded-3xl overflow-hidden shadow-xl flex items-center justify-center p-4">
                    <Image
                        src="/slide.png"
                        alt="Hamburguesa Sabor Urbano"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay semitransparente color rojo/naranja estilo el diseño */}
                    <div className="absolute inset-2 bg-primary/75 rounded-2xl backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 border border-blue-400/80">
                        <h3 className="text-xl font-bold text-white mb-2">Horarios de atención</h3>
                        
                        <div className="space-y-2 w-full max-w-xs">
                            <div>
                                <p className="text-xs font-semibold text-white mb-1">Lunes a Jueves</p>
                                <span className="inline-block bg-white text-primary font-bold text-xs px-4 py-1 rounded-full shadow">
                                    19hs a 23:30hs
                                </span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-white mb-1">Viernes y Sábados</p>
                                <span className="inline-block bg-white text-primary font-bold text-xs px-4 py-1 rounded-full shadow">
                                    19hs a 00:30hs
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra Inferior de Información (Teléfono y Dirección) */}
            <div className="mt-8 flex">
                <div className="w-full justify-between bg-[#171717] border border-blue-500/70 rounded-t-3xl rounded-b-none px-6 py-3 flex flex-col sm:flex-row items-center gap-6 shadow-[0_-4px_20px_rgba(247,69,17,0.3)]">
                    <div className="flex items-center gap-3">
                        <FaWhatsapp size={22} className="text-white transform -rotate-12" />
                        <span className="text-white font-bold text-base tracking-wide">{rotiseria.whatsapp}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <AiOutlineHome size={24} className="text-white" />
                        <span className="text-white font-semibold text-sm sm:text-base">{rotiseria.direccion}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
