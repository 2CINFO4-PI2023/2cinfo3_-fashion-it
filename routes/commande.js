import express from 'express';

import { addOnce , getAll , patchOnce , deleteOnce , afficherCarteCommande} from '../controllers/commande.js';

const router = express.Router();

router
  .route('/')
  .post(addOnce)
  .get(getAll);

  router
  .route('/:_id')
  
  .delete(deleteOnce)
  .patch(patchOnce)
  .get(afficherCarteCommande);


 

  



export default router;