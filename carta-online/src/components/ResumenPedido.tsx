
import React from 'react'
import { ProductoItemCarrito } from './ProductoItemCarrito'
import { useCarritoStore } from '@/store/useCarritoStore'

const ResumenPedido = () => {
    const { total, productos } = useCarritoStore();
  return (
    <div className='flex flex-col h-full bg-neutral-50 dark:bg-neutral-900/60 p-4 sm:p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4'>

        <div className='flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3'>
          <h3 className='text-base sm:text-lg font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider'>Resumen del Pedido</h3>
          <span className='bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-primary/20'>
            {productos.length} {productos.length === 1 ? 'Producto' : 'Productos'}
          </span>
        </div>

        {/* Lista de Productos con scroll personalizable */}
        <div className='overflow-y-auto max-h-[300px] sm:max-h-[340px] space-y-3 pr-1 no-scrollbar'>
            {
                productos.map(producto => (
                    <ProductoItemCarrito {...producto} key={producto.producto?._id}/>
                ))
            }
        </div>

        {/* Desglose de totales */}
        <div className='border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-2 mt-auto'>
            <div className='flex justify-between items-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-400'>
                <span>Variedad de Items:</span>
                <span className='font-semibold text-neutral-900 dark:text-white'>{productos.length}</span>
            </div>

            <div className='flex justify-between items-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-400'>
                <span>Subtotal:</span>
                <span className='font-bold text-neutral-900 dark:text-white'>${total().toFixed(0)}</span>
            </div>

            <div className='flex justify-between items-center pt-2 border-t border-neutral-200/60 dark:border-neutral-800/80'>
                <span className='text-base sm:text-lg font-black text-neutral-900 dark:text-white'>TOTAL:</span>
                <span className='text-xl sm:text-2xl font-black text-primary dark:text-secondary'>${total().toFixed(0)}</span>
            </div>

            <p className='text-[11px] text-neutral-500 dark:text-neutral-400 text-center italic pt-1'>
                * El envío a domicilio puede incluir cargos adicionales según la zona.
            </p>
        </div>

    </div>
  )
}

export default ResumenPedido