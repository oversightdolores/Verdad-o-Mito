
const {Game, User, GameUser} = require('../db');


const createGame = async(name) => {
    console.log(name)
    try {
        // Insertar nueva partida en la base de datos
        const result = await Game.create({
          name: name
        })
    
        return result;
      } catch (err) {
        console.error(err.message);
        return 'Error al crear nueva partida'
      }
}

const getGame = async(id) => {
    console.log(id)
    const game = await Game.findByPk(id);
    const users = await game.getUsers();
    console.log(users);
      
return users
}


module.exports = {
    createGame,
    getGame
}