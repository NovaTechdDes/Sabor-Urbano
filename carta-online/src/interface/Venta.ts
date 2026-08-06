import { ListaProductos } from "@/store/useCarritoStore";

export interface Venta {
    cliente: string;
    listaProductos: ListaProductos[];
    observaciones: string;
    idCliente: string;
    precio: number;
    descuento: number;
    tipo_venta: string;
    tipo_comp: string;
    dispositivo: string;
    direccion: string;
    telefono: string;
    pasado: boolean;
    tipo_pago: string;
    envio: boolean;
    vuelto: number;

}