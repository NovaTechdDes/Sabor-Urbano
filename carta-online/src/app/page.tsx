'use client'
import Buscador from "@/components/Buscador";
import rotiseria from "../../rotiseria.config";
import { Header } from "@/components/Header";
import { Rubros } from "@/components/Rubros";
import { Productos } from "@/components/Productos";
import { Footer } from "@/components/Footer";
import { Carrito } from "@/components/Carrito";
import { useCarritoStore } from "@/store/useCarritoStore";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next"
import { useVariable } from "@/hooks/useVariable";
import { ModalPaginaCerrada } from "@/components/ModalPaginaCerrada";
import { useCartaEmpanada } from "@/hooks/useCartaEmpanada";


export default function Home() {
  const { startTraerCarta } = useCartaEmpanada();
  const { abierto } = useCarritoStore();
  const [value, setValue] = useState<string>('');
  const { variable, startGetVariable } = useVariable();

  useEffect(() => {
    startGetVariable();
  }, []);

  useEffect(() => {
    startTraerCarta();
  }, []);

  if (variable?.paginaWebAbierto === false) {
    return <ModalPaginaCerrada />

  }

  return (
    <main className="h-screen min-w-screen flex flex-col" style={{ backgroundColor: rotiseria.colorPrimario }}>
      <Analytics />
      <div className="pt-0 w-full">
        <div className="mx-3 md:mx-7">
          <Header />

          <Buscador value={value} setValue={setValue} />

          <Rubros />
        </div>

        <Productos value={value} />
      </div>

      <Footer />

      {abierto && <Carrito />}
    </main>
  )
}
