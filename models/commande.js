
import mongoose from 'mongoose';
import Livreur from '../models/livreur.js'; 
const { Schema, model } = mongoose; 


const commandeSchema = new Schema(
    {
    
        livreurId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'livreur',
            required: false 
        },
        produits: {
            type: String,
            required: true
        },
        adresse : {
            type: String,
            required: true
        },
        adressEmail : {
            type: String,
            required: true
        },
        Prixtotal : {
            type: String,
            required: true
        },
        latitude : {
            type: String,
            required: false
        },
        longitude : {
            type: String,
            required: false
        },
    },
    {
        timestamps: true
    }
    
);


export default model("Commande", commandeSchema);