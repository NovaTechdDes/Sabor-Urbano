import { dbConnect } from "@/lib/dbConnect";
import { Producto } from "@/models/Producto";
import { NextResponse } from "next/server";
import '@/models/Seccion';

export async function GET() {
    try {
        await dbConnect();
        const productos = await Producto.find()
            .select('descripcion precio seccion imgCloudinaryPath sinStock observaciones')
            .populate('seccion', 'nombre')
            .lean();
        return NextResponse.json({
            ok: true,
            productos
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Error Al obtener Productos ' + error },
            { status: 500 }
        )
    }
}