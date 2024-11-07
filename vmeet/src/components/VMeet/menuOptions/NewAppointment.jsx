import axios from "axios";
import React, { useEffect, useState } from "react";
import xmark from "../../../assets/xmark-solid.svg";

const NewAppointment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [inputAttendee, setInputAttendee] = useState("");
  const [suggestionAttendees, setSuggestionAttendees] = useState([]);
  const [addedAttendees, setAddedAttendees] = useState([]);
  const [userStatus, setUserStatus] = useState();

  // FETCH ALL USERNAMES
  useEffect(() => {
    const fetchUser = async () => {
      if (startTime && endTime) {
        try {
          const response = await axios.get(
            "http://localhost:8083/api/users/getUsernames",
            { params: { start: startTime, end: endTime } }
          );
          console.log(response.data);
          setUserStatus(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Enter Start or end Time");
      }
    };
    fetchUser();
  }, [endTime, startTime]);

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        title,
        description,
        startTime,
        endTime,
        attendees: addedAttendees,
      });
      const response = await axios.post(
        "http://localhost:8083/api/appointments/schedule",
        {
          organizerId: parseInt(localStorage.getItem("userId")),
          title,
          description,
          startTime,
          endTime,
          attendeeUsernames: addedAttendees,
        }
      );
      console.log(response);
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      setInputAttendee("");
      setSuggestionAttendees([]);
      setAddedAttendees([]);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD ATTENDEE
  const handleAddAttendee = (ele) => {
    if (!addedAttendees.includes(ele)) {
      setAddedAttendees((prev) => [...prev, ele]);
    }
  };
  // CHANGE SUGGESTEDATTENDEES ON INPUT CHANGE
  const handleChangeAttendee = (e) => {
    const value = e.target.value;
    console.log(userStatus);
    setInputAttendee(value);
    if (value === "") {
      setSuggestionAttendees([]);
    } else {
      const filteredSuggestions = userStatus
        .filter((username) =>
          userStatus.toLowerCase().includes(value.toLowerCase())
        )
        .filter((username) => !addedAttendees.includes(username));
      setSuggestionAttendees(filteredSuggestions);
    }
  };

  //REMOVE AN ATTENDEE FROM LIST
  const handleRemoveAttendee = (user) => {
    setAddedAttendees((prev) => prev.filter((attendee) => attendee != user));
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-8">
      <h4 className="text-xl font-semibold text-primary pb-8">
        New Appointment
      </h4>
      <form className="flex flex-col gap-4 w-1/2" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <label htmlFor="title" className="text-base font-light w-32">
            Title:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-1 py-1 border rounded shadow-sm flex-1 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 ">
          <label htmlFor="startTime" className="text-base font-light w-32">
            Start Time:
          </label>
          <input
            type="datetime-local"
            id="startTime"
            placeholder="Enter Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="px-1 py-1 border rounded shadow-sm  outline-none"
          />
        </div>
        <div className="flex items-center gap-2 ">
          <label htmlFor="endTime" className="text-base font-light w-32">
            End Time:
          </label>
          <input
            type="datetime-local"
            id="endTime"
            placeholder="Enter End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="px-1 py-1 border rounded shadow-sm  outline-none"
          />
        </div>
        <div className="flex items-start gap-2 relative">
          <label htmlFor="attendees" className="text-base font-light w-32">
            Attendees:
          </label>
          <div className="flex flex-col border-collapse">
            <input
              type="text"
              id="attendees"
              placeholder="Add Attendee"
              value={inputAttendee}
              onChange={handleChangeAttendee}
              className={`px-1 py-1 border-collapse border  rounded-t ${
                suggestionAttendees.length == 0 && "rounded-b"
              } shadow-sm  outline-none`}
            />
            {suggestionAttendees.length > 0 && (
              <div className=" right-0 top-full bg-white border border-slate-900 border-collapse">
                <ul className="flex flex-col max-h-32 overflow-auto">
                  {suggestionAttendees.map((ele, ind) => (
                    <li
                      key={ind}
                      onClick={() => handleAddAttendee(ele)}
                      className="cursor-pointer py-1 px-1 border-b border-slate-600"
                    >
                      {ele}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {addedAttendees.length > 0 && (
            <div className="p-2 flex gap-1 flex-wrap border bg-slate-200 border-slate-300 max-w-96 rounded">
              {addedAttendees.map((user, ind) => (
                <div
                  key={ind}
                  className="bg-primary flex gap-1 items-center p-1 rounded-md"
                >
                  <p className="text-white">{user}</p>
                  <img
                    onClick={() => handleRemoveAttendee(user)}
                    className="w-4 cursor-pointer"
                    src={xmark}
                    alt="xmark"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-start gap-2 ">
          <label htmlFor="endTime" className="text-base font-light w-32">
            Description:
          </label>
          <textarea
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-1 py-1 border rounded shadow-sm flex-1 h-32 outline-none"
          />
        </div>
        <button
          type="submit"
          className=" self-center py-2 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-blue-400 focus:outline-none"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewAppointment;
