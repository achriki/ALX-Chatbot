// Import Mongodb functions
const {MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config();

// Connect to the database
const connect = async ()=>{
    try{
        const cnx = new MongoClient(`${process.env.MONGODB_KEY}`,{
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
        if(cnx){
            console.log('connected to MongoDB');
        }
        return cnx;
    }catch(err){
        console.error(err);
    }
}

// Login function 
const login = async(user, password)=>{
    console.log(user, password)
    const dbConn = await connect();
    let user_infos;
    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('Users');
        user_infos = await collection.findOne({Username:user, Password: password});
        // console.log(user_infos);
        if(!user_infos){
            user_infos = await collection.findOne({Email:user, Password: password })
            console.log("email login infos: ", user_infos)
        }
        return user_infos; 
    }catch(err){
        console.log(err);
    }finally{
        await dbConn.close();
    }
};


// Register Function
const signup = async(fullname, email, password, username)=>{
    const dbConn = await connect()
    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('Users');
        const findMatch = await collection.findOne({email: email})
        if(!findMatch){
            const result = await collection.insertOne({fullname,username,email, password})
            return result.insertedId
        }else{
            return null
        }
    }catch(err){
        console.log(err)
    }finally{
        await dbConn.close()
    }
}

// Google Authentication
// the function params are retrieved from google OAuth application "Find more on the frontend side"
const signupThird = async(fullname, email, password, username)=>{
    const dbConn = await connect()
    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('Users');
        const findMatch = await collection.findOne({email: email})
        // Check the user is already registered
        if(!findMatch){
            //Insert google account information 
            const result = await collection.insertOne({fullname,username,email, password})
            return result.insertedId
        }else{
            return findMatch._id
        }
    }catch(err){
        console.log(err)
    }finally{
        await dbConn.close()
    }
}

//Export functions
module.exports={
    login,
    signup,
    signupThird
}