import express from 'express'
import { getAll, addOnce, getOnce, putOnce, deleteOnce } from '../controllers/categorie.js';



const router = express.Router();
router
.route('/') 
.get(getAll)// pour récupérer toutes les catégories
.post(addOnce); // pour ajouter une catégorie

router 
.route('/:id')
.get(getOnce) // pour récupérer une catégorie par son ID
.put(putOnce) // pour mettre à jour une catégorie par son ID
.delete(deleteOnce); // pour supprimer une catégorie par son ID


export default router; 