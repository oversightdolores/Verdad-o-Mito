const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('questions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
  
      question: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      response: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false
       
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {timestamps: false}
    );
  };
  
  //como le agrego a la propiedad de un model de sequelize bollean por default true 