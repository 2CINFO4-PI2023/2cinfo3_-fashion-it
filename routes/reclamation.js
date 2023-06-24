import express from 'express';
import { addReclamation,getReclamation,deleteReclamation, patchReclamation,getAll  } from '../controllers/reclamation.js';
  
const router = express.Router();

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