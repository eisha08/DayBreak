const mongoose=require('mongoose');
const listSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Description:{
        type:String
    },
    Deadline:{
        type:Date
    },
    user:
    {
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
},
{timestamps:true}
)
module.exports=mongoose.model("List",listSchema);