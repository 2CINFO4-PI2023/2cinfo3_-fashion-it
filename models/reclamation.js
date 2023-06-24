import mongoose from 'mongoose'; // Importer Mongoose
import nodemailer from 'nodemailer';
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose

// Créez votre schéma qui décrit à quoi ressemblera chaque document
const reclamationSchema = new Schema(
    {
        nom: {
            type: String,
            required: true // Cet attribut est obligatoire
        },
        premon: {
            type: String,
            required: true 
        },
        mail: {
            type: String,
            required: true 
        },
        tel: {
            type: Number,
            required: true 
        },
        message: {
            type: String,
            required: true 
        },
        dateCreation: {
            type: Date,
            default: Date.now // Utilise la date par défaut du système
        },
        etat: {
            type: Number,
            default: 0
        },
        typeR: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Type',
            required: true
        },
    }
);

/**
 * Créer notre modèle à partir du schéma pour effectuer
 * des actions CRUD sur nos documents et l'exporter
 */
export default model("Reclamation", reclamationSchema);
