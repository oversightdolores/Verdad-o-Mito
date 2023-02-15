const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('game', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          user_id: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: true
        },
          status: {
            type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
            allowNull: true,
          },
          start_time: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          end_time: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    },
    {timestamps: false}
    );
  };
  