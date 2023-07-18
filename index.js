// index.js
const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const typeEventRoutes = require('./routes/typeEventRoutes');

const userRoutes = require('./routes/userRoutes');



// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/fashionit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Set up routes
    app.use('/events', eventRoutes);
    app.use('/type-events', typeEventRoutes);
app.use('/users', userRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  const app = express();
  const port = 3000;
  
  // Parse JSON request bodies
  app.use(express.json());