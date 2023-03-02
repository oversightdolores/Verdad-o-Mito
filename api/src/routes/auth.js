const express = require('express');
const passport = require('passport');
const registerController = require('../controllers/registerController');
const router = express.Router();

const { Server } = require("socket.io");




router.post('/register', async(req, res, next) => {
  const newUser = req.body;
 
  try {
  const create = await registerController(newUser)
  
    console.log(create)
    res.status(200).json(create) 
  } catch (error) {
    res.status(400).send(error)
  }


 
});

// Ruta de inicio de sesión
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  res.json({ user: req.user });
}); 

module.exports = router;
