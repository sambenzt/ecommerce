const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../connection')


const Product = sequelize.define(
  'products',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  {
    timestamps: false
  },
);

module.exports = Product