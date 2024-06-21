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

let sequelize

if(config.dialect === 'postgres') {
    sequelize = new Sequelize(process.env.PG_STRING, {
        dialect: 'postgres',
        protocol: 'postgres'
    });
}
else {
    sequelize = new Sequelize(config);
}

module.exports = { sequelize }