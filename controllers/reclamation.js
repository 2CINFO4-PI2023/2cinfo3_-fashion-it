import Reclamation from "../models/reclamation.js";

// Ajouter
export function addReclamation(req, res) {
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

// Rechercher by
export function getReclamation(req, res) {
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

/**
 * Supprimer
 */
export function deleteReclamation(req, res) {
    Reclamation
    .findOneAndRemove({ "mail": req.params.mail })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

/**
 * Mettre à jour 
 */
export function patchReclamation(req, res) {
    Reclamation
    .findOneAndUpdate({ "mail": req.params.mail }, req.body, { new: true })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
