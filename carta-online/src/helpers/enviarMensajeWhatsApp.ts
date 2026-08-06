import { Venta } from "@/interface/Venta";
import rotiseria from "../../rotiseria.config";
import { ListaProductos } from "@/store/useCarritoStore";

export const enviarMensajeWhatsApp = (venta: Venta) => {
    const mensaje = encodeURIComponent(
    `Hola, Realice un pedido desde al carta online, ¿Podrian Confirmarlo?\n`+
    `Nombre: ${venta.cliente}\n`+
    `Telefono: ${venta.telefono}\n`+
    `Domicilio: ${venta.direccion}\n`+
    `Forma de Pago: ${venta.tipo_pago === 'TRANSFERENCIA' ? 'Transferencia' : 'Efectivo'}\n`+
    `Entrega: ${venta.envio ? 'Enviar A Domicilio' : 'Lo paso a retirar'}\n\n`+
    

    `Detalle del Pedido:\n`+
        `${venta.listaProductos.map((producto: ListaProductos, index) => (
            `${index + 1}- ${producto.producto.descripcion}- (${producto.cantidad} UNIDAD/ES)- $${producto.producto.precio.toFixed(2)}\n`
        ))}`+

    `Observaciones: ${venta.observaciones.toUpperCase()}\n\n`+
    `Voy a Pagar con: ${venta.vuelto.toFixed(2)}\n\n`+
    `Total del Pedido: $${(venta.precio - venta.descuento).toFixed(2)}`
    );
    const url = `https://wa.me/${rotiseria.whatsapp}?text=${mensaje}`;
    console.log(venta)
    window.open(url, '_blank');
};