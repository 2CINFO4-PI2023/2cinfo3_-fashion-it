const express = require('express');
const router = express.Router();
const typePublicationController = require('../controllers/typePublicationController');

router.get('/', typePublicationController.getAllTypePublications);
router.get('/:id', typePublicationController.getTypePublicationById);
router.post('/', typePublicationController.createTypePublication);
router.put('/:id', typePublicationController.updateTypePublication);
router.delete('/:id', typePublicationController.deleteTypePublication);

module.exports = router;
