import express from 'express' ;
import { getAll, addOnce, getOnce, putOnce, deleteOnce,addFavori , searchProduits , createPaymentIntent} from '../controllers/produit.js';
import { createNotification } from '../controllers/notification.js';




import multer from '../middlewares/multer-config.js'; // Importer la configuration de multer

const router =express.Router();
router
.route('/')
.get(getAll) // pour récupérer toutes les produits
.post(
    multer, // Utiliser multer
    addOnce); // pour ajouter un produit 


router 
.route('/:id')
.get(getOnce)// pour récupérer un produit par son ID
.put(putOnce)// pour mettre à jour un produit par son ID
.delete(deleteOnce)// pour supprimer un produit par son ID 

router
.route('/:id/favori')
.put(addFavori); // Ajouter la route pour la méthode addFavori

router
.route('/:id/notification')
.post(createNotification);

router
.route('/search')
.get(searchProduits);



router
.route('/payment-intent')
.post(createPaymentIntent); // Ajoutez cette route pour la création de l'intention de paiement


export default router ; 