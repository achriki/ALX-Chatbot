const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
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

const getConversations = async(id)=>{
    const dbConn = await connect();
    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('Conversations');
        const conversation_list = await collection.find({user_id: new ObjectId(id)}).toArray();
        console.log(conversation_list);
        if(conversation_list){
            return conversation_list; 
        }else{
            return null
        }
    }catch(err){
        console.log(err);
    }finally{
        await dbConn.close();
    }
}

const createConversation = async (title, userId)=>{
    const dbConn = await connect();
    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('Conversations');
        const user_id = new ObjectId(userId)
        const createdObj = await collection.insertOne({title, user_id})
        if(createdObj){
            return createdObj.insertedId
        }else{
            return null
        }
    }catch(err){
        console.log(err)
    }finally{
        await dbConn.close();
    }
}

const changeConvTitle = async (title, convId)=>{
    const dbConn = await connect();
    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('Conversations');
        const conv_id = new ObjectId(convId)
        const filter = { _id: conv_id}
        const updateOp = {
            $set: {title: title}
        }
        const result = await collection.updateOne(filter, updateOp)
        return result
        
    }catch(err){
        console.log(err)
    }finally{
        await dbConn.close();
    }
}

const QAList = async (convId)=>{
    const dbConn = await connect();
    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('QAs');
        const QA_list = await collection.find({conv_id: new ObjectId(convId)}).toArray();
        console.log(QA_list);
        if(QA_list){
            return QA_list; 
        }else{
            return null
        }
    }catch(err){
        console.log(err);
    }finally{
        await dbConn.close();
    }
}
module.exports= {
    getConversations,
    createConversation,
    changeConvTitle,
    QAList
}