import React from "react";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="main bg-yellow-200 h-[100vh] w-[100vw]">
      <div className="login flex flex-col items-center justify-center">
        <div className="head text-5xl font-Poppins text-purple-700 font-semibold py-4">
            Login!!
        </div>
        <div className="flex items-center justify-center h-[38vh] w-[25vw] border-purple-700 border-2  rounded-2xl">
        <div className="box font-Poppins   ">
          <div className=" py-4 space-y-2 w-[25vw] mx-[7%]">
            <label htmlFor="email" className="block text-gray-700 text-xl ">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="py-2 px-2 rounded-lg w-[85%] "
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2 w-[25vw] mx-[7%]">
            <label htmlFor="password" className="block text-gray-700 text-xl">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="py-2 px-2 rounded-lg w-[85%]"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="register text-purple-700 font-semibold text-center py-4 text-lg">
           <Link aria-current="page" to="/register">Don't have an account?Sign up</Link> 
          </div>
          <div className="btn font-Poppins bg-purple-700 text-white w-[80%] h-[5vh] rounded-xl mx-auto text-center text-xl">
            <button className="py-2">
               <Link aria-current="page" to="/todo">LOGIN</Link> 
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
