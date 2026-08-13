import React from 'react'
import { CgClose } from 'react-icons/cg'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { DatosCliente } from './DatosCliente'
import { useCarritoStore } from '@/store/useCarritoStore'
import ResumenPedido from './ResumenPedido'

export const Carrito = () => {
    const { cerrar, productos } = useCarritoStore();

    // Estado cuando el carrito está vacío
    if (productos.length === 0) {
      return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200'>
          <div className='relative w-full max-w-md bg-[#121212] border border-neutral-800 text-center rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center space-y-4'>
              
              <button 
                onClick={cerrar}
                className='absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer'
                aria-label="Cerrar modal"
              >
                <CgClose size={22}/>
              </button>  

              <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-2'>
                <MdOutlineShoppingCart size={32} />
              </div>

              <div className='space-y-1'>
                <h3 className='text-xl font-extrabold text-white'>Tu carrito está vacío</h3>
                <p className='text-xs sm:text-sm text-neutral-400'>
                  Parece que aún no has agregado ningún producto del menú.
                </p>
              </div>

              <button 
                onClick={cerrar}
                className='w-full py-3 px-5 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.99] cursor-pointer text-sm uppercase tracking-wide'
              >
                Explorar Productos
              </button>
          </div>
        </div>
      )
    }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200'>
      <div className='relative w-full max-w-5xl bg-[#121212] text-white border border-neutral-800 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden'>
          
          {/* Header del Modal */}
          <div className='flex items-center justify-between px-5 sm:px-8 py-4 border-b border-neutral-800 bg-neutral-900/60 shrink-0'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-xl bg-primary/10 text-primary'>
                <MdOutlineShoppingCart size={22} />
              </div>
              <div>
                <h2 className='text-base sm:text-xl font-extrabold text-white uppercase tracking-wider'>
                  Finalizar Pedido
                </h2>
                <p className='text-[11px] sm:text-xs text-neutral-400 hidden sm:block'>
                  Revisa tu resumen y confirma tus datos para enviar la orden por WhatsApp.
                </p>
              </div>
            </div>

            <button 
              onClick={cerrar}
              className='p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer'
              aria-label="Cerrar modal"
            >
              <CgClose size={24}/>
            </button>
          </div>

          {/* Cuerpo principal en Grid (Desktop: 2 columnas / Mobile: 1 columna escroleable) */}
          <div className='p-4 sm:p-6 md:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8'>    
              <div className='lg:col-span-7 order-2 lg:order-1'>
                <DatosCliente />
              </div>

              <div className='lg:col-span-5 order-1 lg:order-2'>
                <ResumenPedido />
              </div>
          </div>
      </div>
    </div>
  )
}
