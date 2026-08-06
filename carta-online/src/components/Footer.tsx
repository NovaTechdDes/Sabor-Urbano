import { useCarritoStore } from '@/store/useCarritoStore'
import React from 'react'
import { CiHome } from 'react-icons/ci'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { totalProductos } from '../helpers/totalProductos'
import rotiseria from '../../rotiseria.config'

export const Footer = () => {

  const {productos, abierto, abrir} = useCarritoStore();

  return (
    <footer className="flex justify-center flex-col md:flex-row bottom-0  w-full absolute bg-[#0f172a] " style={{backgroundColor: rotiseria.colorPrimario}}>
        <div className='flex justify-center gap-16 md:ml-auto mt-2'>
          <div className={`flex justify-center flex-col items-center gap-1 cursor-pointer`}>
            <CiHome size={20} className={`${!abierto ? 'text-yellow-400' : 'text-gray-500'}`}/>
            <p className={`${!abierto ? 'text-yellow-400' : 'text-gray-500'}`}>Sabor Urbano</p> 
          </div>
          <div className="flex justify-center flex-col items-center gap-1 cursor-pointer" onClick={abrir}>
            {productos.length > 0 && <p className='ml-5 p-1 text-black text-center bg-yellow-400 rounded-full'>{totalProductos(productos)}</p>}
            <MdOutlineShoppingCart size={20} className={`${abierto ? 'text-yellow-400' : 'text-gray-500'}`}/>
            <p className={`${abierto ? 'text-yellow-400' : 'text-gray-500'}`}>{totalProductos(productos)}</p>
          </div>
        </div>

        <div className='md:ml-auto mt-3 mr-2 items-center flex justify-center'>
          <a className='text-center text-white text-xs' href="https://www.agustin-lorenzatto.com.ar/">Desarrollado por NovaTech</a>
        </div>
      </footer>
  )
}
