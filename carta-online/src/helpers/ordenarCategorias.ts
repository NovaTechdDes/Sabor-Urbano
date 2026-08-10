import { Seccion } from "@/store/useSeccionStore";

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
 * Obtiene el índice de prioridad de una sección según su nombre
 */
const obtenerPrioridad = (nombre: string): number => {
  const norm = normalizar(nombre);

  if (norm.includes("todo")) return 1;
  if (norm.includes("empanada")) return 2;
  if (norm.includes("hamburgues") || norm.includes("hamburges")) return 3;
  if (norm.includes("milanesa")) return 4;
  if (norm.includes("pizza")) return 5;
  if (norm.includes("sandwich") || norm.includes("sanduich")) return 6;
  if (norm.includes("tostad") || norm.includes("totad")) return 7;
  if (norm.includes("vino")) return 8;

  return 999; // Para las demás secciones que irán al final
};

/**
 * Ordena un arreglo de secciones según el orden prioritario:
 * 1. Todos
 * 2. Empanadas
 * 3. Hamburguesas
 * 4. Milanesas
 * 5. Pizzas
 * 6. Sándwiches
 * 7. Tostados
 * 8. Vinos
 * 9. El resto (conservando su orden relativo o alfabético)
 */
export const ordenarSecciones = (secciones: Seccion[]): Seccion[] => {
  if (!Array.isArray(secciones)) return [];

  return [...secciones].sort((a, b) => {
    const prioridadA = obtenerPrioridad(a.nombre || "");
    const prioridadB = obtenerPrioridad(b.nombre || "");

    if (prioridadA !== prioridadB) {
      return prioridadA - prioridadB;
    }

    // Si tienen la misma prioridad (por ejemplo, dos secciones que van al final),
    // se pueden ordenar alfabéticamente
    return (a.nombre || "").localeCompare(b.nombre || "");
  });
};
