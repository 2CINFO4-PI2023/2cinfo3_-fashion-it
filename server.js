const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportSetup = require('./middlewares/passport');
const userRoute = require('./routes/userRoute');
const roleRoute = require('./routes/roleRoute');
const authRoute = require('./routes/auth'); // Use require instead of import
const roleInit = require('./services/roleInit');

const app = express();
const port = process.env.PORT || 3300;
const databaseName = 'pi_produit';

// CONNECTION
mongoose.connect(process.env.DBHOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('DB connection error:', err);
});
db.once('open', () => {
    console.log('DB connected successfully');
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'WOLF',
        name: 'session',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

//Role Init
roleInit();

// Middleware for every request
app.use((req, res, next) => {
    console.log('Middleware just ran!');
    next();
});

// Middleware for /gse route
app.use('/gse', (req, res, next) => {
    console.log('Middleware just ran on a gse route!');
    next();
});

// Serve static files from the 'public/images' directory under '/img' route
app.use('/img', express.static('public/images'));

// Routes from the first server.js
app.use('/api/user', userRoute);
app.use('/api/role', roleRoute);
app.use('/api/', authRoute);

// Routes from the second server.js
const categorieRoutes = require('./routes/categorie.js');
const produitRoutes = require('./routes/produit.js');

app.use('/categorie', categorieRoutes);
app.use('/produit', produitRoutes);

// Middleware for handling 404 Not Found errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Middleware for handling errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

// SERVER
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
