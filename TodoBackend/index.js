const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
require('dotenv').config();
require('./db')
const PORT=8000;
const todoRoutes=require('./ROUTES/TodoRoutes');

app.use(cors());
//whenever we send data from frontend it in string so we have to convert into the json to save in backend
app.use(bodyParser.json());

app.use('/todoroutes',todoRoutes);

app.get('/',(req,res)=>{
    res.json({
        message:'The API is working'
    });
  //  res.send('Its working properly')
});



app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});

