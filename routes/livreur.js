import express from 'express';

import { addOnce , getAll , deleteOnce , patchOnce
} from '../controllers/livreur.js';

const router = express.Router();

router
  .route('/')
  .post(addOnce)
  .get(getAll);

  router
  .route('/:Nom')
  
  .delete(deleteOnce)
  .patch(patchOnce);

  



export default router;