import { useProductos } from '@/hooks/useProducto';
import { useSecciones } from '@/hooks/useSeccion';
import { Seccion } from '@/store/useSeccionStore';
import { useEffect } from 'react';

export const Rubros = () => {
  const { secciones, startObtenerSecciones, activarSeccion, seccionActive } = useSecciones();
  const { loading } = useProductos();

  useEffect(() => {
    startObtenerSecciones();
  }, []);

  useEffect(() => {
    activarSeccion(secciones[0]);
  }, [secciones]);

  const handleSeccion = (seccion: Seccion) => {
    activarSeccion(seccion);
  };

  if (loading) {
    return;
  }

  return (
    <div className="w-full flex gap-3 overflow-x-auto pb-2 scroll-smooth touch-pan-x">
      {secciones.map((seccion) => {
        const isActive = seccionActive?.nombre === seccion?.nombre;

        return (
          <div
            onClick={() => handleSeccion(seccion)}
            key={seccion?.nombre}
            className={`shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap font-medium text-sm sm:text-base ${
              isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-[#181818] dark:bg-[#181818] text-white hover:bg-[#252525] border border-neutral-800'
            }`}
          >
            <p translate="no">{seccion?.nombre}</p>
          </div>
        );
      })}
    </div>
  );
};
