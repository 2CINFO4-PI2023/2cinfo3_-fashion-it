const mongoose = require('mongoose');

const livreurSchema = new mongoose.Schema({
    
        Nom: {
            type: String,
            required: true 
        },
        Prenom : {
            type: String,
            required: false
        },
        NUMtelephone: {
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
        typeDEvehicule : {
            type: String,
            required: true
        },
        age : {
            type: String,
            required: true
        },
        profession : {
            type: String,
            required: true
        },
        sex : {
            type: String,
            required: true
        },
        moyenneNote : {
            type: Number,
            required: true
        }
    }
);

const Livreur = mongoose.model('Livreur', livreurSchema);

module.exports = Livreur;
