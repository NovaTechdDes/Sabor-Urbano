import { useCarritoStore } from '@/store/useCarritoStore';

import { MdOutlineShoppingCart } from 'react-icons/md';

import Link from 'next/link';

export const Footer = () => {
  const { productos, abierto, abrir, total } = useCarritoStore();

  const totalCarrito = total();

  return (
    <footer className="fixed bottom-3 flex-col left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none">
      <button
        onClick={abrir}
        className="pointer-events-auto w-full max-w-md bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-semibold py-3.5 px-6 rounded-full flex items-center justify-between shadow-[0_10px_25px_rgba(247,69,17,0.4)] transition-all duration-300 cursor-pointer border border-primary/20"
      >
        <div className="flex items-center gap-3">
          <MdOutlineShoppingCart size={24} className="text-white shrink-0" />
          <span className="text-lg font-bold tracking-wide">Ver Carrito</span>
        </div>

        <span className="text-lg font-extrabold tracking-tight">${totalCarrito.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </button>

      <div className="pointer-events-auto mt-2 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md px-3.5 py-1 rounded-full shadow-sm border border-gray-200/80 dark:border-neutral-800">
        <span>Desarrollado por</span>
        <Link
          href="https://novatechdesarrollos.com.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
        >
          Novatech Desarrollos
        </Link>
        <span className="text-gray-300 dark:text-neutral-700">•</span>
        <span>Diseñado por</span>
        <Link
          href="https://www.instagram.com/prisma.vi/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
        >
          Prisma Visuals
        </Link>
      </div>
    </footer>
  );
};
