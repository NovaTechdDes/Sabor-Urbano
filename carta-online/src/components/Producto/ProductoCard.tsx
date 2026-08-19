import React, { useState } from 'react';
import Image from 'next/image';
import { Producto } from '@/interface/Producto';
import { useCarritoStore } from '@/store/useCarritoStore';
import { useCartaEmpanada } from '@/hooks/useCartaEmpanada';
import { GoAlert } from 'react-icons/go';
import { MdAdd } from 'react-icons/md';
import { mensaje } from '@/helpers/mensaje';

const ProductoCard = ({ _id, imgCloudinaryPath = '', precio, descripcion, seccion, observaciones, sinStock = false }: Producto) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { agregarProducto } = useCarritoStore();
  const { carta } = useCartaEmpanada();

  const addProducto = async () => {
    if (sinStock) return;
    await agregarProducto({
      cantidad: 1,
      producto: {
        _id,
        precio,
        descripcion,
        seccion: seccion,
        imgCloudinaryPath,
      },
      carta,
    });

    await mensaje('Producto Agregado Correctamente', 'success');
  };

  const addProductoPor6 = async () => {
    await agregarProducto({
      cantidad: 6,
      producto: {
        _id,
        precio,
        descripcion,
        seccion: seccion,
        imgCloudinaryPath,
      },
      carta,
    });
    await mensaje('6 Productos Agregados Correctamente', 'success');
  };

  const addProductoPor12 = async () => {
    await agregarProducto({
      cantidad: 12,
      producto: {
        _id,
        precio,
        descripcion,
        seccion: seccion,
        imgCloudinaryPath,
      },
      carta,
    });

    await mensaje('12 Productos Agregados Correctamente', 'success');
  };

  return (
    <div className="relative my-2">
      {sinStock && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-red-500 font-bold rounded-full px-3 py-1 flex gap-1.5 items-center text-white text-xs shadow-md">
            <GoAlert />
            Sin Stock
          </div>
        </div>
      )}

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group cursor-pointer transition-all duration-200 ${isExpanded ? 'border-primary' : ''} hover:scale-[1.01] ${
          sinStock ? 'opacity-40 pointer-events-none' : ''
        } bg-[#181818] text-white flex flex-col items-center gap-4 rounded-[2.2rem] p-3 shadow-lg border border-neutral-800`}
      >
        <div className="flex gap-2 w-full">
          {/* Imagen del producto redondeada a la izquierda */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-[1.8rem] overflow-hidden bg-neutral-900">
            <Image
              src={imgCloudinaryPath ? imgCloudinaryPath : '/images/icon.png'}
              alt={descripcion}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33v"
            />
          </div>

          {/* Información del producto (Derecha) */}
          <div className="flex-1 flex flex-col justify-center pr-2 py-1 space-y-1">
            <h2 translate="no" className="font-extrabold text-lg sm:text-xl text-white tracking-wide uppercase leading-snug">
              {descripcion}
            </h2>

            <p className="text-primary text-xl sm:text-2xl font-extrabold">${precio.toFixed(0)}</p>

            {observaciones && <p className={`text-gray-300 text-xs sm:text-sm font-normal ${!isExpanded ? 'line-clamp-2' : ''}`}>{observaciones}</p>}

            {/* Opciones extras para empanadas si aplica */}
            {seccion?.nombre === 'EMPANADAS' && (
              <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                <button onClick={addProducto} className="bg-white cursor-pointer hover:bg-primary hover:text-white text-primary font-bold text-xs px-3 py-1 rounded-full shadow transition-all">
                  x1
                </button>
                <button onClick={addProductoPor6} className="bg-white cursor-pointer hover:bg-primary hover:text-white text-primary font-bold text-xs px-3 py-1 rounded-full shadow transition-all">
                  x6
                </button>
                <button onClick={addProductoPor12} className="bg-white hover:bg-primary hover:text-white cursor-pointer text-primary font-bold text-xs px-3 py-1 rounded-full shadow transition-all">
                  x12
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addProducto();
          }}
          disabled={sinStock}
          className="w-full bg-primary/50 active:scale-[0.98] hover:bg-primary/90 hover:scale-[0.99] text-white font-bold py-2.5 px-4 rounded-[1.2rem] flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-primary/30"
        >
          <MdAdd size={24} className="text-white" />
          <span className="text-base font-bold">Agregar al carrito</span>
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;
