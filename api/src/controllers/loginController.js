const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Modelo de usuario
const User = require('../models/Users');

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

// Iniciar sesión
router.post('login',  
passport.authenticate('local', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});

module.exports = router;
