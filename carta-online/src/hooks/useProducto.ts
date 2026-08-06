
import { useProductoStore } from "@/store/useProductoStore"
import axios from "axios";

export const useProductos = () => {

    const { productos, cargarProductos, loading, setLoading } = useProductoStore();

    const startObtenerProductos = async() => {
        try {
            setLoading();
            const { data } = await axios.get(`/api/productos`);
            if(data.ok){
                cargarProductos(data.productos);
                return data.ok;
            }
        } catch (error) {
            console.log(error);
            
        }
    };


    return {
        //Atributos
        loading,
        productos,

        //Metodos
        startObtenerProductos
    }
}