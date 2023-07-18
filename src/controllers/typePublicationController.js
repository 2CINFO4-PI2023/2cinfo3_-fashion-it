const TypePublication = require('../models/typePublicationModel');
const Publication = require('../models/publicationModel');

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
    const typeId = req.params.id;

    // Find all publications of the type being deleted
    const publications = await Publication.find({ type: typeId });

    // Update the type field of the publications to "publication have no type"
    await Publication.updateMany(
      { type: typeId },
      { type: 'publication has no type' }
    );

    // Delete the type publication
    const deletedTypePublication = await TypePublication.findByIdAndRemove(typeId);
    if (!deletedTypePublication) {
      return res.status(404).json({ error: 'Type publication not found' });
    }

    // Remove the type from the publications' type field
    await Promise.all(
      publications.map(publication =>
        Publication.findByIdAndUpdate(publication._id, { type: 'publication has no type'})
      )
    );

    res.json(deletedTypePublication);
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
