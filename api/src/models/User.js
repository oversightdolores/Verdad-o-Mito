const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
  
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
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
        allowNull: true,
        unique: true,
      },
      locale: {
        type: DataTypes.STRING,
        allowNull: true,
        
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
        
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {timestamps: false}
    );
  };
  