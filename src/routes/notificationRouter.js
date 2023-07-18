const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
router.get('/', notificationController.getAllNotifications);
router.get('/:id', notificationController.getNotificationById);
router.post('/', async (req, res) => {
  try {
    const { userId, message } = req.body;

    await notificationController.createNotification(userId, message);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Failed to create notification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
