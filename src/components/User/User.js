import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";
const EditUser = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const getUserApi = "http://localhost:8080/users";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLYXJhbjEyMyIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzMzMjI5ODU0LCJleHAiOjE3MzMyNDc4NTR9.wTosJ5yhuVl3odCoTZLShmSRhD3V4gVw2wIAn6_kBIs"; // Replace with your actual token
  
    axios
      .get(getUserApi.concat("/") + 1, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
      })
      .then((item) => {
        console.info(item.data);
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name</td>
        <td>{user.name}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{user.email}</td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>{user.phone}</td>
      </tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditUser;
