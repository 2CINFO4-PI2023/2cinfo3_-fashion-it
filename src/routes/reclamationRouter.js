const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamationController');

router.get('/', reclamationController.getAll);
router.get('/:mail', reclamationController.getReclamation);
router.post('/', reclamationController.addReclamation);
router.patch('/:id', reclamationController.patchReclamation);
router.delete('/:id', reclamationController.deleteReclamation);
router.get('/reclamation-stats', async (req, res) => {
    try {
    const topTypes = await reclamationController.getReclamationStats();
    res.json(topTypes);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});
module.exports = router;