//env file
require('dotenv').config();
//Import require module

const http=require('http');
// const https=require('https');

const express = require('express');
const bodyParser = require('body-parser');
const port=process.env.SERVER_PORT;
const path=require('path');
const cors = require('cors');
var fs = require('fs');
var  app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000})); 

global.appPath = __dirname;
console.log(process.env.WEBURL )
console.log('APPLICATION LOCATION :', global.appPath)
console.log('APPLICATION LOCATION :', process.env.DB_DATABASE) 



app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS,HEAD');
  
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,authtoken,x-access-token,access-token,access_token,_token,cache-control,content-$');
  res.setHeader('Access-Control-Expose-Headers','Content-Type,expire');
  next();
});
// Load the constants
global.constants = require(global.appPath + '/config/constants')

// Initialize routes
require(global.appPath + '/routes/route')(app)


app.use('/uploads',express.static(path.join(global.appPath,"uploads")));


// Initialize the events
require(global.appPath + '/helper/events')(app)


var httpsServer = http.createServer( app);

global.io = require('socket.io')(httpsServer, {
  serveClient: false,
  pingInterval: 1000,
  pingTimeout: 1000,
  cookie: false
})


require(global.appPath + '/helper/sockets')


/*connecting to Database*/
require('./config/database');
//create server
var server = httpsServer.listen(process.env.SERVER_PORT, () => { 

        var host = server.address().address  

        var port = server.address().port

        console.log("app listening at http://%s:%s", host, port);
        console.log('Listening on ' + host+port);
});
 



// var io = require('socket.io')(server);

// require(global.appPath + '/helper/sockets')

// var socket = require('/helper/sockets').initialize(server);
 
module.exports=httpsServer;
