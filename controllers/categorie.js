import Categorie from "../models/categorie.js";
import Produit from "../models/produit.js";
import DeletedCategorie from "../models/deletedCategorie.js";
import DeletedProduit from "../models/deletedProduit.js"

 
 export function getAll (req,res){
   Categorie
   .find({})
   .then(docs => {
      res.status(200).json(docs);
   })
   .catch(err => {
      res.status(500).json({ error: err});
   });
 }
export function addOnce(req, res ){
 Categorie
    .create({
      name: req.body.name ,
      description: req.body.description,

    })
    .then(newCategorie => {
      res.status(200).json(newCategorie)
    })
    .catch(err => {
      res.status(500).json({ error: err});
    }); 
   }

   export function getOnce (req, res){
    Categorie 
    .findById(req.params.id)
    .then (doc => {
       res.status(200).json(doc);
    })
    .catch(err => {
       res.status(500).json({error: err});
    });
  }
  export function putOnce (req, res ) {
    Categorie
    .findByIdAndUpdate ( req.params.id, req.body, { new:true})
    .then(doc => {
       res.status(200).json(doc);
    })
    .catch(err => {
       res.status(500).json({error: err});
    });
 
  }
 
  /*export function  deleteOnce(req, res){
    Categorie
    .findByIdAndRemove( req.params.id)
    .then(doc => {
       res.status(200).json(doc);
    })
    .catch(err => {
       res.status(500).json({error: err});
    });
  }*/

  /*export function deleteOnce(req, res) {
   const categoryId = req.params.id;
 
   Categorie
   .findByIdAndRemove(categoryId)
     .then(() => {
       // La catégorie a été supprimée avec succès
       // Supprimez maintenant les produits associés à cette catégorie
       Produit.deleteMany({ categorieId: categoryId })
         .then(() => {
           // Les produits associés à la catégorie ont été supprimés avec succès
           res.status(200).json({ message: "Suppression en cascade réussie" });
         })
         .catch((err) => {
           // Une erreur s'est produite lors de la suppression des produits
           res.status(500).json({ error: err });
         });
     })
     .catch((err) => {
       // Une erreur s'est produite lors de la suppression de la catégorie
       res.status(500).json({ error: err });
     });
 }*/

 /*export function deleteOnce(req, res) {
  const categoryId = req.params.id;

  Categorie.findById(categoryId)
    .then((categorie) => {
      if (!categorie) {
        res.status(404).json({ message: "Catégorie non trouvée" });
        return;
      }

      const deletedCategorie = new DeletedCategorie({
        categoryId: categorie._id,
        name: categorie.name,
        description: categorie.description,
      });

      deletedCategorie
        .save()
        .then(() => {
          // La catégorie a été stockée avec succès dans DeletedCategorie
          // Supprimez maintenant la catégorie de la collection Categorie
          Categorie.findByIdAndRemove(categoryId)
            .then(() => {
              // Supprimez les produits associés à la catégorie
              Produit.deleteMany({ categorieId: categoryId })
                .then(() => {
                  // La catégorie et les produits associés ont été supprimés avec succès
                  res.status(200).json({ message: "Suppression en cascade réussie" });
                })
                .catch((err) => {
                  // Une erreur s'est produite lors de la suppression des produits associés
                  res.status(500).json({ error: err });
                });
            })
            .catch((err) => {
              // Une erreur s'est produite lors de la suppression de la catégorie
              res.status(500).json({ error: err });
            });
        })
        .catch((err) => {
          // Une erreur s'est produite lors de la sauvegarde de la catégorie supprimée
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      // Une erreur s'est produite lors de la recherche de la catégorie
      res.status(500).json({ error: err });
    });
}*/

export function deleteOnce(req, res) {
  const categoryId = req.params.id;

  Categorie.findById(categoryId)
    .then((categorie) => {
      if (!categorie) {
        res.status(404).json({ message: "Catégorie non trouvée" });
        return;
      }

      const deletedCategorie = new DeletedCategorie({
        categoryId: categorie._id,
        name: categorie.name,
        description: categorie.description,
      });

    

     

deletedCategorie
.save()
.then(() => {
  // La catégorie a été stockée avec succès dans DeletedCategorie
  // Supprimez maintenant la catégorie de la collection Categorie
  Categorie.findByIdAndRemove(categoryId)
    .then(() => {
      // Supprimez les produits associés à la catégorie
      Produit.find({ categorieId: categoryId })
        .then((produits) => {
          // Sauvegardez les produits supprimés dans DeletedProduit
          const deletedProduits = produits.map((produit) => ({
            produitId: produit._id,
            name: produit.name,
            description: produit.description,
            categoryId: categorie._id, // Utilisez categorie._id au lieu de produit.categoryId
          }));

          DeletedProduit.insertMany(deletedProduits)
            .then(() => {
              // Les produits ont été sauvegardés avec succès dans DeletedProduit
              // Supprimez maintenant les produits de la collection Produit
              Produit.deleteMany({ categorieId: categoryId })
                .then(() => {
                  // La catégorie et les produits associés ont été supprimés avec succès
                  res.status(200).json({ message: "Suppression en cascade réussie" });
                })
                .catch((err) => {
                  // Une erreur s'est produite lors de la suppression des produits associés
                  res.status(500).json({ error: err });
                });
            })
            .catch((err) => {
              // Une erreur s'est produite lors de la sauvegarde des produits supprimés
              res.status(500).json({ error: err });
            });
        })
        .catch((err) => {
          // Une erreur s'est produite lors de la recherche des produits associés
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      // Une erreur s'est produite lors de la suppression de la catégorie
      res.status(500).json({ error: err });
    });
})
.catch((err) => {
  // Une erreur s'est produite lors de la sauvegarde de la catégorie supprimée
  res.status(500).json({ error: err });
});
})
}


 
 