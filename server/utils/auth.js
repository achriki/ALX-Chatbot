const {MongoClient} = require('mongodb');
require('dotenv').config();

const connect = async ()=>{
    try{
        const cnx = new MongoClient(`${process.env.MONGODB_KEY}`,{
            useNewUrlParser: true, useUnifiedTopology: true 
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
    const dbConn = await connect();

    try{
        const dbo = dbConn.db('ALX_chatbot');
        const collection = dbo.collection('Users');
        const user_infos = await collection.findOne({Username:user, password: password});
        console.log(user_infos);
        return user_infos; 
    }catch(err){
        console.log(err);
    }finally{
        await dbConn.close();
    }
};

module.exports={
    login,
}