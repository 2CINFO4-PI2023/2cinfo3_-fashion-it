//import reclamation from "../models/reclamation.js";
const Reclamation = require( "../models/typereclamationModel.js");
const type = require("../models/typereclamationModel.js");

// Ajouter
exports.addReclamation= async (req, res) => {
    // Invoquer la méthode create directement sur le modèle
    Reclamation
    .create(req.body)
    .then(newType => {
        res.status(201).json(newType);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

// Rechercher by Mail
exports.getReclamation= async (req, res) => {
    Reclamation
    .findOne({ "mail": req.params.mail })
    .then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'Réclamation non trouvée' });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
// Rechercher 
exports.getAll= async (req, res) => {
    Reclamation
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}



/**
 * Supprimer by id
 */
exports.deleteReclamation= async (req, res) => {
    Reclamation
    .findByIdAndRemove(req.params.id)
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

/**
 * Mettre à jour by id
 */
exports.patchReclamation= async (req, res) => {
    Reclamation
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}


// Fonction pour obtenir les statistiques sur les types de réclamation
exports.getReclamationStats= async () => {
    try {
      // Compter le nombre de réclamations par type
      const typeCounts = await reclamation.aggregate([
        { $group: { _id: '$typeR', count: { $sum: 1 } } },
        { $sort: { count: -1 } }, // Trier par ordre décroissant
        { $limit: 3 } // Limiter aux cinq premiers résultats
      ]);
  
      // Obtenir les détails des types de réclamation
      const typeDetails = await type.find({ _id: { $in: typeCounts.map(item => item._id) } });
  
      // Fusionner les compteurs et les détails des types
      const topTypes = typeCounts.map(count => {
        const typeDetail = typeDetails.find(type => type._id.equals(count._id));
        return {
          type: typeDetail,
          NombredeReclamation: count.count
        };
      });
  
      return topTypes;
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
  }