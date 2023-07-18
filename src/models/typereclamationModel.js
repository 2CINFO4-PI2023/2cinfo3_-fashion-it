const mongoose = require('mongoose'); // Importer Mongoose
// Utiliser Schema et model du module mongoose

// Créez votre schéma qui décrit à quoi ressemblera chaque document
const typeSchema  = new mongoose.Schema({
    
        typeId: {
            type: Number,
            required: true 
        },
        title: {
            type: String,
            required: true // Cet attribut est obligatoire
        }
    
});

/**
 * Créer notre modèle à partir du schéma pour effectuer
 * des actions CRUD sur nos documents et l'exporter
 */
const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
