import Livreur from '../models/livreur.js';



export function addOnce(req, res) {

    Livreur
    .create(req.body)
    .then(newLivreur => {
        res.status(200).json(newLivreur);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function deleteOnce(req, res) {
    Livreur
    .findOneAndRemove({ "Nom": req.params.Nom })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function getAll(req, res) {
    Livreur
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function patchOnce(req, res) {
    Livreur
    .findOneAndUpdate({ "Nom": req.params.Nom } , req.body, { new: true })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}



