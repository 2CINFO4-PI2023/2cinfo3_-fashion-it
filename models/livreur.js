import mongoose from 'mongoose'; 
const { Schema, model } = mongoose; 


const livreurSchema = new Schema(
    {
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
        }
    }
    
);


export default model("Livreur", livreurSchema);