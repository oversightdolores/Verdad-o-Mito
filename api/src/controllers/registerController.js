// routes/register.js
const {User} = require('../db');


const registerController = async(newUser) => {
  console.log(newUser)
  const { email, password} = newUser ;
    try {
        const [user, created] = await User.findOrCreate({
          where: {
            email: email
          },
          defaults: {
            email: email,
            password: password
          }
        });
        if (created) {
          return{ message: 'User created successfully',user };
        } else {
          return{ message: 'User already exists' };
        }
      } catch (error) {
        return{ message: 'An error occurred' };
      }
     
};


module.exports = registerController