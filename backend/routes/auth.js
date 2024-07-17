const router=require('express').Router();
const User=require('../models/user')
const bycrypt=require('bcryptjs');
//sign up
router.post("/register",async(req,res)=>{
    try{
        const {email,username,password}=req.body;
        const hashpassword=bycrypt.hashSync(password);
        const user=new User({email,username,password:hashpassword});
        await user.save().then(()=>res.status(200).json({user:user}))
    }catch(error){
        console.log(error);
        res.status(400).json({message:"User already existed"})
    }
})
//signin
router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({message:"Please Resgister First!!"});

        }
        const isPass=bycrypt.compareSync(
            req.body.password,
            user.password
        )
        if(!isPass){
            res.status(400).json({message:"Incorrect Password"});
        }
        const{password,...others}=user._doc;
        res.status(200).json({others});
    }
catch(error){
    console.log(error);
    res.status(400).json({message:"Register First"})
}
}
)

module.exports=router;