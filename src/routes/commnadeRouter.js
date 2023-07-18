const express = require('express');
const router = express.Router();
const commnadeController = require('../controllers/commandeController');

router.get('/', commnadeController.getAll);
router.get('/:_id', commnadeController.afficherCarteCommande);
router.post('/', commnadeController.addOnce);
router.patch('/:id', commnadeController.patchOnce);
router.delete('/:id', commnadeController.deleteOnce);
module.exports = router;