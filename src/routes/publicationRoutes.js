const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');

router.get('/', publicationController.getAllPublications);
router.get('/:id', publicationController.getPublicationById);
router.post('/', publicationController.createPublication);
router.put('/:id', publicationController.updatePublication);
router.delete('/:id', publicationController.deletePublication);

module.exports = router;
