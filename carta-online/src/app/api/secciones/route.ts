import { dbConnect } from "@/lib/dbConnect";
import { Seccion } from "@/models/Seccion";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const secciones = await Seccion.find().lean();

        secciones.sort((a, b) => {
            if(a.nombre === 'TODOS') return -1
            if(b.nombre === 'TODOS') return 1
            return a.nombre.localeCompare(b.nombre);
        })

        return NextResponse.json({
            ok: true,
            secciones
        })
    } catch (error) {
        return NextResponse.json(
            {error: 'Error al obtener Secciones ' + error},
            { status: 500}
        ) 
    }
}