const Commande = require('../models/commandeModel');
const Livreur = require('../models/livreurModel');
const { body, validationResult } = require('express-validator');
exports.addOnce = [
  body('NUMtelephone')
    .isLength({ min: 8, max: 8 })
    .withMessage('NUMtelephone doit contenir exactement 8 chiffres'),
  body('adressEmail')
    .isEmail()
    .withMessage('adresse email invalide'),
    body('age')
    .isLength({ min: 2, max: 2 })
    .withMessage('NUMtelephone doit contenir exactement 2 chiffres'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Livreur.create(req.body)
      .then(newLivreur => {
        res.status(200).json(newLivreur);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
];


exports.deleteOnce = async (req, res) =>{
  const livreurId = req.params._id;

  Livreur.findById(livreurId)
    .then(livreur => {
      if (!livreur) {
        return res.status(404).json({ message: 'Livreur not found' });
      }

      Commande.find({ livreur: livreurId })
        .then(commandes => {
          if (commandes.length > 0) {
            Livreur.find()
              .then(livreurs => {
                const livreurIds = livreurs.map(livreur => livreur._id);
                const autreLivreurId = getRandomLivreurId(livreurIds, livreurId);

                Commande.updateMany(
                  { livreur: livreurId },
                  { livreur: autreLivreurId }
                )
                  .then(() => {
                    Livreur.findByIdAndRemove(livreurId)
                      .then(() => {
                        res.status(200).json({ message: 'Livreur deleted successfully and commandes updated' });
                      })
                      .catch(err => {
                        res.status(500).json({ error: err });
                      });
                  })
                  .catch(err => {
                    res.status(500).json({ error: err });
                  });
              })
              .catch(err => {
                res.status(500).json({ error: err });
              });
          } else {
            Livreur.findByIdAndRemove(livreurId)
              .then(() => {
                res.status(200).json({ message: 'Livreur deleted successfully' });
              })
              .catch(err => {
                res.status(500).json({ error: err });
              });
          }
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

function getRandomLivreurId(livreurIds, excludedId) {
  const filteredIds = livreurIds.filter(id => id.toString() !== excludedId.toString());
  const randomIndex = Math.floor(Math.random() * filteredIds.length);
  return filteredIds[randomIndex];
}



exports.patchOnce = async (req, res) =>{
    Livreur
    .findOneAndUpdate({ "_id": req.params._id } , req.body, { new: true , runValidators: true })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}



exports.getAll = async (req, res) =>{
    Livreur.aggregate([
      {
        $lookup: {
          from: 'commandes',
          localField: '_id',
          foreignField: 'livreurId',
          as: 'commandes',
          
        },
      },
      
    ])
    
      .then((livreurs) => {
        res.status(200).json(livreurs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }


  exports.getCommandesByLivreur = async (req, res) =>{
    const livreurId = req.params._id;
  
    Commande.find({ livreurId })
      .then(commandes => {
        res.status(200).json(commandes);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }


  exports.getLivreurStatistics = async (req, res) =>{
    try {
      const statistics = await Livreur.aggregate([
        {
          $group: {
            _id: null,
            moyenneNoteMin: { $min: '$moyenneNote' },
            moyenneNoteMax: { $max: '$moyenneNote' },
            moyenneNoteMoyenne: { $avg: '$moyenneNote' },
            count: { $sum: 1 },
          },
        },
      ]);
  
      const result = {
        moyenneNoteMin: statistics[0]?.moyenneNoteMin || 0,
        moyenneNoteMax: statistics[0]?.moyenneNoteMax || 0,
        moyenneNoteMoyenne: statistics[0]?.moyenneNoteMoyenne || 0,
        totalLivreurs: statistics[0]?.count || 0,
      };
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



  exports.getLivreurList = async (req, res) =>{
    Livreur.find({ moyenneNote: { $gt: 3 } })
      .then(livreurs => {
        res.status(200).json(livreurs);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }

 