import { Seccion } from "@/interface/Seccion";
import { create } from "zustand";

export interface Producto {
    _id: string;
    descripcion: string;
    precio: number;
    imgCloudinaryPath: string;
    seccion: Seccion;
    observaciones?: string;
};

interface ProductoState {
    productos: Producto[];
    loading: boolean;
    cargarProductos: (nuevos: Producto[]) => void;
    limpiarProductos: () => void;
    setLoading: () => void;
};


export const useProductoStore = create<ProductoState>((set) => ({
    productos: [],
    loading: false,
    setLoading: () => set({ loading: true }),
    cargarProductos: (nuevos) => set({
        productos: nuevos,
        loading: false
    }),
    limpiarProductos: () => set({ productos: [] })
}))