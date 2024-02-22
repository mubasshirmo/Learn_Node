const express=require('express');
const router=express.Router();


const Todo=require('../MODELS/Todo');


router.get('/',(req,res)=>{
    res.json({
        message:'The Todo Routes Api is working'
    });
});

//MiddleWare
router.use((err,req,res,next)=>{
    console.log(`error middle called`,err);
    res.status(500).json({
        message:err.message
    })
})

//Creating the new Todos
router.post('/createtodo', async (req,res)=>{
    try{
        const{title,description}=req.body;
        const newTodo=new Todo({
            title,
            description
        });
        await newTodo.save();
        
        res.status(201).json({
            message:'Todo Created Sucessfully'
        })
    }catch(err){

        // res.status(500).json({
        //  message:err.message
        // });
        next(err);
    }
});

//Get all todos 
router.get('/getalltodos', async (req,res)=> {
    try{
        const todos=await Todo.find();
        res.status(200).json({
            todos,
            message:'Todos Fetch Successfully'
        })
    }catch(err){
        res.status(500).json({
        message:err.message
        })
    }
})

//Find by id
router.get('/gettodo/:id', async(req,res)=> {
    try{
        const todo= await Todo.findById(req.params.id);
        if(!todo){
            res.status(404).json({
                message:'Todo not Found'
            });
        }
        res.status(200).json({
            todo,
            message:'Todo Fetch Successfully'
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
            })
    }
});

//update request
router.put('/update/:id',async (req,res)=>{
    try{
        const{title,description,completed}=req.body;
        const todo=await Todo.findByIdAndUpdate(req.params.id,{
            title,
            description,
            completed
        },{
            new:true
        })
        if(!todo){
            res.status(404).json({
                message:'Todo not Found'
            })
        }
        res.status(200).json({
            todo,
            message:'Todo Updated Succesfully'
        })
    }catch(err){
        res.status(500).json({
        message:err.message
        })    
    }
});

//Delete todo
router.delete('/delete/:id',async(req,res)=>{
    try{
        const todo= await Todo.findByIdAndDelete(req.params.id);
        if(!todo){
            res.status(404).json({
                message:'Todo not found'
            })
        }
        res.status(200).json({
            message:'Todo deleted successfully'
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}) 





module.exports=router;
