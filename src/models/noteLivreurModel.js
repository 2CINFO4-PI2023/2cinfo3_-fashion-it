const mongoose = require('mongoose');

const notelivreurSchema = new mongoose.Schema({
 
    livreurId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livreur',
        required: false  
    },
    note: {
        type: Number,
        required: true
    },
});
const Notelivreur = mongoose.model('Notelivreur', notelivreurSchema);

module.exports = Notelivreur;
