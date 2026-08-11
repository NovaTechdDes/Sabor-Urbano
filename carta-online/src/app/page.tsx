'use client';
import Buscador from '@/components/Producto/Buscador';
import rotiseria from '../../rotiseria.config';
import { Header } from '@/components/ui/Header';
import { Rubros } from '@/components/Rubros';
import { Productos } from '@/components/Productos';
import { Footer } from '@/components/ui/Footer';
import { Carrito } from '@/components/Carrito';
import { useCarritoStore } from '@/store/useCarritoStore';
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { useVariable } from '@/hooks/useVariable';
import { ModalPaginaCerrada } from '@/components/ModalPaginaCerrada';
import { useCartaEmpanada } from '@/hooks/useCartaEmpanada';

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
    return <ModalPaginaCerrada />;
  }

  return (
    <main className="min-h-screen w-full flex flex-col bg-neutral">
      <Analytics />
      <div className="pt-0 w-full flex-1 lg:px-32">
        <div className="mx-3 md:mx-7">
          <Header />
        </div>

        {/* Sección desde el buscador hacia abajo: responde al tema claro/oscuro */}
        <div className="bg-background  transition-colors duration-200 min-h-screen pt-1 pb-10">
          <div className="">
            <Buscador value={value} setValue={setValue} />
          </div>

          <Productos value={value} />
        </div>
      </div>

      <Footer />

      {abierto && <Carrito />}
    </main>
  );
}
