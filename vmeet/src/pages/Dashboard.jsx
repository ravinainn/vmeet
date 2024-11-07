import React, { useEffect } from "react";
import meetIcon from "../assets/calendarPrimary.svg";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div className="py-8 px-4 flex flex-col gap-4">
      <div className="flex justify-between ">
        <h1 className="text-5xl text-primary">Veersa Applications</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h4 className="text-xl font-semibold text-primary">
        v<span className="text-gray-500">Tools</span>
      </h4>
      <div className="w-full h-96 p-8 shadow rounded-lg">
        <div className="w-32">
          <Link
            to={"/vMeet"}
            className="flex items-center justify-center p-2 w-32 h-32 rounded shadow-md"
          >
            <img className="w-12" src={meetIcon} alt="" />
          </Link>
          <p className="text-base font-medium text-center text-primary">
            v<span className="text-gray-500">Meet</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
