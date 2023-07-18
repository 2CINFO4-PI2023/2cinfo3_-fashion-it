const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportSetup = require('./middlewares/passport')

const roleInit = require('./services/roleInit');
// import routes
const userRoute = require ('./routes/userRoute')
const roleRoute = require ('./routes/roleRoute')
const authRoute = require ('./routes/auth');
const typePublicationRoutes = require('./routes/typePublicationRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const notificationRouter = require('./routes/notificationRouter');
const TypeRoutes = require('./routes/typereclamationRouter');
const reclamation = require('./routes/reclamationRouter');
const livreurRoutes = require('./routes/livreurRouter');
const commandeRoutes = require('./routes/commnadeRouter');
const notelivreurRoutes = require('./routes/notelivreurRouter');
const produitRoutes = require('./routes/produitRouter');
const categorieProduitRoutes = require('./routes/categorieProduitRouter');
const eventRoutes = require('./routes/eventRoutes');
const typeEventRoutes = require('./routes/typeEventRoutes');
require('./utils/db');
const app = express();
const port = process.env.PORT;
// Middleware
app.use(express.json());
app.use(cors());
// APP

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'WOLF', // Set a secret key for session encryption
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // Adjust the expiration time as needed
    }
  })
);

app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
  origin: `http://localhost:${port}`,
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: false
}));
//Role Init 
roleInit();
// SERVER
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// publication
app.use('/type_publication', typePublicationRoutes);
app.use('/publication', publicationRoutes);
app.use('/notifications', notificationRouter);
//user
app.use('/api/user',userRoute)
app.use('/api/role',roleRoute)
app.use('/api/',authRoute)
// reclamation
app.use('/typereclamation',TypeRoutes);
app.use('/reclamation',reclamation);
// livraison 
app.use('/livreurs', livreurRoutes);
app.use('/commande', commandeRoutes);
app.use('/notelivreur', notelivreurRoutes);
// produit
app.use('/categorie' , categorieProduitRoutes);
app.use('/produit' , produitRoutes);
// event 
app.use('/events', eventRoutes);
    app.use('/type-events', typeEventRoutes);


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
