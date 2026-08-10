import React from 'react';
import { ProductoItemCarrito } from './ProductoItemCarrito';
import { useCarritoStore } from '@/store/useCarritoStore';

const ResumenPedido = () => {
  const { productos } = useCarritoStore();
  return (
    <div className="flex flex-col h-full bg-neutral-50 dark:bg-neutral-900/60 p-4 sm:p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">Resumen del Pedido</h3>
      </div>

      {/* Lista de Productos con scroll personalizable */}
      <div className="overflow-y-auto max-h-75 sm:max-h-85 space-y-3 pr-1 no-scrollbar">
        {productos.map((producto) => (
          <ProductoItemCarrito {...producto} key={producto.producto?._id} />
        ))}
      </div>
    </div>
  );
};

export default ResumenPedido;
