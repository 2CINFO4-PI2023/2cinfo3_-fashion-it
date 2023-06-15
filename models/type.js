import mongoose from 'mongoose'; // Importer Mongoose
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose

// Créez votre schéma qui décrit à quoi ressemblera chaque document
const typeSchema = new Schema(
    {
        typeId: {
            type: Number,
            required: true 
        },
        title: {
            type: String,
            required: true // Cet attribut est obligatoire
        }
    }
);

/**
 * Créer notre modèle à partir du schéma pour effectuer
 * des actions CRUD sur nos documents et l'exporter
 */
export default model("Type", typeSchema);
