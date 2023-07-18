// routes/typeEventRoutes.js
const express = require('express');
const typeEventController = require('../controllers/typeEventController');

const router = express.Router();

router.get('/', typeEventController.getAllTypeEvents);
router.post('/', typeEventController.createTypeEvent);
router.get('/:id', typeEventController.getTypeEventById);
router.put('/:id', typeEventController.updateTypeEvent);
router.delete('/:id', typeEventController.deleteTypeEvent);

module.exports = router;
