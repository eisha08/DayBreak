import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const history=useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const change = (e) => {
    console.log("inside on change");
    console.log(e.target.name, e.target.value); // Log both name and value

    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const submit =async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/v1/register",inputs).then((response)=>{
      if(response.data.message==="User already existed")
        alert(response.data.message)
      else{
      alert(response.data.message)
      console.log(response.data)
      setInputs({ email: "", username: "", password: "" });
      history("/login")
      }
    })
    //console.log(inputs);
   
  };
  return (
    <div className="main h-[100vh] w-[100%] bg-yellow-200">
      <div className="login flex flex-col items-center justify-center">
        <div className="head text-5xl font-Poppins text-purple-700 font-semibold py-4">
          SignUp!!
        </div>
        <div className="flex items-center justify-center h-[45vh] w-[25vw] border-purple-700 border-2  rounded-2xl">
          <div className="box font-Poppins   ">
            <div className=" py-4 space-y-2 w-[25vw] mx-[7%]">
              <label htmlFor="email" className="block text-gray-700 text-xl ">
                Email Address
              </label>
              <input
                id="email"
                type="text"
                name="email"
                value={inputs.email}
                onChange={change}
                className="py-2 px-2 rounded-lg w-[85%] "
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2 w-[25vw] mx-[7%]">
              <label htmlFor="username" className="block text-gray-700 text-xl">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={inputs.username}
                onChange={change}
                className="py-2 px-2 rounded-lg w-[85%]"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2 w-[25vw] mx-[7%] py-4">
              <label htmlFor="password" className="block text-gray-700 text-xl">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={inputs.password}
                onChange={change}
                className="py-2 px-2 rounded-lg w-[85%]"
                placeholder="Enter your password"
                required
              />
            </div>
            <div
              className="btn font-Poppins bg-purple-700 text-white w-[80%] h-[5vh] rounded-xl mx-auto text-center text-xl"
              onClick={submit}
            >
              <button className="py-2">
               {/* // <Link aria-current="page" to="/login"> */}
                  REGISTER
                {/* </Link> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
