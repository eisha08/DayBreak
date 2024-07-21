const express=require('express');
const app=express();
const cors=require('cors')
require('./Connection/Connection');
const auth=require('./routes/auth')
const task=require('./routes/task')
app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.use("/api/v1",auth);
app.use("/api/v2",task);
app.listen(8000,()=>{
    console.log("Connection established");
})