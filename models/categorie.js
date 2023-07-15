import mongoose from "mongoose"; // importer Mongoose 
const { Schema, model} = mongoose; // utiliser Schema et model du module mongoose  

const categorieSchema = new Schema (
    {
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

export default model("Categorie", categorieSchema);