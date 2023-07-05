const passport = require ('passport');
const express = require ('express');

const app = express();

require('./controllers/oAuth2Controller')


app.get('auth/google',passport.authenticate('google',{scope:['email','profile']}));

app.get('/',(req,res)=>{
    res.send('<a href="/auth/google"> Google </a>')
})