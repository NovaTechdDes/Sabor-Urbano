import { dbConnect } from "@/lib/dbConnect";
import { Variable } from "@/models/Variable";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect();
        const variable = await Variable.findOne();

        return NextResponse.json({
            ok: true,
            variable
        });
    } catch (error) {
        return NextResponse.json(
            {error: 'Error al obtener Variables ' + error},
            { status: 500}
        )
    }
}