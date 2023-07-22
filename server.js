require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportSetup = require('./middlewares/passport')
const userRoute = require ('./routes/userRoute')
const roleRoute = require ('./routes/roleRoute')
const authRoute = require ('./routes/auth');
const roleInit = require('./services/roleInit');


// CONNECTION
mongoose.connect(process.env.DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('DB connection error:', err);
});

db.once('open', () => {
  console.log('DB connected successfully');
});

// APP
const app = express();
const port = process.env.PORT;
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
  origin: `http://localhost:4200`,
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: false
}));
//Role Init 
roleInit();
// SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//EndPoints
app.use('/api/user',userRoute)
app.use('/api/role',roleRoute)
app.use('/api/',authRoute)
