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
const {login, signup, signupThird} = require('./utils/auth');
const {getConversations, createConversation, changeConvTitle} = require('./utils/conversation');
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
  const user_name = req.body.username;
  const password = req.body.password;
  const dbResult = await login(user_name, password);
  console.log(dbResult)
  res.status(200).json({dbResult});
});

//setup signup
appServer.post('/signup',async(req,res,next)=>{
  const userData = req.body.userInfos
  const insert = await signup(userData.fullname, userData.email, userData.password, userData.username)
  
  if(insert !== null){
    res.status(200).json({id: insert});
  }else{
    res.status(500).json({message: 'Internal server error'});
  }
})

//setup signup
appServer.post('/signupThird',async(req,res,next)=>{
  const userData = req.body.userInfos
  const insert = await signupThird(userData.fullname, userData.email, userData.password, userData.username)
  console.log(insert)
  if(insert !== null){
    res.status(200).json({id: insert});
  }
})

//getConversations
appServer.post('/conversation', async(req,res,next)=>{
  console.log("id: ", req.body.userId)
  const conv_list = await getConversations(req.body.userId)
  if(conv_list !== null){
    res.status(200).json({conversation_list: conv_list})
  }else{
    res.status(500).json({message: "No conversation found"})
  }
})
//create conversation
appServer.post('/createConversation', async(req, res, next)=>{
  console.log("id: ", req.body.used_id)
  const userId= req.body.used_id
  const title = req.body.title
  const objId = await createConversation(title, userId)
  if(objId !== null){
    res.status(200).json({conversation_id: objId})
  }else {
    res.status(500).json({message: "Error"})
  }
})
//Change conversation
appServer.post('/changeTitle', async(req, res, next)=>{
  const convId= req.body._id
  const title = req.body.title
  console.log(convId, title)
  const objId = await changeConvTitle(title, convId)
  if(objId !== null){
    res.status(200).json({conversation_id: convId})
  }else {
    res.status(500).json({message: "Error"})
  }
})



const port = process.env.PORT || 80;
server.listen(port,process.env.SERVER_IP, () => {
  console.log(`Server running on http://${process.env.SERVER_IP}:${port}`);
});