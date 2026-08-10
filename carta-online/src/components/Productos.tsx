import React, { useEffect, useState } from 'react';
import ProductoCard from './Producto/ProductoCard';
import { useProductos } from '@/hooks/useProducto';
import { Producto } from '@/store/useProductoStore';
import { useSecciones } from '@/hooks/useSeccion';
import { BiChevronDown } from 'react-icons/bi';
import { ordenarProductos } from '@/helpers/ordenarProductos';

interface Props {
  value: string;
}

export const Productos = ({ value }: Props) => {
  const { startObtenerProductos, productos, loading } = useProductos();

  const { seccionActive, secciones } = useSecciones();
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);

  useEffect(() => {
    startObtenerProductos();
  }, []);

  useEffect(() => {
    let resultado = productos;

    if (value !== '') {
      resultado = productos.filter((producto) =>
        producto.descripcion.toLowerCase().startsWith(value.toLowerCase())
      );
    } else if (seccionActive?.nombre !== 'TODOS') {
      resultado = productos.filter((producto) => producto.seccion?._id === seccionActive?._id);
    }

    setProductosFiltrados(ordenarProductos(resultado, secciones));
  }, [value, productos, seccionActive, secciones]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 items-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 pb-28 sm:pb-20 lg:pb-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 mt-4 px-5 md:px-7 ">
      {seccionActive?.nombre !== 'TODOS' ? (
        productosFiltrados.map((elem) => <ProductoCard key={elem?._id} {...elem} />)
      ) : (
        <>
          {productosFiltrados.slice(0, 6).map((elem) => (
            <ProductoCard key={elem?._id} {...elem} />
          ))}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center pt-6 pb-2">
            <button className="group flex items-center justify-center gap-2 px-8 py-3 bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#242424] text-gray-800 dark:text-gray-100 font-semibold text-sm rounded-full border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-neutral-700 transition-all duration-200 active:scale-95 cursor-pointer">
              <span>Ver Más</span>
              <BiChevronDown className="text-xl text-gray-500 dark:text-gray-400 group-hover:translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
