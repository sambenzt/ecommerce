const dotenv = require('dotenv')
dotenv.config()
const { Sequelize } = require("sequelize");

const config = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
}

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config);

module.exports = { sequelize }