const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('../models/role');  // Import the Role model


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        enum: ['femme', 'homme'],
        default: 'homme'
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    },
    premium:{
        type:Boolean,
        default:'no'
    },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notification'
    }
  ]
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
