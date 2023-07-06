const Notification = require('../models/notificationModel');

// Get all notifications for a user
exports.getAllNotifications = async (req, res) => {
  try {
    const { userId } = req.query;

    const notifications = await Notification.find({ userId });

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createNotification = async (userId, message) => {
  try {
    const newNotification = new Notification({
      userId,
      message,
    });

    await newNotification.save();
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};
