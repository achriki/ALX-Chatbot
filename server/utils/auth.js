const {MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config();

const connect = async ()=>{
    console.log(process.env.MONGODB_KEY);
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


const signupThird = async(fullname, email, password, username)=>{
    const dbConn = await connect()
    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('Users');
        const findMatch = await collection.findOne({email: email})
        if(!findMatch){
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

module.exports={
    login,
    signup,
    signupThird
}