import { model, models, Schema, Types } from "mongoose";

const ProductoSchema = new Schema({
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    seccion: {
        type: Types.ObjectId,
        ref: 'Seccion'
    },
    imgCloudinaryPath: {
        type: String,
        default: ''
    },
    sinStock: {
        type: Boolean,
        default: false
    },
    observaciones: {
        type: String,
        trim: true,
        default: ''
    }
});

export const Producto = models.Producto || model('Producto', ProductoSchema);