const DeletedProduit = require("../models/deletedProduit.js");
const Produit = require('../models/produit.js');
const stripe = require('stripe');
const fs = require('fs');

const stripeInstance = stripe('sk_test_51NQV6mI1OqZaz5EKRStYZb5vbq7rFmbi86Y8ZISfvbKrGju7Z5kTf2szqJK3HFdr93IRzPj3w0uVovGb4oNzy1yq00y0wKwtWr');


function getAll(req, res) {
    Produit.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "categorieId",
                foreignField: "_id",
                as: "categorie"
            }
        }
    ])
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

function addOnce(req, res) {
    const newProduit = new Produit({
        user: req.body.user, // Add the user field with the provided user ID
        categorieId: req.body.categorieId,
        name: req.body.name,
        description: req.body.description,
        prix: req.body.prix,
        marque: req.body.marque,
        taille: req.body.taille,
        couleur: req.body.couleur,
        materieau: req.body.materieau,
        paymentIntentId: req.body.paymentIntentId,
    });

    // Handle the image file separately
    if (req.file) {
        newProduit.image.url = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;
        newProduit.image.fileName = req.file.filename;
    }

    newProduit
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
}
function getOnce(req, res) {
    Produit.findById(req.params.id)
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

function putOnce(req, res) {
    const { id } = req.params;
    const { categorieId, name, description, prix, marque, taille, couleur, materieau, image, favoris, paymentIntentId } = req.body;

    Produit.findByIdAndUpdate(id, {
        categorieId,
        name,
        description,
        prix,
        marque,
        taille,
        couleur,
        materieau,
        image,
        favoris,
        paymentIntentId
    }, { new: true })
        .then(updatedDoc => {
            if (updatedDoc) {
                res.status(200).json(updatedDoc);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

function deleteOnce(req, res) {
    const produitId = req.params.id;
    Produit.findById(produitId)
        .then((produit) => {
            if (!produit) {
                res.status(404).json({ message: "Produit non trouvé" });
                return;
            }

            const deletedProduit = new DeletedProduit({
                produitId: produit._id,
                name: produit.name,
                description: produit.description,
                categoryId: produit.categorieId // Utilisez produit.categorieId au lieu de produit.categoryId
            });

            // Vérifiez si la valeur de categoryId est valide avant de créer l'objet DeletedProduit
            if (!deletedProduit.categoryId) {
                res.status(400).json({ message: "La valeur de categoryId est manquante ou invalide" });
                return;
            }

            deletedProduit
                .save()
                .then(() => {
                    Produit.findByIdAndRemove(produitId)
                        .then(() => {
                            res.status(200).json({ message: "Suppression en cascade réussie" });
                        })
                        .catch((err) => {
                            res.status(500).json({ error: err });
                        });
                })
                .catch((err) => {
                    res.status(500).json({ error: err });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

function addFavori(req, res) {
    Produit.findByIdAndUpdate(req.params.id, { $inc: { favoris: 1 } }, { new: true })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

function searchProduits(req, res) {
    const { key, categorie, prixMin, prixMax } = req.query;

    // Construire les critères de recherche
    const query = {};

    if (categorie) {
        query.categorieId = categorie;
    }

    if (prixMin && prixMax) {
        query.prix = { $gte: prixMin, $lte: prixMax };
    } else if (prixMin) {
        query.prix = { $gte: prixMin };
    } else if (prixMax) {
        query.prix = { $lte: prixMax };
    }

    if (key && key.trim() !== "") {
        query.name = { $regex: key, $options: "i" };
    }

    Produit.find(query)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

function createPaymentIntent(req, res) {
    const amount = req.body.amount; // Montant en dinar
    const currency = 'usd'; // Devise (par exemple, 'TND' pour les dollars américains)

    stripeInstance.paymentIntents.create({
        amount,
        currency,
        // Ajoutez d'autres informations sur le paiement ici si nécessaire
    })
        .then(paymentIntent => {
            res.status(200).json(paymentIntent);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
}
function findProduitsByUserId(req, res) {
    const userId = req.params.id;
    Produit.find({ user: userId })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

module.exports = {
    getAll,
    addOnce,
    getOnce,
    putOnce,
    deleteOnce,
    addFavori,
    searchProduits,
    createPaymentIntent,
    findProduitsByUserId
};
