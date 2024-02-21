const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const PORT=8000
require('dotenv').config();
const app=express();
require('./db');
const User=require('./MODELS/UserSchema');
const bcrypt=require('bcrypt');
const { ConnectionPoolClosedEvent } = require('mongodb');
const jwt=require('jsonwebtoken');

//ITs is used to extract body from the user request;
app.use(bodyParser.json());
app.use(cors());

function authenticateToken(req,res,next){
    const token=req.headers.authorization.split(' ')[1];
    const {id}=req.body;
    console.log('token',token);

    if(!token) return res.status(401).json({message:"Auth Error"});

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(id && decoded.id != id){
            return res.status(401).json({message:'Auth Error'});
        }
        req.id=decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Invalid Token'});
    }
}

app.get('/',(req,res)=>{
    res.send('The Api is working');
});



app.post('/register',async (req,res)=>{
    try{
        const{name,password,email,age,gender}=req.body;

        const existingUser= await User.findOne({email});

        if(existingUser){
            return res.status(409).json({message:'Email already exists'});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        console.log('salt',salt);
        console.log('hashedPassword',hashedPassword);

        const newUser=new User({
            name,
            password:hashedPassword,
            email,
            age,
            gender
        });
      await newUser.save();
      res.status(201).json({
        message:'USer Registered successfully'
      });
    }
    catch(err){
        res.status(500).json({message: err.message})    }
})


app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;

        const existingUser= await User.findOne({email});
        if(!existingUser){
            return res.status(401).json({message:'Invalid crendentials'});
        }

        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect){
            return res.status(401).json({message:'Invalid credentials'});
        }

        const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:'1h'
        
        });
        res.status(200).json({
            token,
            message:"User Login sucessfully"
        })
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.get('/getmyprofile',authenticateToken,async(req,res)=>{
    const {id}=req.body;
    const user= await User.findById(id);
    user.password=undefined
    res.status(200).json({user});
})
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})