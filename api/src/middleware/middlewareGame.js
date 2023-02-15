const {createGame} = require('../controllers/gameController')



const middGame = async(name) => {
    try {
        const game = await createGame(name)
        return game
    } catch (error) {
        return error
    }
}


module.exports = {
    middGame
}