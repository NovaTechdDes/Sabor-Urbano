import { calcularPrecioEmpanadas } from '@/helpers/calcularPrecioEmpanadas'
import { useCartaEmpanada } from '@/hooks/useCartaEmpanada'
import { ListaProductos,  useCarritoStore } from '@/store/useCarritoStore'
import Image from 'next/image'
import React from 'react'



export const ProductoItemCarrito = ({cantidad, producto:{_id, descripcion, seccion, precio, imgCloudinaryPath}}: ListaProductos) => {
    const { carta } = useCartaEmpanada();
    const { agregarProducto, quitarProducto } = useCarritoStore();

    const restarProducto = () => {
        quitarProducto(_id)
    };

    const sumarProducto = () => {
        agregarProducto({cantidad: 1, producto: {_id, descripcion, precio, seccion}, carta})
    };

  return (
    <div className='flex bg-slate-800 my-5 p-2 rounded-sm gap-2'>
        
        <div className='bg-white h-10 w-10 rounded-sm'>
                <Image src={imgCloudinaryPath || ''} alt={descripcion} className='h-10 w-10 object-contain' width={64} height={64}/>
        </div>

        <div className='flex flex-col w-[230px]'>
            <h3 className='text-sm text-white text-start'>{descripcion}</h3>
            <p className='text-xs text-gray-400 text-start'>{seccion?.nombre}</p>
            <p className='text-md text-yellow-400 font-bold text-start'>${precio}</p>
        </div>

        <div className='ml-auto'>
            <div className='flex gap-3'>
                <button onClick={restarProducto} className='border active:bg-slate-300 rounded-sm h-7 text-xl w-7 flex items-center justify-center cursor-pointer border-gray-500 bg-white text-yellow-600 p-1 hover:bg-yellow-500 hover:text-black'>-</button>
                <p className='text-white'>{cantidad}</p>
                <button onClick={sumarProducto}
                className='border rounded-sm h-7 text-xl w-7 active:bg-slate-300 flex items-center justify-center cursor-pointer  border-gray-500 bg-white text-yellow-600 p-1 hover:bg-yellow-500 hover:text-black'>
                +</button>
            </div>

            <div>
                {seccion?.nombre === 'EMPANADAS' ? (<p className='text-white'>${(calcularPrecioEmpanadas(cantidad, precio, carta)).toFixed(2)}</p>) : (<p className='text-white'>${(precio * cantidad).toFixed(2)}</p>)}
            </div>
        </div>
    </div>
  )
}
