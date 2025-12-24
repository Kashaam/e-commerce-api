const mongoose = require('mongoose');
const { DbConfig } = require('./config');


// IIIFE: Immediately Invoked Function Expression
(async()=>{
    try{
        await mongoose.connect(DbConfig.dbUrl, {
            dbName: DbConfig.dbName,
            autoCreate: true,
            autoIndex: true
        })
        console.log("************MongoDb connected successfully************");
    }catch(exception){
        console.log("**************Error connecting mongoDB**************");
        process.exit(1);
    }
}) ();


