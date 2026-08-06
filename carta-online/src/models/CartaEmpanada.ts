import { model, models, Schema } from "mongoose";

const CartaEmpanadaSchema = new Schema({
    docena: {
        type: Number,
        required: true
    },
    mediaDocena: {
        type: Number,
        required: true
    }
});

export const CartaEmpanada = models.CartaEmpanada || model('CartaEmpanada', CartaEmpanadaSchema)