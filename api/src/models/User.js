const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
  
      name: {
        type: DataTypes.STRING,
       
        
      },
      nickname: {
        type: DataTypes.STRING,
       
        unique: true
      },
      given_name: {
        type: DataTypes.STRING,
       
        
      },
      family_name: {
        type: DataTypes.STRING,
       
        
      },
      email: {
        type: DataTypes.STRING,
       
        unique: true,
      },
      locale: {
        type: DataTypes.STRING,
       
        
      },
      picture: {
        type: DataTypes.STRING,
       
        
      },
      password: {
        type: DataTypes.STRING,
       
      }
    },
    {timestamps: false}
    );
  };
  