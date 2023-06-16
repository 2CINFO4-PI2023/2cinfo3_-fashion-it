const Publication = require('../models/publicationModel');
const TypePublication = require('../models/typePublicationModel');

// Get all publications
exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find().populate('type');
    res.json(publications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single publication by ID
exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id).populate('type');
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new publication
exports.createPublication = async (req, res) => {
  try {
    const { title, content, type } = req.body;

    // Check if the type_publication exists
    const typePublication = await TypePublication.findById(type);
    if (!typePublication) {
      return res.status(404).json({ error: 'Type publication not found' });
    }

    const newPublication = new Publication({ title, content, type });
    const savedPublication = await newPublication.save();

    // Add the publication to the type_publication's publications array
    typePublication.publications.push(savedPublication._id);
    await typePublication.save();

    res.status(201).json(savedPublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing publication by ID
exports.updatePublication = async (req, res) => {
  try {
    const { title, content, type } = req.body;

    // Check if the type_publication exists
    const typePublication = await TypePublication.findById(type);
    if (!typePublication) {
      return res.status(404).json({ error: 'Type publication not found' });
    }

    const updatedPublication = await Publication.findByIdAndUpdate(
      req.params.id,
      { title, content, type },
      { new: true }
    );

    if (!updatedPublication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    res.json(updatedPublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a publication by ID
exports.deletePublication = async (req, res) => {
  try {
    const deletedPublication = await Publication.findByIdAndRemove(req.params.id);
    if (!deletedPublication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    // Remove the publication from the associated type_publication's publications array
    const typePublication = await TypePublication.findById(deletedPublication.type);
    if (typePublication) {
      typePublication.publications.pull(deletedPublication._id);
      await typePublication.save();
    }

    res.json(deletedPublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
