import { useCarritoStore } from '@/store/useCarritoStore'
import React from 'react'
import { CiHome } from 'react-icons/ci'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { totalProductos } from '../../helpers/totalProductos'
import rotiseria from '../../../rotiseria.config'
import { SiHoppscotch } from 'react-icons/si'

export const Footer = () => {

  const {productos, abierto, abrir, total} = useCarritoStore();

  const totalCarrito = total();

  return (
    <footer className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <button
        onClick={abrir}
        className="pointer-events-auto w-full max-w-md bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-semibold py-3.5 px-6 rounded-full flex items-center justify-between shadow-[0_10px_25px_rgba(247,69,17,0.4)] transition-all duration-300 cursor-pointer border border-primary/20"
      >
        <div className="flex items-center gap-3">
          <MdOutlineShoppingCart size={24} className="text-white shrink-0" />
          <span className="text-lg font-bold tracking-wide">Ver Carrito</span>
        </div>

        <span className="text-lg font-extrabold tracking-tight">
          ${totalCarrito.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </button>
    </footer>
  )
}
