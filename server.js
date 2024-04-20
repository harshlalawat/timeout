const express = require('express');
const http = require("http");
const {router} = require("./routes/index.js");
const {socket} = require("./utils/socket.js")
const app = express();
const PORT = 3000;

app.use(function(req,res,next){
    console.log(req.url, req.method);
    next();
})
app.use(express.static("public"));
app.use(express.json());
app.use(router);


const server = http.createServer(app);
socket(server);

server.listen(PORT, function(){
    console.log("Server is listening on port",PORT);
})