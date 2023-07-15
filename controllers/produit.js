import Produit from "../models/produit.js";
import DeletedProduit from "../models/deletedProduit.js";

import stripe from 'stripe';

const stripeInstance = stripe('sk_test_51NQV6mI1OqZaz5EKRStYZb5vbq7rFmbi86Y8ZISfvbKrGju7Z5kTf2szqJK3HFdr93IRzPj3w0uVovGb4oNzy1yq00y0wKwtWr');

export function getAll(req, res) {
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


/*export function addOnce(req, res ){
    const newProduit = new Produit({
        categorieId: req.body.categorieId,
        name: req.body.name,
        description: req.body.description,
        prix: req.body.prix,
        marque: req.body.marque,
        taille: req.body.taille,
        couleur: req.body.couleur,
        materieau: req.body.materieau,
        image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
        paymentIntentId: req.body.paymentIntentId, // Ajoutez le champ paymentIntentId récupéré depuis le formulaire
   
    });
       newProduit.validate()
    .then(() => {
      newProduit.save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    }); 
      }*/ 


      export function addOnce(req, res) {
        const newProduit = new Produit({
          categorieId: req.body.categorieId,
          name: req.body.name,
          description: req.body.description,
          prix: req.body.prix,
          marque: req.body.marque,
          taille: req.body.taille,
          couleur: req.body.couleur,
          materieau: req.body.materieau,
          image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
          paymentIntentId: req.body.paymentIntentId, // Ajoutez le champ paymentIntentId récupéré depuis le formulaire
        });
      
        newProduit.validate()
          .then(() => {
            // Enregistrer le nouveau produit dans la base de données
            newProduit.save()
              .then((result) => {
                // Créer un paiement dans Stripe
                stripeInstance.paymentIntents.create({
                  amount: req.body.prix,
                  currency: 'usd',
                  // Ajoutez d'autres informations sur le paiement ici si nécessaire
                })
                .then((paymentIntent) => {
                  // Mettez à jour le champ paymentIntentId du produit avec l'identifiant du paiement Stripe
                  newProduit.paymentIntentId = paymentIntent.id;
                  newProduit.save(); // Sauvegarde à nouveau le produit pour mettre à jour le champ paymentIntentId
      
                  res.status(200).json(result);
                })
                .catch((error) => {
                  res.status(500).json({ error });
                });
              })
              .catch((error) => {
                res.status(500).json({ error });
              });
          })
          .catch((error) => {
            res.status(400).json({ error: error.message });
          });
      }
      
      


      export function getOnce (req, res){
        Produit 
        .findById(req.params.id)
        .then (doc => {
           res.status(200).json(doc);
        })
        .catch(err => {
           res.status(500).json({error: err});
        });
      }

      export function putOnce(req, res) {
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
      



      /*export function putOnce (req, res ) {
        Produit
        .findByIdAndUpdate ( req.params.id, req.body, { new:true})
        .then(doc => {
           res.status(200).json(doc);
        })
        .catch(err => {
           res.status(500).json({error: err});
        });
     
      }*/ 

      /*export function putOnce(req, res) {
        const Produit = (req, res, next) => {
          let produitId = req.body._id;
          let produitData = {
            categorieId: req.body.categorieId,
            name: req.body.name,
            description: req.body.description,
            prix: req.body.prix,
            marque: req.body.marque,
            taille: req.body.taille,
            couleur: req.body.couleur,
            materieau: req.body.materieau,
            image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
            paymentIntentId: req.body.paymentIntentId,
          };
          Produit 
              .findByIdAndUpdate(produitId, { $set: produitData })
              .then(() => {
                  res.status(200).json({
                      message: 'Updated successfully',
                  });
              })
              .catch((error) => {
                  res.status(500).json({
                      message: `Error occurred ${error}`,
                  });
              });
      };
    }*/
      
    
     /* export function putOnce(req, res) {
        const productId = req.params.id.trim(); // Remove whitespace from the ID
      
        Produit.findOne({ _id: productId })
          .then(product => {
            if (!product) {
              res.status(404).json({ error: 'Product not found' });
            } else {
              // Update the fields of the product object
              product.categorieId = req.body.categorieId;
              product.name = req.body.name;
              product.description = req.body.description;
              product.prix = req.body.prix;
              product.marque = req.body.marque;
              product.taille = req.body.taille;
              product.couleur = req.body.couleur;
              product.materieau = req.body.materieau;
              product.image = req.body.image;
              product.favoris = req.body.favoris;
              product.paymentIntentId = req.body.paymentIntentId;
      
              // Save the updated product
              product.save()
                .then(updatedDoc => {
                  res.status(200).json(updatedDoc);
                })
                .catch(err => {
                  res.status(500).json({ error: err });
                });
            }
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
      }*/
      
      
      
      

     /* export function putOnce(req, res) {
        const { id } = req.params;
        const { name, description, price } = req.body;
      
        // Build the update object
        const update = {};
        if (name) update.name = name;
        if (description) update.description = description;
        if (price) update.price = price;
      
        Produit.findByIdAndUpdate(id, update, { new: true })
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
      }*/
      
    
      /*export function  deleteOnce(req, res){
        Produit
        .findByIdAndRemove( req.params.id)
        .then(doc => {
           res.status(200).json(doc);
        })
        .catch(err => {
           res.status(500).json({error: err});
        });
      }*/ 
      

      /*export function deleteOnce(req, res) {
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
              categoryId: produit.categoryId
            });
      
            deletedProduit
              .save()
              .then(() => {
                // Le produit a été stocké avec succès dans DeletedProduit
                // Supprimez maintenant le produit de la collection Produit
                Produit.findByIdAndRemove(produitId)
                  .then(() => {
                    // Le produit a été supprimé avec succès
                    res.status(200).json({ message: "Suppression en cascade réussie" });
                  })
                  .catch((err) => {
                    // Une erreur s'est produite lors de la suppression du produit
                    res.status(500).json({ error: err });
                  });
              })
              .catch((err) => {
                // Une erreur s'est produite lors de la sauvegarde du produit supprimé
                res.status(500).json({ error: err });
              });
          })
          .catch((err) => {
            // Une erreur s'est produite lors de la recherche du produit
            res.status(500).json({ error: err });
          });
      }*/ 

      export function deleteOnce(req, res) {
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
      
      
      





      export function addFavori(req, res) {
         Produit.findByIdAndUpdate(req.params.id, { $inc: { favoris: 1 } }, { new: true })
           .then(doc => {
             res.status(200).json(doc);
           })
           .catch(err => {
             res.status(500).json({ error: err });
           });
       }
       /*export function searchProduits(req, res) {
         const { search, categorie, prixMin, prixMax } = req.query;
       
         // Construire les critères de recherche
         const query = {};
       
         if (search) {
           query.name = { $regex: search, $options: "i" };
         }
       
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
       
         Produit.find(query)
           .then(docs => {
             res.status(200).json(docs);
           })
           .catch(err => {
             res.status(500).json({ error: err });
           });
       }*/    



       export function searchProduits(req, res) {
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
      
      
      
       
       
       export function createPaymentIntent(req, res) {
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

    
      
      
      
      
      
      
      
      
       
       
       
       