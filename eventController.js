// controllers/eventController.js
const Event = require('../models/event');
const Reservation = require('../models/reservation');
const User = require('../models/user');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('type');
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('type');
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};// Make a reservation for an event
exports.makeReservation = async (req, res) => {
  try {
    const eventId = req.body.eventId;
    const userId = req.body.userId;
    const numberOfPlaces = req.body.numberOfPlaces;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if the event has available places for reservation
    if (event.availablePlaces <= 0) {
      return res.status(400).json({ error: 'No available places for reservation' });
    }

    // Check if the number of places requested exceeds the available places
    if (numberOfPlaces > event.availablePlaces) {
      return res.status(400).json({ error: 'Number of places requested exceeds available places' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has already made a reservation for this event
    const existingReservation = user.reservations.find(
      (reservation) => reservation.event.toString() === eventId
    );
    if (existingReservation) {
      return res.status(400).json({ error: 'User has already made a reservation for this event' });
    }

    // Make the reservation
    const reservation = {
      event: eventId,
      numberOfPlaces: numberOfPlaces
    };
    user.reservations.push(reservation);
    event.availablePlaces -= numberOfPlaces;

    // Save the updated user and event
    await user.save();
    await event.save();

    res.json({ message: 'Reservation made successfully', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has a reservation for this event
    const existingReservation = user.reservations.find(
      (reservation) => reservation.event.toString() === eventId
    );
    if (!existingReservation) {
      return res.status(400).json({ error: 'User does not have a reservation for this event' });
    }

    // Remove the reservation
    user.reservations = user.reservations.filter(
      (reservation) => reservation.event.toString() !== eventId
    );
    event.availablePlaces += existingReservation.numberOfPlaces;

    // Save the updated user and event
    await user.save();
    await event.save();

    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(201).json(  { message: 'Reservation deleted successfully' } );
  }
};

// Search reservations by event ID
exports.searchReservationsByEventId = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Find reservations for the event
    const reservations = await Reservation.find({ event: eventId }).populate('user', 'name');

    res.json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};


// Search events based on criteria
exports.searchEvents = async (req, res) => {
  try {
    const { name, type, date } = req.query;

    // Build the search query based on the provided criteria
    const searchQuery = {};
    if (name) {
      searchQuery.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    if (type) {
      searchQuery.type = type;
    }
    if (date) {
      searchQuery.date = { $gte: new Date(date) }; // Search for events on or after the provided date
    }

    // Execute the search query
    const events = await Event.find(searchQuery).populate('type');
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
