import React, { useEffect, useState } from 'react';
import './appointment.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/appointments", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("❌ Failed to fetch appointments:", err);
      }
    };

    if (token) {
      fetchAppointments();
    } else {
      console.warn("🚫 No token found. User may not be logged in.");
    }
  }, [token]);

  const groupedAppointments = appointments.reduce((acc, apt) => {
    const key = apt.mainService;
    if (!acc[key]) acc[key] = [];
    acc[key].push(apt);
    return acc;
  }, {});

  const getVisibleColumns = (serviceGroup) => {
    const columns = new Set();
    serviceGroup.forEach(apt => {
      if (apt.spouseName) columns.add('spouse');
      if (apt.childName) columns.add('child');
    });
    return columns;
  };

  const getStatus = (dateStr, timeStr) => {
    try {
      const [startTime] = timeStr.split(" - ");
      const [time, period] = startTime.trim().split(" ");
      let [hour, minute] = time.split(":").map(Number);

      if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
      if (period.toUpperCase() === "AM" && hour === 12) hour = 0;

      const [year, month, day] = dateStr.split("-").map(Number);
      const startDateTime = new Date(year, month - 1, day, hour, minute);

      const expireTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);
      const now = new Date();

      return now > expireTime ? "Expired" : "Upcoming";
    } catch (err) {
      console.error("Time parse error:", err);
      return "Upcoming";
    }
  };

  return (
    <div className="appointments-page">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        Object.entries(groupedAppointments).map(([service, items], idx) => {
          const visibleCols = getVisibleColumns(items);

          return (
            <div key={idx} className="service-group">
              <h3>{service}</h3>
              <table className="appointment-table">
                <thead>
                  <tr>
                    <th>Sub-Service</th>
                    <th>Name</th>
                    {visibleCols.has('spouse') && <th>Spouse</th>}
                    {visibleCols.has('child') && <th>Child</th>}
                    <th>Date</th>
                    <th>Time</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((apt, i) => {
                    const isOnline =
                      apt.subService === "Virtual Individual Sessions" ||
                      apt.subService === "Video Counseling";
                    const isText = apt.subService === "Text-Based Therapy";

                    const status = getStatus(apt.date, apt.time);

                    const showJoinMeeting = isOnline && status === "Upcoming";
                    const showJoinChat = isText && status === "Upcoming";

                    return (
                      <tr key={i}>
                        <td>{apt.subService}</td>
                        <td>{apt.name}</td>
                        {visibleCols.has('spouse') && <td>{apt.spouseName || '-'}</td>}
                        {visibleCols.has('child') && <td>{apt.childName || '-'}</td>}
                        <td>{apt.date}</td>
                        <td>{apt.time}</td>
                        <td>{apt.mobile}</td>
                        <td>{apt.email}</td>
                        <td>
                          {showJoinMeeting ? (
                            <a
                              href={`https://meet.jit.si/${apt._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="join-btn"
                            >
                              Join Meeting
                            </a>
                          ) : showJoinChat ? (
                            <a
                              href={`/chat/${apt._id}`}
                              className="join-btn"
                            >
                              Join Chat
                            </a>
                          ) : (
                            <span className={status === "Expired" ? "expired-text" : "upcoming-text"}>
                              {status}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Appointments;
