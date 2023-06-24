import express from 'express';

import { addType,getType,patchType,getAll,deleteTypeAndUpdateReclamations } from '../controllers/type.js';
  
const router = express.Router();

router
    .route('/')
    .post(addType)
    .get(getAll)
    
router
    .route('/:id')
    .get(getType)
    .delete(deleteTypeAndUpdateReclamations)
    .patch(patchType)

export default router;