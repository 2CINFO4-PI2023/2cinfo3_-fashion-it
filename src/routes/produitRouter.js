const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');

router.get('/', produitController.getAll);
router.get('/:_id', produitController.getOnce);
router.get('/search', produitController.searchProduits);
router.post('/', produitController.addOnce);
router.post('/payment-intent', produitController.createPaymentIntent);
router.put('/:id', produitController.putOnce);
router.put('/:id/favori', produitController.addFavori);
router.delete('/:id', produitController.deleteOnce);
module.exports = router;