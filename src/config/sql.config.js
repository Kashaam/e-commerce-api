const {Sequelize} = require('sequelize');
const { SQL_CONFIG } = require('./config');


const sequelize = new Sequelize(SQL_CONFIG.dbname, SQL_CONFIG.user, SQL_CONFIG.pwd, {
    dialect: SQL_CONFIG.dialect,
    port: SQL_CONFIG.port,
    host: SQL_CONFIG.host
})


const authenticateSql = async() =>{
    try{
        await sequelize.authenticate()
    }catch(exception){
        throw exception
    }
}


module.exports = {
    sequelize,
    authenticateSql
};