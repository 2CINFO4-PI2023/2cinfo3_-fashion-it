const express = require('express');
const router = express.Router();
const typereclamationController = require('../controllers/typeReclamationController');

router.get('/', typereclamationController.getAll);
router.get('/:id', typereclamationController.getType);
router.post('/', typereclamationController.addType);
router.patch('/:id', typereclamationController.patchType);
router.delete('/:id', typereclamationController.deleteTypeAndUpdateReclamations);

module.exports = router;
