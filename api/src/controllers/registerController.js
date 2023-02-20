// routes/register.js
const {User} = require('../db');


const registerController = async(newUser) => {
  console.log(newUser)
  const { sub} = newUser ;
    try {
        const [created] = await User.findOrCreate({
          where: {
            user_id: sub
          },
          defaults: {
           
              user_id: newUser.user_id,
              name: newUser.name,
              email: newUser.email,
              nickname: newUser.nickname,
              picture: newUser.picture
            
         
          }
        });
        if (created) {
          return{ message: 'User created successfully' };
        } else {
          return{ message: 'User already exists' };
        }
      } catch (error) {
        return{ message: 'An error occurred' };
      }
     
};


module.exports = registerController