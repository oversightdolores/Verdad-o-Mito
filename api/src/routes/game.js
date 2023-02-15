const { Router } = require('express');
const router = Router();
const {middGame}=require('../middleware/middlewareGame');
const {middGameInit}=require('../middleware/middlewareGameInit');
const {getGame} = require('../controllers/gameController')


router.get('/game/:id', async (req, res) => {
    const {id} = req.params
    console.log(id)
   
    try {
  
      // Insertar nueva partida en la base de datos
      const result = await getGame(id)
  
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error al crear nueva partida');
    }
  });

router.post('/game', async (req, res) => {
    const { name } = req.body;
    try {
  
      // Insertar nueva partida en la base de datos
      const result = await middGame(name)
  
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error al crear nueva partida');
    }
  });
  
  router.put('/game/:id', async (req, res) => {
      const { id } = req.params;
      const { user_id } = req.body;
    try {

      const game = await middGameInit(id, user_id)
      

      res.json(game);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error al unirse a la partida');
    }
});

  
module.exports = router;