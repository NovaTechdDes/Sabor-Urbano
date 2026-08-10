import { calcularPrecioEmpanadas } from '@/helpers/calcularPrecioEmpanadas';
import { useCartaEmpanada } from '@/hooks/useCartaEmpanada';
import { ListaProductos, useCarritoStore } from '@/store/useCarritoStore';
import Image from 'next/image';
import React from 'react';

export const ProductoItemCarrito = ({ cantidad, producto: { _id, descripcion, seccion, precio, imgCloudinaryPath } }: ListaProductos) => {
  const { carta } = useCartaEmpanada();
  const { agregarProducto, quitarProducto } = useCarritoStore();

  const restarProducto = () => {
    quitarProducto(_id);
  };

  const sumarProducto = () => {
    agregarProducto({ cantidad: 1, producto: { _id, descripcion, precio, seccion }, carta });
  };

  return (
    <div className="flex items-center gap-3 bg-neutral-100/80 dark:bg-neutral-900/80 p-3 rounded-2xl transition-all hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm">
      {/* Imagen del producto */}
      <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
        <Image src={imgCloudinaryPath || '/images/icon.png'} alt={descripcion} fill sizes="56px" className="object-cover" />
      </div>

      {/* Info del producto */}
      <div className="flex flex-col flex-1 min-w-0 pr-1">
        <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white truncate text-left uppercase tracking-wide">{descripcion}</h3>
        {seccion?.nombre && <span className="text-[11px] font-semibold text-primary uppercase text-left tracking-wider">{seccion.nombre}</span>}
        <div className="flex items-center gap-2   p-1">
          <button
            onClick={restarProducto}
            className="h-6 w-6 rounded-lg border border-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-white font-bold text-base flex items-center justify-center cursor-pointer shadow-sm hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors active:scale-95"
            title="Restar"
          >
            -
          </button>

          <span className="font-bold text-sm text-neutral-900 dark:text-white px-1.5 min-w-5 text-center">{cantidad}</span>

          <button
            onClick={sumarProducto}
            className="h-6 w-6 rounded-lg  border border-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-white font-bold text-base flex items-center justify-center cursor-pointer shadow-sm hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors active:scale-95"
            title="Sumar"
          >
            +
          </button>
        </div>
      </div>

      {/* Controles de cantidad y precio total del item */}
      <div className="flex flex-col items-end shrink-0 gap-1.5">
        <div className="text-right">
          {seccion?.nombre === 'EMPANADAS' ? (
            <p className="text-sm sm:text-base font-extrabold text-primary dark:text-secondary">${calcularPrecioEmpanadas(cantidad, precio, carta).toFixed(0)}</p>
          ) : (
            <p className="text-sm sm:text-base font-extrabold text-primary dark:text-primary">{(precio * cantidad).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
          )}
        </div>
      </div>
    </div>
  );
};
