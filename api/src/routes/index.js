const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const axios = require('axios');
const registro = require('../controllers/registerController')
const login = require('../controllers/loginController')
const question = require('./questionsRoutes')



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/registro', registro);
router.use('/login',login);
router.use('/question',question);





module.exports = router;