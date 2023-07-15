import Notification from '../models/notification.js';

export function createNotification(req, res) {
  const { id } = req.params; // ID du produit lié à la notification
  const { message } = req.body; // Message de la notification

  const newNotification = new Notification({
    produitId: id,
    message,
  });

  newNotification
    .save()
    .then(notification => {
      res.status(200).json(notification);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}
