import React from "react";
import bulb from "../assets/bulb.png";
function About() {
  return (
    <div className="about flex flex-col min-w-[100vw] min-h-[100vh] bg-yellow-200">
        <div className="head flex text-3xl text-purple-700 justify-center ">
            About DayBreak...
        </div>
        <div className="content font-Poppins text-xl w-[45%] mx-auto text-purple-700 flex items-center justify-center py-12">
          Feeling overwhelmed by endless to-dos? We've all been there. At
          DayBreak, we believe in the power of getting things done. That's why
          we created a free, user-friendly app to help you take control. Simply
          register and start adding your daily tasks. Prioritize, set reminders,
          and never miss a deadline again. Update tasks as you progress and
          track your overall accomplishment. Our intuitive design makes managing
          your to-do list a breeze, accessible from any device. We prioritize
          security to keep your information safe. Join our community, conquer
          your to-do list, and achieve your goals! Sign up for free today and
          experience the difference of a truly organized life with DayBreak.
        </div>
    
      <div className="img flex justify-center ml-[35%] -mt-[5%]">
        <img className=" h-[45%] w-[30%]" src={bulb} alt="" />
      </div>
    </div>
  );
}
export default About;
