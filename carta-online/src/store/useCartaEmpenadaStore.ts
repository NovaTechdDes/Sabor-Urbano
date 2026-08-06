import { create } from "zustand";

export interface Carta {
    docena: number;
    mediaDocena: number;
}

interface CartaState {
    carta: Carta;
    loading: boolean;
    cargarCarta: (nuevaCarta: Carta) => void;
    setLoadingCarta: () => void;
};


export const useCartaEmpanadaStore = create<CartaState>((set) => ({
    carta: { docena: 0, mediaDocena: 0 },
    loading: false,
    cargarCarta: (nuevaCarta) => set({ carta: nuevaCarta, loading: false }),
    setLoadingCarta: () => set({ loading: true })
}));