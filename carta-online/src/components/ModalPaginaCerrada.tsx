import React from 'react'
import rotiseria from '../../rotiseria.config'
import { FiClock } from 'react-icons/fi'

export const ModalPaginaCerrada = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/80'>
      <div className='border border-gray-500 text-center w-3xl pb-15' style={{backgroundColor: rotiseria.colorPrimario}}>

        <div className='flex justify-center flex-col items-center my-2'>
          <FiClock className='text-red-400 mb-2' size={50}/> 
          <h3 className='text-3xl text-red-400'>Local Cerrado</h3>

          <p className='text-bold text-white text-xl mt-2'>Lo sentimos, por el día de hoy nuestro local se encuentra cerrado.</p>
          <p className='text-gray-400 my-1'>Vuelve mañana para realizar tu pedido. ¡Te esperamos!</p>

          <div className='border-t border-gray-300 w-full mt-5 px-10'>

            <p className='text-yellow-400 flex flex-col mt-2'>Horarios Habituales
                    {rotiseria.horarios.map(hora => (
                        <span key={hora} className='text-white mt-2 text-xs md:text-sm'>{hora}</span>
                    ))}
                </p>

          </div>

        </div>

      </div>
    </div>
  )
}
