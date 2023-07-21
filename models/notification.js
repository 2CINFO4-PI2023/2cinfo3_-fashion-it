const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const notificationSchema = new Schema(
    {
        produitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produit',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
