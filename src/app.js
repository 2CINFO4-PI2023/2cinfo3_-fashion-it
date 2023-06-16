const express = require('express');
const app = express();
const typePublicationRoutes = require('./routes/typePublicationRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
require('./utils/db');

// Middleware
app.use(express.json());

// Routes
app.use('/type_publication', typePublicationRoutes);
app.use('/publication', publicationRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
