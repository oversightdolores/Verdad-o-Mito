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
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      given_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      family_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      locale: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
       
      },
    
    },
    {timestamps: false}
    );
  };
  