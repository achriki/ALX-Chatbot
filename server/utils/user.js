const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();
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

const getInfos = async (id)=>{
    const dbConn = await connect();
    let user_infos;
    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('Users');

        // parse the id from string to ObjectId
        user_infos = await collection.findOne({_id: new ObjectId(id)});

        if(user_infos){
            return user_infos; 
        }else{
            return null
        }
    }catch(err){
        console.log(err);
    }finally{
        await dbConn.close();
    }
}

module.exports = {
    getInfos
}