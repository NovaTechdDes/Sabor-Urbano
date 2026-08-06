import { dbConnect } from "@/lib/dbConnect";
import { Venta } from "@/models/Venta";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await dbConnect()

        const body = await req.json();

        const nuevaVenta = new Venta(body);
        await nuevaVenta.save();

        return NextResponse.json({
            ok: true,
            venta: nuevaVenta
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error: 'Error al Cargar Venta' + error},
            { status: 500}
        )
    }
};