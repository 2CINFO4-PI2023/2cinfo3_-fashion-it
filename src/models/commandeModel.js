const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
    livreurId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livreur',
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
});

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;
