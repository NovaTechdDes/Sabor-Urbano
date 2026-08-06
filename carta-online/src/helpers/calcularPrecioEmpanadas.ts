import { Carta } from "@/store/useCartaEmpenadaStore";

export const calcularPrecioEmpanadas = (cantidadEmpanadas: number, precioEmpanadas: number, carta: Carta): number => {

    const DOCENA = 12;
    const MEDIA_DOCENA = 6;

    const EmpanadaDocena = carta.docena;
    const EmpanadaMediaDocena = carta.mediaDocena;
    const EmpanadaUnidad = precioEmpanadas;

    console.log({EmpanadaDocena, EmpanadaMediaDocena, EmpanadaUnidad})

    const docenas = Math.floor(cantidadEmpanadas / DOCENA);
    const restantesTrasDocenas = cantidadEmpanadas % DOCENA;

    const mediaDocena = Math.floor(restantesTrasDocenas / MEDIA_DOCENA);
    const adicionales = restantesTrasDocenas % MEDIA_DOCENA;

    return (
        docenas * EmpanadaDocena +
        mediaDocena * EmpanadaMediaDocena +
        adicionales * EmpanadaUnidad
    );
}