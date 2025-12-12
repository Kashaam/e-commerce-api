const express = require('express');
const router = require('./router.config');

const app = express();
// add parser 
app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded());

app.use('/api/v1', router);


module.exports = app;