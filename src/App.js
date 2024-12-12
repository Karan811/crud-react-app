import "./App.css";
import CreateUser from "./components/User/CreateUser";
import ShowUser from "./components/User/ShowUser";
import { Route, Routes } from "react-router-dom";
import EditUser from "./components/User/EditUser";
import User from "./components/User/User";
import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";

function App() {
  const [notificationCount, setNotificationCount] = useState(0);

  // Connect to the backend WebSocket
  useEffect(() => {
    const socket = io("http://localhost:8080"); // Replace with your backend URL

    // Listen for a 'user-added' event
    socket.on("user-added", () => {
      setNotificationCount((prevCount) => prevCount + 1);
    });

    // Cleanup the socket connection on unmount
    return () => {
      socket.off("user-added");
    };
  }, []);

  const resetNotification = () => {
    setNotificationCount(2); // Reset the count when the notification icon is clicked
  };

  return (
    <div className="App">
      <header className="container">
        <div>
          {/* Header with Notification */}
          <Header />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0" }}>
            <h1>My Application</h1>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={resetNotification}>
              <i className="fa fa-bell" style={{ fontSize: "24px" }}></i>
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
          {/* Routing */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/show-user" element={<ShowUser />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
