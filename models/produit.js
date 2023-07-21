const mongoose = require("mongoose"); // importer Mongoose
const { Schema, model } = mongoose; // utiliser Schema et model du module mongoose
const stripe = require("stripe");
const User = require('../models/user');  // Import the Role model

const produitSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categorieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    // required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true, // Supprimer les espaces vides au début et à la fin
    minlength: 2, // Longueur minimale de 2 caractères
    maxlength: 50, // Longueur maximale de 50 caractères
  },
  description: {
    type: String,
    required: true,
    minlength: 10, // Longueur minimale de 10 caractères
  },
  prix: {
    type: Number,
    required: true,
    min: 0, // Doit être supérieur ou égal à zéro
  },
  marque: {
    type: String,
    required: true,
  },
  taille: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL'], // Doit être l'une des tailles spécifiées,
    minLength: [1, "Le champ 'taille' doit contenir au moins 1 caractère"],
  },
  couleur: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+$/, // Doit contenir uniquement des lettres
  },
  materieau: {
    type: String,
    required: true,
    enum: ['Coton', 'Polyester', 'Nylon'], // Doit être l'un des matériaux spécifiés
  },
  // image: {
  //   type: String,
  //   // required: true,
  // },
  image: {
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  favoris: {
    type: Number,
    default: 0,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
});

produitSchema.pre("save", async function (next) {
  try {
    const stripeInstance = stripe("sk_test_51NQV6mI1OqZaz5EKRStYZb5vbq7rFmbi86Y8ZISfvbKrGju7Z5kTf2szqJK3HFdr93IRzPj3w0uVovGb4oNzy1yq00y0wKwtWr");

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: this.prix * 100, // Assuming prix is in dollars
      currency: "usd",
    });

    this.paymentIntentId = paymentIntent.id;
  } catch (error) {
    console.error("Error creating payment intent:", error);
  }

  next();
});

module.exports = model("Produit", produitSchema);
