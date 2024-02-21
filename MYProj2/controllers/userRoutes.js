const { ok } = require('assert');
const { json } = require('body-parser');
const express=require('express');
const router =express.Router();
//fs module for working for manuplating the files
const fs=require('fs');
//find the database file and directy path
const path=require('path');

const dataFilePath=path.join(__dirname  ,'../UserDataBase.json');


//reading the data
function readDataFromFile(){
    const data=fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}

//Writing the data to the file
function writeDataToFile(data){
    fs.writeFileSync(dataFilePath,JSON.stringify(data,null,2));
}


//GEt request
router.get('/users',(req,res)=>{
    const users=readDataFromFile();
    res.send(users);
})


//GET User  by  users id
router.get('/users/:id',(req,res)=>{
    const users=readDataFromFile();
    const userId=req.params.id;

    const user=users.find(user => user.id===parseInt(userId));
    if(user){
        res.send(user);
    }else{
        res.status(404).send({
            error:'User not found. Please mentioned the correct Id!'
        })
    }
});

//Post Request--  creating the new users in the file
router.post('/users',(req,res)=>{
    const user=req.body;
 //   console.log('user',user);
    
    //getting the existing users
     const users=readDataFromFile();
    //updating the unique id to the users
      user.id=new Date().getTime();
   
    // Now push the user to the file
       users.push(user);
  
    //we have made the changes in the array but we have save yet
     writeDataToFile(users);
    // res.send(users);
    // console.log('user',user)
    res.send(user);
    
});

//PUT request
router.put('/users/:id',(req,res)=>{
    const users=readDataFromFile();
    const userId=req.params.id;
    const updateUser=req.body;

    const userIndex=users.findIndex(user => user.id == userId);

    if(userIndex==-1){
    return res.status(404).send({
        error: 'User not found'
    })
    }
    users[userIndex]={
        ...users[userIndex],
        ...updateUser
    }
    writeDataToFile(users);
    res.send(users[userIndex]);
})

router.delete('/users/:id',(req,res)=>{
    const users=readDataFromFile();
    const userId=req.params.id;

    const userIndex=users.findIndex(user=> user.id===parseInt(userId));

    if(userIndex==-1){
        return res.status(404).send({
            error:'User not found'
        });
    }
    users.splice(userIndex,1);
    writeDataToFile(users);
    res.send({
        message:`User with user id ${userId} has been deleted`
    });
});


//Get Request--Deafult
router.get('/test',(req,res)=>{ res.send({
        message:'Test is Working',
        path:dataFilePath
    })
});

module.exports=router;