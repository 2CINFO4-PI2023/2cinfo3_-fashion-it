const express = require('express');
const router = express.Router();
const livreurController = require('../controllers/livreurController');

router.get('/', livreurController.getAll);
router.get('/:_id', livreurController.getCommandesByLivreur);
router.post('/', livreurController.addOnce);
router.patch('/:id', livreurController.patchOnce);
router.delete('/:id', livreurController.deleteOnce);
module.exports = router;