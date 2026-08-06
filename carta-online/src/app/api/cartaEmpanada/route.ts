import { dbConnect } from "@/lib/dbConnect";
import { CartaEmpanada } from "@/models/CartaEmpanada";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect();

        const carta = await CartaEmpanada.findOne();

        return NextResponse.json({
            ok: true,
            carta
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error: 'Error Al obtener Carta ' + error},
            { status: 500}
        );
    }
}