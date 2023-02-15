const {updateUser, getUser} = require('../controllers/userController')




const middleUser = async(is,user) => {
    try {
        const middUser = await updateUser(is,user)
        return middUser
    } catch (error) {
        throw error
    }
}

const middGetUser = async(id) => {
    try {
        const user = await getUser(id)
        return user
    } catch (error) {
        return error 
    }
}
module.exports = {
    middleUser,
    middGetUser
}