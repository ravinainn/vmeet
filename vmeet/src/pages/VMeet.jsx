import React, { useState } from "react";
import logo from "../assets/logo.svg";

import HamburgerMenu from "../components/VMeet/HamburgerMenu";
import Calendar from "../components/VMeet/menuOptions/Calendar";
import NewAppointment from "../components/VMeet/menuOptions/NewAppointment";

const VMeet = () => {
  const [activeItem, setActiveItem] = useState("calendar");

  return (
    <div className="flex flex-col h-screen">
      <div className="flex  ">
        <div className="w-52 py-4">
          <img src={logo} className="w-12 mx-auto" alt="Logo" />
        </div>
        <div className="flex-1 my-auto px-4 flex items-baseline gap-2">
          <h4 className="text-3xl font-bold text-gray-500">
            <span className="text-primary">v</span>Meet
          </h4>
          <p className="text-gray-500 text-base font-normal">
            Your complete solution for handling appointments
          </p>
        </div>
      </div>
      <div className="flex-1 flex">
        <HamburgerMenu activeItem={activeItem} setActiveItem={setActiveItem} />
        {activeItem === "calendar" && <Calendar />}
        {activeItem === "newAppointment" && <NewAppointment />}
      </div>
    </div>
  );
};

export default VMeet;
