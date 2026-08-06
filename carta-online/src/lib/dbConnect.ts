import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Rotiseria';

export const dbConnect = async() => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Se conecto a la base de datos de Rotiseria")
    } catch (error) {
        console.error('❌ Error conectado MongoDb: ', error);
        process.exit(1); // Termina el proceso con un error
    }

};