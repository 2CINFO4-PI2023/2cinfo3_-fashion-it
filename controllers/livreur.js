import Livreur from '../models/livreur.js';
import mongoose from 'mongoose';
import Commande from '../models/commande.js';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';

export const addOnce = [
  body('NUMtelephone')
    .isLength({ min: 8, max: 8 })
    .withMessage('NUMtelephone doit contenir exactement 8 chiffres'),
  body('adressEmail')
    .isEmail()
    .withMessage('adresse email invalide'),
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



export function deleteOnce(req, res) {
  const livreurId = req.params._id;

  Livreur.findById(livreurId)
    .then(livreur => {
      if (!livreur) {
        return res.status(404).json({ message: 'Livreur not found' });
      }

      Commande.updateMany(
        { livreur: livreurId },
        { $unset: { livreurId: livreur[randomIndex]._id } }
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
}


export function patchOnce(req, res) {
    Livreur
    .findOneAndUpdate({ "_id": req.params._id } , req.body, { new: true , runValidators: true })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}



export function getAll(req, res) {
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


  export function getCommandesByLivreur(req, res) {
    const livreurId = req.params._id;
  
    Commande.find({ livreurId })
      .then(commandes => {
        res.status(200).json(commandes);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }



 