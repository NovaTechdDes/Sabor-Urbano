import { Seccion, useSeccionStore } from "@/store/useSeccionStore";
import axios from "axios";


export const useSecciones = () => {

    const { cargarSecciones, secciones, setSeccionActive, seccionActive } = useSeccionStore();
    
    const activarSeccion = async(seccion: Seccion) => {
        try {
            setSeccionActive(seccion)
        } catch (error) {
            console.log(error)
        }
    }

    const startObtenerSecciones = async() => {
        try {
            const { data } = await axios.get(`/api/secciones`);
            if(data.ok){
                cargarSecciones(data.secciones)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        //Atributos
        seccionActive,
        secciones,

        //Metodos
        activarSeccion,
        startObtenerSecciones,
    }
};