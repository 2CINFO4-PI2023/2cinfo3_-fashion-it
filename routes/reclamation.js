import express from 'express';
import { addReclamation,getReclamation,deleteReclamation, patchReclamation  } from '../controllers/reclamation.js';
  
const router = express.Router();

router
    .route('/')
    .post(addReclamation)

router
    .route('/:mail')
    .get(getReclamation)
    .delete(deleteReclamation)
    .patch(patchReclamation)

export default router;