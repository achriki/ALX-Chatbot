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
const {getConversations, createConversation, changeConvTitle, QAList} = require('./utils/conversation');
const {getInfos} = require('./utils/user')
const appServer = express();
const server = http.createServer(appServer);

//setup a new session
appServer.use(session({
  secret: 'mt_chat_new_version',
  resave: true,
  saveUninitialized: true,
  store: new MemoryStore(),
}));

// setup the express server
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

//setup Login
appServer.post('/login',async(req,res,next)=>{
  const user_name = req.body.username;
  const password = req.body.password;
  const dbResult = await login(user_name, password);

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

//setup signup with google and github
appServer.post('/signupThird',async(req,res,next)=>{
  const userData = req.body.userInfos
  const insert = await signupThird(userData.fullname, userData.email, userData.password, userData.username)

  if(insert !== null){
    res.status(200).json({id: insert});
  }
})

//get conversations per user router
appServer.post('/conversation', async(req,res,next)=>{
  const conv_list = await getConversations(req.body.userId)
  
  if(conv_list !== null){
    res.status(200).json({conversation_list: conv_list})
  }else{
    res.status(500).json({message: "No conversation found"})
  }
})

//create new conversation for a specific user 
appServer.post('/createConversation', async(req, res, next)=>{
  const userId= req.body.used_id
  const title = req.body.title

  const objId = await createConversation(title, userId)
  if(objId !== null){
    res.status(200).json({conversation_id: objId})
  }else {
    res.status(500).json({message: "Error"})
  }
})


//Change conversation title
appServer.post('/changeTitle', async(req, res, next)=>{
  const convId= req.body._id
  const title = req.body.title

  const objId = await changeConvTitle(title, convId)
  if(objId !== null){
    res.status(200).json({conversation_id: convId})
  }else {
    res.status(500).json({message: "Error"})
  }
})


//Get QA List
appServer.post('/QAList', async(req, res, next)=>{
  const conv_id = req.body._id

  const objQAs = await QAList(conv_id)
  if(objQAs){
    res.status(200).json({QAList: objQAs})
  }else{
    res.status(500).json({QAList: null})
  }
})

// return user details as an object
appServer.post('/userInfo',async(req,res,next)=>{
  const id = req.body._id;
  const userObj  = await getInfos(id);

  if(userObj !== null){
    res.status(200).json({userInfos: userObj})
  }else {
    res.status(500).json({userInfos: null})
  }
});

// start the http server
// the IP and the PORT retrieved from the .env file
const port = process.env.PORT || 80;
server.listen(port,process.env.SERVER_IP, () => {
  console.log(`Server running on http://${process.env.SERVER_IP}:${port}`);
});