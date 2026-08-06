import { create } from "zustand";

export interface Seccion {
    _id: string;
    codigo: number;
    nombre: string;
};

interface SeccionState {
    secciones: Seccion[];
    seccionActive: Seccion | null;
    cargarSecciones: (nuevos: Seccion[]) => void;
    limpiarSecciones: () => void;
    setSeccionActive: (seccion: Seccion) => void;
    limpiarSeccionActive: () => void;
};


export const useSeccionStore = create<SeccionState>((set) => ({
    secciones: [],
    seccionActive: null,
    cargarSecciones: (nuevos) => set({ secciones: nuevos}),
    limpiarSecciones: () => set({ secciones: [] }),
    setSeccionActive: (seccion: Seccion) => set({ seccionActive: seccion}),
    limpiarSeccionActive: () => ({seccion: null})
}));