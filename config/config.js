const { SQL_CONFIG } = require("../src/config/config");

module.exports = {
  development: {
    "username": SQL_CONFIG.user,
    "password": SQL_CONFIG.pwd,
    "database": SQL_CONFIG.dbname,
    "host": SQL_CONFIG.host,
    "dialect": `${SQL_CONFIG.dialect}`
  },
  test: {
    "username": SQL_CONFIG.user,
    "password": SQL_CONFIG.pwd,
    "database": SQL_CONFIG.dbname,
    "host": SQL_CONFIG.host,
    "dialect": `${SQL_CONFIG.dialect}`
  },
  production: {
    "username": SQL_CONFIG.user,
    "password": SQL_CONFIG.pwd,
    "database": SQL_CONFIG.dbname,
    "host": SQL_CONFIG.host,
    "dialect": `${SQL_CONFIG.dialect}`
  }
}
