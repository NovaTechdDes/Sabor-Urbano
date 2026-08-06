import { useCartaEmpanadaStore } from "@/store/useCartaEmpenadaStore"
import axios from "axios";
import Swal from "sweetalert2";

export const useCartaEmpanada = () => {

    const { loading, setLoadingCarta, cargarCarta, carta } = useCartaEmpanadaStore();

    const startTraerCarta = async() => {
        setLoadingCarta();

        try {
            const  { data } = await axios.get('/api/cartaEmpanada');
            
            if(data.ok){
                cargarCarta(data.carta);
            }else{
                await Swal.fire('No se pudo obtener la carta', data.msg, 'error')
            }
        } catch (error) {
            console.log(error);

        }
    }

    return {
        //Atributos
        loading,
        carta,

        //Metodos
        startTraerCarta


    }
}