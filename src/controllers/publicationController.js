const Publication = require('../models/publicationModel');
const TypePublication = require('../models/typePublicationModel');
const User = require('../models/userModel');
// Get all publications
exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find().populate('typePublication');
    const formattedPublications = publications.map(publication => ({
      _id: publication._id,
      title: publication.title,
      content: publication.content,
      type: publication.typePublication.name,
      userId: publication.userId,
      status : publication.status,
      comments: publication.comments,
      ratings: publication.ratings
    }));
    res.json(formattedPublications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single publication by ID
exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id).populate('typePublication');
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }
    const formattedPublication = {
      _id: publication._id,
      title: publication.title,
      content: publication.content,
      type: publication.typePublication.name,
      userId: publication.userId,
      status : publication.status,
      comments: publication.comments,
      ratings: publication.ratings
    };
    res.json(formattedPublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new publication
exports.createPublication = async (req, res) => {
  try {
    const { title, content, type, userId, status } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newPublication = new Publication({ title, content, type, userId, status });
    const savedPublication = await newPublication.save();

    // Add the publication to the associated type_publication's publications array
    const typePublication = await TypePublication.findById(type);
    if (typePublication) {
      typePublication.publications.push(savedPublication._id);
      await typePublication.save();
    }

    res.status(201).json(savedPublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing publication by ID
exports.updatePublication = async (req, res) => {
  try {
    const { title, content, type, userId, status } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedPublication = await Publication.findByIdAndUpdate(
      req.params.id,
      { title, content, type, userId, status },
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
// Create a new comment for a publication
exports.createComment = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const publicationId = req.params.id;

    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    const newComment = {
      user: userId,
      content: content,
    };

    publication.comments.push(newComment);
    const savedPublication = await publication.save();

    res.status(201).json(savedPublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a five-star rating to a publication
exports.addRating = async (req, res) => {
  try {
    const { userId, rating } = req.body;
    const publicationId = req.params.id;

    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    const newRating = {
      user: userId,
      rating: rating,
    };

    publication.ratings.push(newRating);
    const savedPublication = await publication.save();

    res.status(201).json(savedPublication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
