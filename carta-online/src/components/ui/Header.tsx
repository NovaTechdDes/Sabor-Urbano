'use client';
import Image from 'next/image';
import rotiseria from '../../../rotiseria.config';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useCarritoStore } from '@/store/useCarritoStore';
import { totalProductos } from '../../helpers/totalProductos';
import { FiPhone, FiMapPin, FiChevronLeft } from 'react-icons/fi';

export const Header = () => {
  const { abrir, productos } = useCarritoStore();

  return (
    <header className="w-full text-white">
      {/* Contenedor Principal del Slider / Banner */}
      <div className="relative w-full rounded-t-2xl md:rounded-4xl overflow-hidden bg-black text-white p-4 sm:p-6 shadow-2xl min-h-65 sm:min-h-80 md:min-h-96 flex flex-col justify-between">
        {/* Imagen de Fondo (Slide.png) */}
        <Image
          src="/Slide.png?v=2"
          alt="Banner Sabor Urbano"
          fill
          className="object-contain object-right  z-0"
          priority
          unoptimized
        />

        

        {/* Barra Superior: Logo y Carrito */}
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <Image
              src="/images/icon.png"
              alt="Logo"
              width={55}
              height={55}
              className="rounded-full object-contain"
            />
            <div className="relative block md:hidden z-10 my-auto pl-4 sm:pl-8">
              <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-wide uppercase drop-shadow-lg">
                SABOR URBANO
              </h1>
            </div>
          </div>

          {/* Botón Carrito Circular Dorado/Amarillo */}
          <div className="relative cursor-pointer" onClick={abrir}>
            <div className="w-11 h-11 bg-[#F1B846] text-black rounded-full hover:scale-105 transition-transform flex items-center justify-center shadow-lg">
              <MdOutlineShoppingCart size={24} />
            </div>
            {totalProductos(productos) > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                {totalProductos(productos)}
              </span>
            )}
          </div>
        </div>

        {/* Título Central / Izquierda (SABOR URBANO) */}
        <div className="relative hidden md:block z-10 my-auto pl-4 sm:pl-8">
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-black text-white tracking-wide uppercase drop-shadow-lg">
            SABOR URBANO
          </h1>
        </div>

        {/* Cápsula de Horarios de Atención (Superpuesta en el centro inferior) */}
        <div className="relative z-10 flex justify-center w-full mt-auto">
          <div className="bg-[#F2441D] rounded-full px-5 sm:px-10 py-2 sm:py-2.5 shadow-2xl flex flex-col items-center justify-center text-center text-white border border-white/20 max-w-2xl">
            <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-wide mb-1">
              Horarios de atención
            </h3>
            <div className="flex items-center justify-center gap-6 sm:gap-6">
              <div className="flex flex-col items-center">
                <span className="text-[10px] sm:text-xs font-semibold text-white/90 mb-0.5">
                  Lunes a Jueves
                </span>
                <span className="bg-white text-[#F2441D] font-extrabold text-[10px] sm:text-xs px-3 sm:px-4 py-0.5 rounded-full shadow-sm">
                  19hs a 23:30hs
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] sm:text-xs font-semibold text-white/90 mb-0.5">
                  Viernes y Sábados
                </span>
                <span className="bg-white text-[#F2441D] font-extrabold text-[10px] sm:text-xs px-3 sm:px-4 py-0.5 rounded-full shadow-sm">
                  19hs a 00:30hs
                </span>
              </div>
            </div>
          </div>
        </div>

      {/* Barra Inferior de Información (Teléfono y Dirección) */}
      <div className="relative z-20 w-full mt-2">
        <div className="bg-[#121212] rounded-t-3xl rounded-b-2xl px-6 py-3.5 flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-4 sm:gap-8 text-white shadow-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <FiPhone size={22} className="text-white shrink-0" />
            <span className="text-white font-bold text-sm sm:text-base tracking-wide">
              {rotiseria.whatsapp}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FiMapPin size={24} className="text-white shrink-0" />
            <span className="text-white font-bold text-sm sm:text-base tracking-wide">
              {rotiseria.direccion}
            </span>
          </div>
        </div>
      </div>
      </div>

    </header>
  );
};
