import React from "react";
import todolist from "../assets/todolist.png";
//import bg from "../assets/bg.webp"
function Home() {
  return (
    <div  className="home-page w-[100%] h-[100vh] my-auto bg-yellow-200 items-center justify-center py-6">
    <div className="flex w-full p-4 mx-auto">
      
      <div className="left w-[50vw] flex items-center justify-center pl-4">
        <img className="h-[88%] w-[72%]" src={todolist} alt="" />
      </div>
      <div className="right w-[50vw] flex flex-col text-5xl  items-center justify-center text-purple-700 pr-12 ">
        <div className="text  flex flex-col font-Poppins font-semibold">
          Simplify your life,
          <div className="flex flex-col font-Poppins ">organize your tasks.</div>
          <div className="para flex-col text-xl font-Poppins font-normal py-4 w-[30vw]">
          A to-do app is a digital tool designed to help you organize and manage your tasks efficiently. It allows you to create lists, set reminders, and prioritize items, helping you stay focused and productive.
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Home;
