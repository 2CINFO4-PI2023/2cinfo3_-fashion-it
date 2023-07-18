const mongoose = require('mongoose');

const typePublicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'publication have no type'
  },
  publications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publication'
    }
  ]
});

const TypePublication = mongoose.model('TypePublication', typePublicationSchema);

module.exports = TypePublication;
