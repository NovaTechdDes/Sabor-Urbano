import { model, models, Schema } from "mongoose";

const SeccionSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    }
});

export const Seccion = models.Seccion || model('Seccion', SeccionSchema);