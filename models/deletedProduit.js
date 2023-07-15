import mongoose from 'mongoose';

const deletedProduitSchema = new mongoose.Schema({
  produitId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const DeletedProduit = mongoose.model('DeletedProduit', deletedProduitSchema);

export default DeletedProduit;
