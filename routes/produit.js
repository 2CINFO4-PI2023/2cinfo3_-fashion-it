const express = require('express');
const multer = require('../middlewares/multer-config.js'); // Importer la configuration de multer
const {
    getAll,
    addOnce,
    getOnce,
    putOnce,
    deleteOnce,
    addFavori,
    searchProduits,
    createPaymentIntent,
    findProduitsByUserId

} = require('../controllers/produit.js');
const { createNotification } = require('../controllers/notification.js');

const router = express.Router();

router.route('/').get(getAll).post(multer, addOnce);

router.route('/:id').get(getOnce).put(putOnce).delete(deleteOnce);

router.route('/:id/favori').put(addFavori);

router.route('/user/:id').get(findProduitsByUserId);

router.route('/search').get(searchProduits);

router.route('/payment-intent').post(createPaymentIntent);

module.exports = router;
