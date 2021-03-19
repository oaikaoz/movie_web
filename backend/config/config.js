const dotenv = require("dotenv")
//.config();
dotenv.config({ path: "./../.env" });

module.exports = {
  development: {
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    db_port: process.env.DB_PORT,
  },
  production: {
    port: process.env.PORT_PROD,
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: process.env.DB_DIALECT_PROD,
    db_port: process.env.DB_PORT_PROD,
  },
};