const Publication = require('../models/publicationModel');
const TypePublication = require('../models/typePublicationModel');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');
const notificationController = require('./notificationController');
const fetch = require('isomorphic-fetch');


exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.aggregate([
      {
        $lookup: {
          from: 'typepublications',
          localField: 'type',
          foreignField: '_id',
          as: 'typePublication'
        }
      },
      {
        $addFields: {
          type: {
            $cond: {
              if: { $eq: ['$typePublication', []] },
              then: 'publication has no type',
              else: '$typePublication.name'
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          type: 1,
          userId: 1,
          status: 1,
          comments: 1,
          ratings: 1
        }
      }
    ]);

    res.json(publications);
  } catch (error) {
    console.error(error);
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

   // Analyze the publication content
   const analysisResult = await analyzeText(content);
    const newPublication = new Publication({ title, content, type, userId, status });
    const savedPublication = await newPublication.save();
// Create a notification for the publication
await notificationController.createNotification(userId, 'A new publication has been created.');

    // Add the publication to the associated type_publication's publications array
    const typePublication = await TypePublication.findById(type);
    if (typePublication) {
      typePublication.publications.push(savedPublication._id);
      await typePublication.save();
    }
  
    res.status(201).json({ ...savedPublication._doc, ...analysisResult });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ error: error.message || 'Internal server error' });
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

   // Analyze the publication content
   const analysisResult = await analyzeText(content);

    const updatedPublication = await Publication.findByIdAndUpdate(
      req.params.id,
      { title, content, type, userId, status },
      { new: true }
    );
    if (!updatedPublication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

   
    res.json({ ...updatedPublication._doc, ...analysisResult });
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



// Delete a publication by ID
exports.deletePublication = async (req, res) => {
  try {
    const deletedPublication = await Publication.findByIdAndRemove(req.params.id);
    if (!deletedPublication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    // Remove the publication from the associated type_publication's publications array
    const typePublication = await TypePublication.findById(deletedPublication.type);
    if(typePublication) {
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
    // Create a notification for the comment
    await notificationController.createNotification(userId, 'A new comment has been added to a publication.');

// Analyze the publication content
const analysisResult = await analyzeText(content);
    const newComment = {
      user: userId,
      content: content,
    };

    publication.comments.push(newComment);
    const savedPublication = await publication.save();

    res.status(201).json({ ...savedPublication._doc, ...analysisResult });
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


async function analyzeText(textContent) {
  try {
    const apiKey = '7iq1yIofZv7a7XiyB2SwcjBqhWk56FYm'; // Replace with your API key from apilayer

    const myHeaders = {
      'apikey': apiKey
    };

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: textContent
    };

    const response = await fetch("https://api.apilayer.com/bad_words?censor_character=", requestOptions);
    const result = await response.json();

    // Process the result as needed

    console.log(result); // Output the result to the console
if (result.bad_words_total>0){
  return {
    isContentAppropriate: false, // Modify as needed
      message: 'The content  is inappropriate , contains bad words',
      result
  };
}else{
    // Return the appropriate response based on the analysis
    return {
      isContentAppropriate: true, // Modify as needed
      message: 'The content  is appropriate', 
      result// Modify as needed
    };}
  } catch (error) {
    console.error('Failed to analyze text:', error);
    // Return an object with appropriate false and an error message
    return {
      isContentAppropriate: false,
      message: 'Failed to analyze the text. Please try again later.'
    };
  }
}
