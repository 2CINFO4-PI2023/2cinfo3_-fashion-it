const express = require('express');
const {
    getAll,
    addOnce,
    getOnce,
    putOnce,
    deleteOnce,
} = require('../controllers/categorie.js');

const router = express.Router();
router.route('/').get(getAll).post(addOnce);

router.route('/:id').get(getOnce).put(putOnce).delete(deleteOnce);

module.exports = router;
