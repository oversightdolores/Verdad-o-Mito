const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Modelo de usuario
const User = require('../models/Users');

// Crear una nueva cuenta de usuario
router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;
    let errors = [];
    if (!name || !email || !password) {
        errors.push({ msg: 'Por favor llene todos los campos' });
    }
    
    // Comprobar la longitud de la contraseña
    if (password.length < 6) {
        errors.push({ msg: 'La contraseña debe tener al menos 6 caracteres' });
    }
    
    if (errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        // Verificar si el usuario existe
      const user = await  User.findOne({ where: { email } })
            if (user) {
                errors.push({ msg: 'El correo electrónico ya está registrado' });
                res.status(400).json({ errors });
            } else {
                // Encriptar la contraseña antes de guardar en la base de datos
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        User.create({
                            name,
                            email,
                            password: hash
                        })
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
       
    }
    });

module.exports = router;
