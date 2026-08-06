import { useVariableStore, Variable } from "@/store/useVariableStore"
import axios from "axios";

export const useVariable = () => {

    const { variable, setVariable } = useVariableStore();

    const startGetVariable = async() => {
        try {
            const { data } = await axios.get(`/api/variables`);
            if(data.ok){
                setVariable(data.variable)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        //Atributos
        variable,
        
        //Metodos
        startGetVariable,

    }
}