const mongoose = require('mongoose');

const categorieProduitSchema = new mongoose.Schema({
    name : {
        type: String ,
        required: true // Cet attribut est obligatoire 
    }, 
    description : {
        type: String ,
        required: true 
    },
}
);

const CategorieProduit = mongoose.model('CategorieProduit', categorieProduitSchema);

module.exports = CategorieProduit;
