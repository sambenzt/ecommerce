const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../connection');
const { product } = require('../../controllers/auth.controller');

const OrderItem = sequelize.define(
  'order_items',
  {
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false
  },
);

module.exports = OrderItem