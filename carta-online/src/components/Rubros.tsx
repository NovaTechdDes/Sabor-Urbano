import { useProductos } from '@/hooks/useProducto';
import { useSecciones } from '@/hooks/useSeccion'
import { Seccion } from '@/store/useSeccionStore';
import { useEffect } from 'react'


export const Rubros = () => {

    const {secciones, startObtenerSecciones, activarSeccion, seccionActive} = useSecciones();
    const { loading } = useProductos()

    useEffect(() => {
        startObtenerSecciones();
    }, []);

    useEffect(() => {
        activarSeccion(secciones[0]);
    }, [secciones]);

    const handleSeccion = (seccion: Seccion) => {
        activarSeccion(seccion);
    };

    if(loading){
        return;
    }

  return (
    <div className='flex gap-5 overflow-x-auto pb-2'>
        {
            secciones.map((seccion) => (
                <div onClick={() => handleSeccion(seccion)} key={seccion?.nombre} className={`${seccionActive?.nombre === seccion?.nombre ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-400'} p-1 rounded-sm mt-2 hover:bg-slate-500 cursor-pointer`}>
                    <p translate='no' className='text-gray-700 text-xs whitespace-nowrap font-bold hover:text-white'>{seccion?.nombre}</p>
                </div>
            ))
        }
    </div>
    
  )
}
