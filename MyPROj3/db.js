const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to databases');
}).catch((err)=>{
    console.log('Eroor connecting to databse'+err);
})