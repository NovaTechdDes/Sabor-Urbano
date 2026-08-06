import { Seccion } from "./Seccion";

export interface Producto {
    _id: string;
    imgCloudinaryPath?: string;
    descripcion: string;
    observaciones?: string;
    precio: number;
    seccion: Seccion;
    sinStock?: boolean;
}