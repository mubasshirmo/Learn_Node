const express=require('express');
const userRoute=require('./controllers/userRoutes')
const PORT=8000;
const cors=require('cors');
const bodyParser=require('body-parser');


const app=express();
app.use(bodyParser.json());
//cors - localhost:3000  localhost:8000
// const allowedOrigin=['http://localhost:3000','http://localhost:8000'];


//how we can give the access to the cors
// app.use(cors({
//    origin:function(origin,callback){
//     console.log('origin',origin);
//     if(!origin) return callback(null,true);
//     if(allowedOrigin.includes(origin)) return callback(null,true);
//     else{
//         return callback(new Error('Not allowed by CORS'));
//     }
//    }
// }))


//for given permisson to all the url to access 
app.use(cors());

//using the imported apis
app.use('/userapis',userRoute);

app.get('/',(req,res)=>{
    res.send({
        message:"The Api is working"
    });
});


app.listen(PORT,()=>{
    console.log(`Server is listining on port ${PORT}`);
});