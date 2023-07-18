const reclamation = require("../models/reclamationModel.js");
const Type = require("../models/typereclamationModel.js"); 

// Ajouter
exports.addType= async (req, res) => {
    // Invoquer la méthode create directement sur le modèle
    Type
    .create(req.body)
    .then(newType => {
        res.status(201).json(newType);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

// Rechercher type par ID 
exports.getType= async (req, res) => {
    Type
    .findById(req.params.id)
    .then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'Aucun document trouvé avec ce titre.' });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

// Rechercher 
exports.getAll= async (req, res) => {
    Type
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}


/**
 * Mettre à jour by ID
 */
exports.patchType= async (req, res) => {
    Type
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
}

exports.deleteTypeAndUpdateReclamations = async (req, res) => {
  let { id } = req.params;
  let typeR=id

  try {
    // Mettre à jour les réclamations avec un autre type par défaut
    await reclamation.updateMany(
      { typeR },
      { $set: { typeR: "649436e21fecc57162ff22e8" } }
      );
      
      // Supprimer le type
      await Type.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: 'Type deleted successfully' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
  }
};