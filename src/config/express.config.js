const express = require('express');
const {authenticateSql} = require('./sql.config')
authenticateSql();

const router = require('./router.config');
const { MulterError } = require('multer');
const { deleteFile } = require('../utilities/helper');
const cors = require('cors');
const helmet = require('helmet');
const {rateLimit} = require('express-rate-limit');

require('./mongodb.config');

const app = express();

//cors
app.use(cors({
    origin: "*"     //for any domain
}));

app.use(helmet());

app.use(rateLimit({
    windowMs: 60000,
    limit: 30
}))        //this means 30 request per minutes

// add parser 
app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded());

app.use('/api/v1', router);




app.use((err, req, res, next)=>{
    let code = err.code || 500;
    let message= err.message || "Internal server error........";
    let status = err.status || "SERVER_ERROR.......";
    let detail = err.detail || null;


   
    if(req.file){
        deleteFile(req.file.path);
    }else if(req.files){
        req.files.map((file)=>{
            deleteFile(file.path);
        })
    }

     if(err.name === "MongoServerError"){
        if(+err.code === 11000){
            msg = "Validation Failed",
            code= 400,
            status = "VALIDATION_FAILED"
    
            detail = {};
    
            (Object.keys(err.keyValue)).map((key)=>{
                detail[key] = `${key} should be unique`
            })
        }
    }


    if(err.name === MulterError){
        code = 422;
    }


    res.status(code).json({
        error: detail,
        message: message,
        status: status,
        options: null
    })
})

module.exports = app;