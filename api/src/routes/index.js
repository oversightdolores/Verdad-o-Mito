const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const question = require('./questionsRoutes')
const auth = require('./auth')
const game = require('./game')
const userRoutes = require('./userRoutes')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', auth);
router.use('/user', userRoutes)
router.use('/question',question);
router.use('/', game)







module.exports = router;