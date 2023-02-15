const {Game, User} = require('../db')



const gameInitController = async(id, user_id) => {
    console.log('game',id, 'user',user_id)
      try {
          
      
          const game = await Game.findByPk(id);
      
          if (!game) {
            return 'Partida no encontrada';
          }
          const usr = await User.findAll({were: {id: user_id}})
            await game.addUser(usr)
      
          return game;
        } catch (err) {
          console.error(err.message);
          return 'Error al unirse a la partida'
        }

  }


  module.exports = {
    gameInitController
  }