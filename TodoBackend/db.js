const mongoose=require('mongoose');

require('dotenv').config();

const MONGO_URL=process.env.MONGO_URL;


mongoose.connect(MONGO_URL,{
    dbName:'TodoBackEnd'
})
.then(()=>{
    console.log('MOngoDB connected');
})
.catch((err)=>{
    console.log('Mongo connection is failed'+ err);
})

