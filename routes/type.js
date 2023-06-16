import express from 'express';

import { addType,deleteType,getType,patchType } from '../controllers/type.js';
  
const router = express.Router();

router
    .route('/')
    .post(addType)

router
    .route('/:title')
    .get(getType)
    .delete(deleteType)
    .patch(patchType)
router
    .route('/:typeId')
    .delete(deleteType)

export default router;