import express from 'express';

import { addOnce , getAll , deleteOnce , patchOnce , getCommandesByLivreur } from '../controllers/livreur.js';

const router = express.Router();

router
  .route('/')
  .post(addOnce)
  .get(getAll);
  router
  .route('/:_id')
  
  .delete(deleteOnce)
  .patch(patchOnce)
  .get(getCommandesByLivreur);

 

  
  
  

  



export default router;