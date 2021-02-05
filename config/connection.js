// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
// get .env credentials
require('dotenv').config();
// init seq var
let sequelize;

//if has db server info (from heroku) then use that else use local db and server
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;