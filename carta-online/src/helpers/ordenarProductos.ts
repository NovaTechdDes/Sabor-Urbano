import { Producto } from "@/store/useProductoStore";
import { Seccion } from "@/interface/Seccion";

/**
 * Normaliza un texto removiendo acentos y convirtiendo a minúsculas
 */
const normalizar = (texto: string): string => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

/**
 * Obtiene la prioridad de ordenamiento por defecto para una sección según su nombre.
 * Mantiene la misma jerarquía que `ordenarCategorias.ts`.
 */
const obtenerPrioridadSeccion = (nombre: string): number => {
  const norm = normalizar(nombre);

  if (norm.includes("empanada")) return 1;
  if (norm.includes("hamburgues") || norm.includes("hamburges")) return 2;
  if (norm.includes("milanesa")) return 3;
  if (norm.includes("pizza")) return 4;
  if (norm.includes("sandwich") || norm.includes("sanduich")) return 5;
  if (norm.includes("tostad") || norm.includes("totad")) return 6;
  if (norm.includes("vino")) return 7;

  return 999;
};

/**
 * Ordena un arreglo de productos por categoría (sección).
 * 
 * - Si se le proporciona la lista `seccionesOrdenadas`, respeta exactamente
 *   la posición que tiene cada categoría en dicho listado.
 * - De lo contrario, aplica la misma prioridad por defecto que en `ordenarCategorias`.
 */
export const ordenarProductos = (
  productos: Producto[],
  seccionesOrdenadas?: Seccion[]
): Producto[] => {
  if (!Array.isArray(productos)) return [];

  return [...productos].sort((a, b) => {
    const nombreA = a.seccion?.nombre || "";
    const nombreB = b.seccion?.nombre || "";

    // 1. Si se provee la lista de secciones ordenadas, usar su índice exacto
    if (seccionesOrdenadas && seccionesOrdenadas.length > 0) {
      const indexA = seccionesOrdenadas.findIndex(
        (sec) => (sec._id && sec._id === a.seccion?._id) || normalizar(sec.nombre) === normalizar(nombreA)
      );
      const indexB = seccionesOrdenadas.findIndex(
        (sec) => (sec._id && sec._id === b.seccion?._id) || normalizar(sec.nombre) === normalizar(nombreB)
      );

      const posA = indexA !== -1 ? indexA : 9999;
      const posB = indexB !== -1 ? indexB : 9999;

      if (posA !== posB) return posA - posB;
    } else {
      // 2. Si no hay lista personalizada, usar la prioridad por defecto
      const prioA = obtenerPrioridadSeccion(nombreA);
      const prioB = obtenerPrioridadSeccion(nombreB);

      if (prioA !== prioB) return prioA - prioB;

      const compSeccion = nombreA.localeCompare(nombreB);
      if (compSeccion !== 0) return compSeccion;
    }

    // 3. Dentro de la misma categoría, ordenar alfabéticamente por la descripción del producto
    return (a.descripcion || "").localeCompare(b.descripcion || "");
  });
};
