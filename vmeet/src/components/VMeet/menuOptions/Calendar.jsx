import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserId(localStorage.getItem("userId"));
        // console.log(userId);
        let response;

        response = await axios.get(
          `http://localhost:8083/api/appointments/${localStorage.getItem(
            "userId"
          )}`
        );
        const transformedEvents = response.data.map((event) => ({
          title: event.title,
          start: event.startTime,
          end: event.endTime,
        }));
        setEvents(transformedEvents);

        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex-1 flex flex-col px-12 py-8">
      <h4 className="text-xl font-semibold text-primary pb-8">Calendar</h4>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          // height={650}
          aspectRatio={2}
          headerToolbar={{
            // left: "prev,next",
            // center: "title",
            right: "timeGridWeek,dayGridMonth,prev,next",
          }}
          events={events}
        />
      </div>
    </div>
  );
};

export default Calendar;
