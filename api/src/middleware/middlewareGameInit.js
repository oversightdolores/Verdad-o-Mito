const {gameInitController} = require('../controllers/gameInitController')


const middGameInit = async(id, user_id) => {
    try {
        const gameInit = await gameInitController(id, user_id)
        return gameInit
    } catch (error) {
        return error
    }
}


module.exports = {
    middGameInit
}