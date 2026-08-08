'use Client';
import Image from 'next/image';
import React from 'react';
import rotiseria from '../../../rotiseria.config';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useCarritoStore } from '@/store/useCarritoStore';
import { totalProductos } from '../../helpers/totalProductos';
import { FiClock, FiPhone, FiMapPin } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineInstagram } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import { ButtonPrimary } from './ButtonPrimary';

export const Header = () => {
  const { abrir, productos } = useCarritoStore();

  return (
    <header className="px-3 py-2 text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <Image src="/images/icon.png" alt="logo" width={40} height={40} className="rounded-md object-contain" />
          <h1 className="text-xl font-bold text-white">{rotiseria.nombre}</h1>
        </div>
        <div className="relative cursor-pointer" onClick={abrir}>
          <div className="p-1.5 bg-secondary text-neutral rounded-full hover:scale-105 transition-transform flex items-center justify-center">
            <MdOutlineShoppingCart size={22} />
          </div>
          {totalProductos(productos) > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-neutral">
              {totalProductos(productos)}
            </span>
          )}
        </div>
      </div>

      {/* Hero Banner / Sección Principal (Más Compacto) */}
      <div className="mt-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Lado Izquierdo: Texto y Botones */}
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white uppercase">Carrito Online</h2>
          <div className="flex flex-wrap gap-2 pt-1">
            <ButtonPrimary text="Productos" type="primary" action={() => {}} />
          </div>
        </div>

        {/* Lado Derecho: Tarjeta con Imagen de Fondo y Overlay de Horarios */}
        <div className="relative w-full md:w-80 h-36 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-2">
          <Image src="/slide.png" alt="Hamburguesa Sabor Urbano" fill className="object-cover" priority />
          {/* Overlay semitransparente color rojo/naranja */}
          <div className="absolute inset-1.5 bg-primary/75 rounded-xl backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-2 border border-white/20">
            <h3 className="text-sm font-bold text-white mb-1">Horarios de atención</h3>

            <div className="space-y-1 w-full max-w-xs">
              <div>
                <p className="text-[10px] font-semibold text-white">Lunes a Jueves</p>
                <span className="inline-block bg-white text-primary font-bold text-[11px] px-3 py-0.5 rounded-full shadow">19hs a 23:30hs</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white">Viernes y Sábados</p>
                <span className="inline-block bg-white text-primary font-bold text-[11px] px-3 py-0.5 rounded-full shadow">19hs a 00:30hs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior de Información (Teléfono y Dirección) */}
      <div className="mt-6 -mb-7 flex justify-center w-full relative z-10">
        <div className="w-full bg-[#171717] rounded-t-3xl rounded-b-xl px-6 py-3.5 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6 md:gap-10 shadow-[0_0_25px_rgba(247,69,17,0.4)] border border-white/10">
          <div className="flex items-center gap-3">
            <FiPhone size={22} className="text-white shrink-0" />
            <span className="text-white font-bold text-sm sm:text-base tracking-wide">{rotiseria.whatsapp}</span>
          </div>
          <div className="flex items-center gap-3">
            <FiMapPin size={24} className="text-white shrink-0" />
            <span className="text-white font-bold text-sm sm:text-base tracking-wide">{rotiseria.direccion}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
