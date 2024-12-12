import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Notification = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  // Establish WebSocket connection
  useEffect(() => {
    const socket = io("http://localhost:8080"); // Replace with your backend URL

    // Listen for 'user-added' event
    socket.on("user-added", () => {
      setNotificationCount((prevCount) => prevCount + 1);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("user-added");
    };
  }, []);

  const resetNotification = () => {
    setNotificationCount(0); // Reset the count when the notification icon is clicked
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notification Feature</h1>
      <div style={{ position: "relative", display: "inline-block" }}>
        <i
          className="fa fa-bell"
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={resetNotification}
        ></i>
        {notificationCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "5px 10px",
              fontSize: "12px",
            }}
          >
            {notificationCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default Notification;
