const mongoose = require('mongoose');

const deletedCategorieSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      }
}
);

const DeletedCategorieProduit = mongoose.model('DeletedCategorieProduit', deletedCategorieSchema);

module.exports = DeletedCategorieProduit;
