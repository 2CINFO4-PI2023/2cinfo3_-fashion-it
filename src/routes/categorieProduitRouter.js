const express = require('express');
const router = express.Router();
const categorieProduitController = require('../controllers/categorieProduitController');

router.get('/', categorieProduitController.getAll);
router.get('/:_id', categorieProduitController.getOnce);
router.post('/', categorieProduitController.addOnce);
router.put('/:id', categorieProduitController.putOnce);
router.delete('/:id', categorieProduitController.deleteOnce);
module.exports = router;