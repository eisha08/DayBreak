const router=require('express').Router();
const User=require('../models/user');
const List=require('../models/model');


//const router = express.Router();

// Middleware to validate user ID
// const validateUserId = (req, res, next) => {
//   const userId = req.body.id || req.params.id;

//   if (!ObjectId.isValid(userId)) {
//     return res.status(400).json({ error: 'Invalid user ID' });
//   }

//   next();
// };
  // Use the middleware in your routes
 
//createtask
// router.post("/addTask",async(req,res)=>{
//     try{
//         const {title,description,date,id}=req.body;
//         console.log(title , "  " ,description,"  ",date,"   ",id );
//         const existingUser=await User.findById({_id : id});
//         console.log(existingUser);
//         if(existingUser){
//             const task=new List({title,Description:description,Deadline:date,user:existingUser._id});
//             await task.save().then(()=>{res.status(200).json({task})})
//              existingUser.task.push(task);
//              existingUser.save();
//         }
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
    
// })
router.post("/addTask", async (req, res) => {
    try {
        const { title, description, date, id } = req.body;
        console.log(title, "  ", description, "  ", date, "   ", id);

        if(id){
        const existingUser = await User.findById(id);
        console.log(existingUser);

        if (existingUser) {
            const task = new List({
                title: title,
                Description: description,
                Deadline: date,
                user: existingUser._id
            });

            await task.save();
            
            existingUser.list.push(task._id); // Ensure the task ID is pushed to the user's task array
            await existingUser.save(); // Use await to properly save the user

            return res.status(200).json({ task });
        }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});
//updatetask
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body, date, email } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            const list = await List.findByIdAndUpdate(req.params.id, { title, body, date }, { new: true });
            
            if (list) {
                return res.status(200).json({ message: "Task Updated" });
            } else {
                return res.status(404).json({ message: "Task not found" });
            }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


//deleteTas


router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.params; // Get the task ID from the URL parameters
        console.log(id);

        // Find the task by ID
        const task = await List.findById(id);
        console.log(task);

        if (task) {
            // Find the user and update by removing the task reference
            const user = await User.findByIdAndUpdate(task.user, {
                $pull: { task: id }
            });
            console.log(user);

            if (user) {
                // Delete the task
                await List.findByIdAndDelete(id);
                res.status(200).json({ message: "Task deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
//getTask
router.get("/getTask/:id",async(req,res)=>{
    const id = req.params?.id;
    if(id){
        const list=await List.find({user:req.params?.id}).sort({createdAt:-1});
        if(list.length!=0)
        res.status(200).json({list:list})
        else
        res.status(200).json({message:"No task added"})
    }
})
module.exports=router;