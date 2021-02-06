// express
const express = require('express');
// routes from controller folder
const routes = require('./controllers');
// sequelize from connection config
const sequelize = require('./config/connection');
// handlebars, and session / connect-session for authentication
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

// regular degular express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});