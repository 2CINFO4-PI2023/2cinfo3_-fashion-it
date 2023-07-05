import express from 'express';
import { addReclamation,getReclamation,deleteReclamation, patchReclamation,getAll,getReclamationStats  } from '../controllers/reclamation.js';
  
const router = express.Router();

// Route pour les statistiques sur les types de réclamation
router
    .get('/reclamation-stats', async (req, res) => {
        try {
        const topTypes = await getReclamationStats();
        res.json(topTypes);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });

router
    .route('/')
    .post(addReclamation)
    .get(getAll)
    
router
    .route('/:mail')
    .get(getReclamation)
router
    .route('/:id')
    .delete(deleteReclamation)
    .patch(patchReclamation)


export default router;