// controllers/typeEventController.js
const TypeEvent = require('../models/type_event');
const History = require('../models/history');
const Event = require('../models/event');
// Get all type_events
exports.getAllTypeEvents = async (req, res) => {
  try {
    const typeEvents = await TypeEvent.find();
    res.json(typeEvents);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new type_event
exports.createTypeEvent = async (req, res) => {
  try {
    const typeEvent = new TypeEvent(req.body);
    await typeEvent.save();
    res.status(201).json(typeEvent);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// Get a single type_event by ID
exports.getTypeEventById = async (req, res) => {
  try {
    const typeEvent = await TypeEvent.findById(req.params.id);
    if (!typeEvent) {
      return res.status(404).json({ error: 'Type event not found' });
    }
    res.json(typeEvent);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a type_event by ID
exports.updateTypeEvent = async (req, res) => {
  try {
    const typeEvent = await TypeEvent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!typeEvent) {
      return res.status(404).json({ error: 'Type event not found' });
    }
    res.json(typeEvent);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// Delete a type_event by ID
exports.deleteTypeEvent = async (req, res) => {
  try {
    const typeEvent = await TypeEvent.findByIdAndRemove(req.params.id);
    if (!typeEvent) {
      return res.status(404).json({ error: 'Type event not found' });
    }

    // Create a history entry for the deleted type_event
    const historyEntry = new History({
      name: typeEvent.name,
      description: typeEvent.description,
      events: typeEvent.events
    });
    await historyEntry.save();

    // Delete the associated type from events and set the type to "no type"
    await Event.updateMany({type: typeEvent._id }, { type: 'this event has no type' });

    res.json({ message: 'Type event deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
