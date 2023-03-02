const { Op } = require('sequelize');
const { User, Game, GameUser } = require('../db');
const router = require('express').Router();

const { Server } = require("socket.io");

const io = new Server();

class UserRepository {
  async findUserById(userId) {
    console.log('player', userId)
    return await User.findOne({ where: { user_id: userId } });
  }
}

class GameRepository {
  async  createGame(nombre, jugadores) {
    
    try {
      const user1 = await User.findByPk(jugadores[0].user_id);
      const user2 = await User.findByPk(jugadores[1]?.user_id);
      
      const game = await Game.create({ name: nombre });
      const userIds = [user1.user_id, user2];
      await game.set({uderId: userIds});
  
      return {
        status: 'success',
        message: 'Juego creado exitosamente',
        data: game,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error,
        data: null,
      };
    }
  }
  
  async findGameById(gameId) {
    return await Game.findByPk(gameId, { include: 'user_Id' });
  }

  async findOpenGames() {
    const gamesWithUsers = await Game.findAll({
      include: 'user_Id',
      attributes: ['id'],
    });

    const gameIdsWithUsers = gamesWithUsers?.map(game => game.id);

    return await Game.findAll({
      where: {
        id: {
          [Op.notIn]: gameIdsWithUsers,
        },
        jugadores: {
          [Op.lt]: 2,
        },
      },
    });
  }

  async findGameUsersByGameId(gameId) {
    return await GameUser.findAll({
      include: 'user_Id',
      where: {
        gameId: gameId,
      },
    });
  }
}

const userRepository = new UserRepository();
const gameRepository = new GameRepository();

io.on('connection', (socket) => {
  console.log(`Cliente ${socket.id} conectado`);
  
  socket.on('crearPartida', async ({ userId, partidaNombre }) => {
    try {
      const user = await userRepository.findUserById(userId);

      if (!user) {
        throw new Error(`Usuario con ID ${userId} no encontrado`);
      }
      
      const jugadores = [user];
      
      const game = await gameRepository.createGame(partidaNombre, jugadores.map(jugador => jugador.dataValues));
      const partidaId = game.data;
      const response = {
        partidaId,
        user
      };
      console.log(game)
      socket.join(`partidas${game.data.gameId}`);
      socket.emit('partidaCreada',  response );
    } catch (error) {
      console.error(error);
      socket.emit('error', { message: error.message });
    }
  });


  socket.on('unirsePartida', async ({ userId, partidaId }) => {
    try {
      const user = await userRepository.findUserById(userId);

      if (!user) {
        throw new Error(`Usuario con ID ${userId} no encontrado`);
      }

      const game = await gameRepository.findGameById(partidaId);
      
      if (!game) {
        throw new Error(`Partida con ID ${partidaId} no encontrada`);
      }

      if (game.userId.length >= 2) {
        throw new Error(`La partida ${partidaId} ya está completa`);
      }

      const gameUser = await GameUser.create({
        user_id: user.user_id,
        game_id: game.id
      });

      socket.join(`partidas${game.id}`);
      socket.emit('partidaUnida', { partidaId: game.id });
    } catch (error) {
      console.error(error);
      socket.emit('error', error)
    }

  })

  
})
io.listen(3006);


// Obtener todas las partidas creadas
router.get('/partidas', async (req, res) => {
  try {
    const openGames = await gameRepository.findOpenGames();
    res.json({
      status: 'success',
      message: 'Partidas obtenidas exitosamente',
      data: openGames,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'No se pudieron obtener las partidas',
      data: null,
    });
  }
});

// Unirse a una partida
router.post('/partidas/:id/unirse', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error(`Usuario con ID ${userId} no encontrado`);
    }

    const game = await gameRepository.findGameById(id);

    if (!game) {
      throw new Error(`Partida con ID ${id} no encontrada`);
    }

    if (game.userId.length >= 2) {
      throw new Error(`La partida ${id} ya está completa`);
    }

    const gameUser = await GameUser.create({
      user_id: user.user_id,
      game_id: game.id
    });

    res.json({
      status: 'success',
      message: 'Usuario unido a la partida exitosamente',
      data: null,
    });

    io.to(`partidas${game.id}`).emit('usuarioUnido', { partidaId: game.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message,
      data: null,
    });
  }
});

/* 
const router = require('express').Router();
const {middGame}=require('../middleware/middlewareGame');
const {middGameInit}=require('../middleware/middlewareGameInit');
const {getGame} = require('../controllers/gameController');
const socketio = require('socket.io');



router.post('/game', async (req, res) => {
  const { name } = req.body;
  
  
  try {
    // Insertar nueva partida en la base de datos
    const result = await middGame(name);

    // Emitir evento "new-game" a los clientes conectados a la ruta "/game/:id"
   // io.of('/game/' + result.id).emit('new-game', { gameId: result.id, userId: result.userId });

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
    const game = await middGameInit(id, user_id);

    // Buscar la partida en la base de datos y guardar el segundo usuario
    const result = await getGame(id);
    const player1 = result.user_id;
    const player2 = user_id;
    // Emitir evento "join-game" a los clientes conectados a la ruta "/game/:id"
  //  io.of('/game/' + id).emit('join-game', { gameId: id, player1, player2 });

    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al unirse a la partida');
  }
});

router.get('/game/:id', async (req, res) => {
  const {id} = req.params;
  console.log(id);
  try {
    const result = await getGame(id);

    // Emitir evento "get-game" a los clientes conectados a la ruta "/game/:id"
  //  io.of('/game/' + id).emit('get-game', { gameId: id });

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al obtener la partida');
  }
});

*/
module.exports = router;