import React from "react";
import logo from "../assets/logo.png";
import { FaUser } from "react-icons/fa6";

function Header() {
  return (
    <div className="nav bg-yellow-200 w-[100vw]">
      <div className="head  w-full px-6  flex justify-between ">
        <div className="main flex justify-start space-x-2  ">
          <div className="left-side h-16 w-16 flex my-auto">
            <img src={logo} alt="" />
          </div>
          <div className="left1-side flex font-Playwrite CU text-xl text-purple-700 font-bold my-auto">
            Day-Break
          </div>
        </div>
        <div className="right-side font-Poppins text-lg text-purple-700 flex list-none space-x-8 my-auto">
          <div className="home flex cursor-pointer">
            <li>Home</li>
          </div>
          <div className="about flex cursor-pointer">
            <li>About</li>
          </div>
          <div className="register flex cursor-pointer">
            <li>Register</li>
          </div>
          <div className="login flex cursor-pointer">
            <li>Login </li>
          </div>
          <div className="logout  cursor-pointer flex flex-row space-x-2">
            <div className="text-div flex">
              {" "}
              <li> Logout </li>
            </div>
            <div className="img-div flex py-1">
              <FaUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
