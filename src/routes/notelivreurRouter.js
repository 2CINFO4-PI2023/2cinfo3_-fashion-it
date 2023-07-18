const express = require('express');
const router = express.Router();
const livreurController = require('../controllers/livreurController');
const notelivreurController = require('../controllers/notelivreurController');

router.get('/', livreurController.getLivreurStatistics);
router.get('/livreurs', livreurController.getLivreurList);
router.post('/', notelivreurController.addNoteLivreur);

module.exports = router;