import { model, models, Schema } from "mongoose";

const VariableSchema = new Schema({
    contrasenaGasto: {
        type: String,
        default: '',
        trim: true
    },
    paginaWebAbierto: {
        type: Boolean,
        default: true,
    }
});

export const Variable = models.Variable || model('Variable', VariableSchema);