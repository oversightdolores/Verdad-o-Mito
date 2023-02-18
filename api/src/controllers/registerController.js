// routes/register.js
const {User} = require('../db');


const registerController = async(newUser) => {
  console.log('/',newUser)
  const { user_id, email, nickname, picture, name} = newUser ;
    try {
        const user = await User.create({
            user_id: user_id,
            name: name,
            email: email,
            nickname: nickname,
            picture: picture
          
        });
       
        return user
      } catch (error) {
        throw new Error
      }
     
};


module.exports = registerController