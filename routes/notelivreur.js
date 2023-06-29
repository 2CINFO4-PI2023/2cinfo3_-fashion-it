import express from 'express';

import { addNoteLivreur  } from '../controllers/notelivreur.js';
import { getLivreurStatistics , getLivreurList } from '../controllers/livreur.js';

const router = express.Router();

router
  .route('/')
  .post(addNoteLivreur)
  .get(getLivreurStatistics);

router
  .route('/livreurs')
  .get(getLivreurList);

  

  export default router;