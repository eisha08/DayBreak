const router=require('express').Router();
const User=require('../models/user');
const List=require('../models/model');

//createtask
router.post("/addTask",async(req,res)=>{
    try{
        const {title,Description,email}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            const task=new List({title,Description,user:existingUser});
            await task.save().then(()=>{res.status(200).json({task})})
            existingUser.task.push(task);
            existingUser.save();
        }

    }
    catch(error)
    {
        console.log(error);
    }
    
})
//updatetask
router.put("/updateTask/:id",async(req,res)=>{
    try{
        const {title,Description,email}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            const update=await List.findByIdAndUpdate(req.params.id,{title,Description})
            update.save().then(()=>{
                res.status(200).json({message:"Task Updated"})
            })
        }

    }
    catch(error)
    {
        console.log(error);
    }
    
})
//deletetask
router.delete("/deleteTask/:id",async(req,res)=>{
    try{
        const {email}=req.body;
        const existingUser=await User.findOneAndUpdate({email},
            {$pull:{
                list:req.params.id
            }}
        );
        if(existingUser){
            await List.findByIdAndDelete(req.params.id).then(()=>{
                res.status(200).json({message:"Task Deleted"})
            })
        }

    }
    catch(error)
    {
        console.log(error);
    }
    
})
//getTash
router.get("/getTask/:id",async(req,res)=>{
    const list=await List.find({user:req.params.id}).sort({createdAt:-1});
    if(list.length!=0)
    res.status(200).json({list:list})
    else
    res.status(200).json({message:"No task added"})
})
module.exports=router;