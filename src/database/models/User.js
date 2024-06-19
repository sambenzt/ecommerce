const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../connection')

const User = sequelize.define(
  'users',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    timestamps: false
  },
);

module.exports = User