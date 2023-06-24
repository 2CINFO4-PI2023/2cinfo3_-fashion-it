const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: mongoose.Schema.Types.String,
    ref: 'TypePublication',
    required : true 
   
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['public', 'private', 'specific'],
    default: 'public'
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String
      }
    }
  ],
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      }
    }
  ]
});
publicationSchema.virtual('typePublication', {
  ref: 'TypePublication',
  localField: 'type',
  foreignField: '_id',
  justOne: true
});

publicationSchema.set('toObject', { virtuals: true });
publicationSchema.set('toJSON', { virtuals: true });

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
