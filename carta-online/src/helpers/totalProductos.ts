import { ListaProductos } from "@/store/useCarritoStore"

export const totalProductos = (productos: ListaProductos[]) => {
    return productos.reduce((acc, prod) => acc + prod.cantidad, 0);
}