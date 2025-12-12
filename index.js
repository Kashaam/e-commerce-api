const http = require('http');
const app = require('./src/config/express.config');

const PORT = 7000;
const HOST = "127.0.0.1";

const server = http.createServer(app);

server.listen(PORT, HOST, (err)=>{
    if(!err){
        console.log("Server running at PORT: ", PORT);
        console.log("Enter CTRL+C to discontinue server");
    }
})