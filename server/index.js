const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const currentDirectory = path.dirname(__dirname);
const MemoryStore = require('session-memory-store')(session);
const {login} = require('./utils/auth');

const appServer = express();
const server = http.createServer(appServer);

//appServer.use(express.static(buildPath));
appServer.use(session({
  secret: 'mt_chat_new_version',
  resave: true,
  saveUninitialized: true,
  store: new MemoryStore(),
}));
//appServer.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
appServer.use(cors());
appServer.use(express.json({limit:'50mb'}));
appServer.use((req, res, next) => {
  // Set CORS headers to allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Content-Type', 'text/csv');

  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

//setupLogin
appServer.post('/login',async(req,res,next)=>{
  const user_name = req.body.user_name;
  const password = req.body.password;
  const dbResult = await login(user_name, password);
  res.status(200).json({dbResult});
});




const port = process.env.PORT || 80;
server.listen(port,process.env.SERVER_IP, () => {
  console.log(`Server running on http://${process.env.SERVER_IP}:${port}`);
});