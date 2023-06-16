import Type from "../models/type.js"; 

// Ajouter
export function addType(req, res) {
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

// Rechercher by
export function getType(req, res) {
    Type
    .findOne({ "title": req.params.title })
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

/**
 * Supprimer
 */
export function deleteType(req, res) {
    Type
    .findOneAndRemove({ "title": req.params.title })
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
export function patchType(req, res) {
    Type
      .findOneAndUpdate({ "title": req.params.title }, req.body, { new: true })
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
}
