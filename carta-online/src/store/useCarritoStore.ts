import { calcularPrecioEmpanadas } from '@/helpers/calcularPrecioEmpanadas';
import { Seccion } from '@/interface/Seccion';
import { create } from 'zustand';
import { Carta } from './useCartaEmpenadaStore';

export interface Producto {
    _id: string;
    descripcion: string;
    precio: number;
    seccion: Seccion;
    imgCloudinaryPath?: string;
    sinStock?: boolean;
};

export interface ListaProductos {
   cantidad: number;
   producto: Producto;
   carta: Carta;
   imgCloudinaryPath?: string;
   sinStock?: boolean;
};

export interface Cliente {
    nombre: string;
    direccion: string;
    observaciones?: string;
    telefono: string;
    envio?: string;
    tipo_pago?: string;
    vuelto: number;

};

interface CarritoState {
    abierto: boolean;
    productos: ListaProductos[];
    cliente:Cliente;
    abrir: () => void;
    cerrar: () => void;
    agregarProducto: (producto: ListaProductos) => void;
    quitarProducto: (id: string) => void;
    vaciarCarrito: () => void;
    setCliente: (cliente: Cliente) => void;
    total: () => number;
};

export const useCarritoStore = create<CarritoState>((set, get) => ({
    abierto: false,
    productos: [],
    cliente: {nombre: '', telefono: '', direccion: '', observaciones: '', vuelto: 0},
    envio: false,
    tipo_pago: 'EFECTIVO',
    abrir: () => set({abierto: true}),
    cerrar: () => set({abierto: false}),

    agregarProducto: (producto) => {
        set((state) => {
            const existe = state.productos.find(prod => prod.producto?._id === producto.producto?._id);

            if (existe){
                return {
                    productos: state.productos.map((prod) => prod.producto?._id === producto.producto?._id ? {...prod, cantidad: prod.cantidad + producto.cantidad} : prod),
                };
            };
            return { productos: [...state.productos, {...producto, cantidad: producto.cantidad || 1}]}
        });

    },

    quitarProducto: (id) => {
        set((state) => {
            const existe = state.productos.find(prod => prod.producto?._id === id);
            if(existe && existe?.cantidad > 1){
                return {
                    productos: state.productos.map((prod) => prod.producto?._id === id ? {...prod, cantidad: prod.cantidad - 1}: prod)
                };
            };
            return {productos: [...state.productos.filter(prod => prod.producto?._id !== id)]}
        })
    },
    
    vaciarCarrito: () => {
        set({productos: []})
    },
    setCliente: (cliente) => set({cliente}),
    total: () => {
        let total = 0;
        let empanadaCantidad = 0;

        for(const prod of get().productos){
            if(prod.producto.seccion?.nombre === 'EMPANADAS'){
                empanadaCantidad += prod.cantidad;
            }else{
                total += prod.cantidad * prod.producto.precio;
            }
        };

        if(empanadaCantidad > 0){
            const producto = get().productos.find(elem => elem?.producto?.seccion?.nombre === 'EMPANADAS') ;
            total += calcularPrecioEmpanadas(empanadaCantidad, producto?.producto?.precio || 0, producto?.carta || {docena: 0, mediaDocena: 0})
        };

        return total;
    },
}))