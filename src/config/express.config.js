const express = require('express');
const router = require('./router.config');
const { deleteFile } = require('../utilities/helper');

require('./mongodb.config');

const app = express();
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


    res.status(code).json({
        error: detail,
        message: message,
        status: status,
        options: null
    })
})

module.exports = app;