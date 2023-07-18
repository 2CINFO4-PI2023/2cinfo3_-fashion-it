require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: '244000347017-18rv372tsoklaqaj9flcsn3oupl9lgva.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope:['email','profile']
    },
    function(accessToken, refreshToken, profile, cb) {
    cb(null,profile);
    }
  )
);

// Other passport configuration and middleware setup
// ...


// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/api/google/callback',
//     scope:['email','profile']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//   cb(null,profile);
//   }
// ));

passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})
