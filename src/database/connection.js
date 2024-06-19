const dotenv = require('dotenv')
dotenv.config()
const { Sequelize } = require("sequelize");

const config = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql'
}

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config);

module.exports = { sequelize }