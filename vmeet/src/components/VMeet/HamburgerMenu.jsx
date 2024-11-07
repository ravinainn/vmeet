import React from "react";
import calendarWhite from "../../assets/calendarWhite.svg";
import calendarPrimary from "../../assets/calendarPrimary.svg";
import plusWhite from "../../assets/PlusWhite.svg";
import plusPrimary from "../../assets/PlusPrimary.svg";

const HamburgerMenu = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    {
      id: "calendar",
      label: "Calendar",
      icon: calendarWhite,
      activeIcon: calendarPrimary,
    },
    {
      id: "newAppointment",
      label: "New Appointment",
      icon: plusWhite,
      activeIcon: plusPrimary,
    },
  ];

  return (
    <div className="w-52 h-full flex flex-col items-center">
      <div className="bg-primary flex-1 w-full pt-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`group flex gap-2 w-full justify-start px-4 py-3 cursor-pointer ${
              activeItem === item.id ? "bg-white" : "hover:bg-white"
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            {/* White icon */}
            <img
              className={`w-4  group-hover:hidden ${
                activeItem === item.id ? "hidden" : "block"
              }`}
              src={item.icon}
              alt={`${item.label} icon`}
            />

            {/* Primary icon */}
            <img
              className={`w-4 group-hover:block ${
                activeItem === item.id ? "block" : "hidden"
              }`}
              src={item.activeIcon}
              alt={`${item.label} icon`}
            />
            <h4
              className={`text-base ${
                activeItem === item.id
                  ? "text-primary font-normal"
                  : "text-white font-light group-hover:text-primary group-hover:font-normal"
              }`}
            >
              {item.label}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HamburgerMenu;
