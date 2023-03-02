const {  DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('GameUser', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
        gameId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          userId: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: true
          },
         
          
    },
    {timestamps: false}
    );
  };