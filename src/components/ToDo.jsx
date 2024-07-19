import React from "react";
import task from "../assets/task.png";
function ToDo() {
  return (
    <div className="main w-[100vw] h-[100vh] bg-yellow-200 pt-10">
      <div className="head w-[100%] h-fit flex justify-center items-center">
        <div className="text text-purple-700 text-4xl font-semibold font-Poppins">Add Tasks</div>
        <div className="img ">
          <img src={task} className="h-[80px] w-[80px]" alt="" />
        </div>
        </div>
        <div className="box font-Poppins flex flex-col justify-center items-center  ">
          <div className=" py-4 space-y-2 w-[25vw] mx-[7%]">
           
            <input
              id="title"
              type="title"
              className="py-2 px-2 rounded-lg w-[85%] "
              placeholder="Add Title"
              required
            />
          </div>
          <div className="space-y-2 w-[25vw] mx-[7%] ">
            
            <textarea
              id="Description"
              type="Description"
              className="py-2 px-2 rounded-lg w-[85%] h-[40%] placeholder:text-left "
              placeholder="Add Description"
              
            />
          </div>
          <div className=" py-2 space-y-2 w-[25vw] mx-[7%]">
           
           <input
             id="date"
             type="Date"
             className="py-2 px-2 rounded-lg w-[85%] text-gray-400"
             placeholder="Add Deadline"
             required
           />
         </div>
          </div>
      
    </div>
  );
}
export default ToDo;
