import { create } from "zustand";

export interface Variable {
    contrasenaGasto: string;
    paginaWebAbierto: boolean
}

interface VariableState {
    variable: Variable | null;
    setVariable: (variable: Variable) => void;
}

export const useVariableStore = create<VariableState>((set) => ({
    variable: null,
    setVariable: (variable: Variable) => set({ variable })
}));