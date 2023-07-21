const express = require('express');
const route = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const passportSetup = require('../middlewares/passport');

route.post('/register', authController.register);
route.post('/login', authController.login);
route.post('/password', authController.changePasswordById);
////////////// Google
route.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: `Successfully logged in!`,
            user: req.user,
        });
    } else {
        res.status(403).json({
            error: true,
            message: `Not Authorized`,
        });
    }
});
route.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: `failed to connect`,
    });
});
route.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login/failed',
    })
);
route.get('/google', passport.authenticate('google', ['profile', 'email']));
///////////////
route.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = route;
