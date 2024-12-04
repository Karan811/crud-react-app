import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowUser = () => {
  const showUserApi = "http://localhost:8080/users";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(showUserApi.concat("/") + 1, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLYXJhbjEyMyIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzMzMzEyNzM2LCJleHAiOjE3MzMzMzA3MzZ9.hppun9JvNTWd_phnPc3UzTCKBHFfZeTtj44s7WLG25w"; // Replace with your actual token
  
    axios
      .get(showUserApi.concat("/") + 1, {
      
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


  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
         
         
                <tr key={1}>
                  <td>{1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={`/edit-user/${user.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/user/${user.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(user.id)}
                    ></i>
                  </td>
                </tr>
            
     
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowUser;
