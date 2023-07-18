// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a new event
router.post('/', eventController.createEvent);

// Make a reservation for an event
router.post('/reservation', eventController.makeReservation);

// Get all events
router.get('/', eventController.getAllEvents);

// Get a specific event
router.get('/:id', eventController.getEventById);

router.get('/:id', eventController.getEventById);

// Update an event
router.delete('/reservation/:eventId/:userId', eventController.deleteReservation);


router.get('/reservation/:eventId', eventController.searchReservationsByEventId);

// Delete an event
router.delete('/:id', eventController.deleteEvent);
// Search events
router.get('/search', eventController.searchEvents);


module.exports = router;
