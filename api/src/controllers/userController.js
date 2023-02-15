const {User} = require('../db')




const updateUser = async(id, user) => {
    const {name, username, score, games } = user;
    try {
        const [affectedRows] = await Users.update({
            name,
            username,
            score,
            games
        }, {
            where: {
                id
            }
        });

        if (affectedRows > 0) {
            return 'User updated successfully';
        } else {
            return 'User not found';
        }
    } catch (error) {
        return 'Error updating user';
    }
}

const getUser = async(id) => {
    const user = await User.findByPk(id)
    return user
}




module.exports = {
    updateUser,
    getUser
}