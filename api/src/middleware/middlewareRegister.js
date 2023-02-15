const {registerController} = require('../controllers/registerController')


const createUser = async(newUser) => {
        console.log('middle', newUser)
        try{
        const create = await registerController(newUser)
        return create
        }catch (err){
                return err
        }
    
}

module.exports = {
        createUser
}