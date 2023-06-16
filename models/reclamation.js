import mongoose from 'mongoose'; // Importer Mongoose
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
            required: true // Cet attribut est obligatoire
        },
        mail: {
            type: String,
            required: true // Cet attribut est obligatoire
        },
        tel: {
            type: Number,
            required: true // Cet attribut est obligatoire
        },
        message: {
            type: String,
            required: true // Cet attribut est obligatoire
        }
    }
);

/**
 * Créer notre modèle à partir du schéma pour effectuer
 * des actions CRUD sur nos documents et l'exporter
 */
export default model("Reclamation", reclamationSchema);
