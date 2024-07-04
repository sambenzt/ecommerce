const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../connection')

const Order = sequelize.define(
  'orders',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
  },
  {
    timestamps: false
  },
);

module.exports = Order