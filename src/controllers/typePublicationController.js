const TypePublication = require('../models/typePublicationModel');

// Get all type_publications
exports.getAllTypePublications = async (req, res) => {
  try {
    const typePublications = await TypePublication.find();
    res.json(typePublications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single type_publication by ID
exports.getTypePublicationById = async (req, res) => {
  try {
    const typePublication = await TypePublication.findById(req.params.id);
    if (!typePublication) {
      return res.status(404).json({ error: 'Type publication not found' });
    }
    res.json(typePublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new type_publication
exports.createTypePublication = async (req, res) => {
  try {
    const { name } = req.body;
    const newTypePublication = new TypePublication({ name });
    const savedTypePublication = await newTypePublication.save();
    res.status(201).json(savedTypePublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing type_publication by ID
exports.updateTypePublication = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedTypePublication = await TypePublication.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedTypePublication) {
      return res.status(404).json({ error: 'Type publication not found' });
    }
    res.json(updatedTypePublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a type_publication by ID
exports.deleteTypePublication = async (req, res) => {
  try {
    const deletedTypePublication = await TypePublication.findByIdAndRemove(
      req.params.id
    );
    if (!deletedTypePublication) {
      return res.status(404).json({ error: 'Type publication not found' });
    }
    res.json(deletedTypePublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
