import React, { useEffect, useState } from "react";
import ProductoCard from "./ProductoCard";
import { useProductos } from "@/hooks/useProducto";
import { Producto } from "@/store/useProductoStore";
import { useSecciones } from "@/hooks/useSeccion";

interface Props {
  value: string;
}

export const Productos = ({ value }: Props) => {
  const { startObtenerProductos, productos, loading } = useProductos();
  const { seccionActive } = useSecciones();
  const [productosFiltrados, setProductosFiltrados] =
    useState<Producto[]>(productos);

  useEffect(() => {
    startObtenerProductos();
  }, []);

  useEffect(() => {
    if (value !== "") {
      setProductosFiltrados(
        productos.filter((producto) =>
          producto.descripcion.toLowerCase().startsWith(value.toLowerCase()),
        ),
      );
    } else {
      if (seccionActive?.nombre !== "TODOS") {
        setProductosFiltrados(
          productos.filter(
            (producto) => producto.seccion?._id === seccionActive?._id,
          ),
        );
      } else {
        setProductosFiltrados(productos);
      }
    }
  }, [value || productos]);

  useEffect(() => {
    if (seccionActive?.nombre !== "TODOS") {
      setProductosFiltrados(
        productos.filter(
          (producto) => producto?.seccion?._id === seccionActive?._id,
        ),
      );
    } else {
      setProductosFiltrados(productos);
    }
  }, [seccionActive]);

  if (loading) {
    return (
      <div className="flex justify-center h-[60vh] bg-slate-800 items-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 pb-30 sm:pb-20 lg:pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-15 mt-1  bg-slate-800 h-[60vh] px-5 overflow-y-scroll pt14">
      {productosFiltrados.map((elem) => (
        <ProductoCard key={elem?._id} {...elem} />
      ))}
    </div>
  );
};
