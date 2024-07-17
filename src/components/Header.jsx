import React from "react";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="head  w-full px-6 py-6">
      <div className="main flex justify-between ">
        <div className="left-side h-24 w-20 flex">
          <img src={logo} alt="" />
        </div>
        <div className="right-side flex font-Playwrite CU text-2xl text-purple-700 font-bold">
          Day-Break
        </div>
      </div>
    </div>
  );
}
export default Header;
