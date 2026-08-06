import { Venta } from "@/interface/Venta";
import { Cliente, useCarritoStore } from "@/store/useCarritoStore"
import axios from "axios";

export const useVenta = () => {
    const { cliente, productos, total, setCliente, cerrar, vaciarCarrito } = useCarritoStore();

    const startActivarCliente = (cliente: Cliente) => {
        setCliente(cliente)
    };

    const startCrearVenta = async() => {
        
        try {
            const venta: Venta  = {
                cliente: cliente.nombre,
                idCliente: '1',
                listaProductos: productos,
                observaciones: cliente.observaciones || '',
                precio: total(),
                descuento: 0,
                tipo_venta: 'CD',
                tipo_comp: 'Comprobante',
                dispositivo: 'WEB',
                direccion: cliente.direccion || '',
                telefono: cliente.telefono,
                envio: cliente.envio === 'true' ? true : false,
                tipo_pago: cliente.tipo_pago || 'EFECTIVO',
                pasado: false,
                vuelto: cliente.vuelto || 0,
            };
            
            const { data } = await axios.post('/api/ventas', venta);

            if(data.ok){
                setCliente({} as Cliente);
                vaciarCarrito();
                return data;
            }
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                error
            }
        }

    };



    return {
        //Atributos
        cliente,
        cerrar,
        productos,
        total,

        //Metodos
        startActivarCliente,
        startCrearVenta,
        
    }
}