import mongoose from 'mongoose';
import Livreur from '../models/livreur.js'; 
const { Schema, model } = mongoose; 


const notelivreurSchema = new Schema(
    {
    
        livreurId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'livreur',
            required: false  
        },
        note: {
            type: Number,
            required: true
        },
     
    }
    
);


export default model("Notelivreur", notelivreurSchema);