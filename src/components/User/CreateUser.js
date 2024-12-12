import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './User.css';
const CreateUser = () => {
    const navigate = useNavigate();
    const createUserApi = "http://localhost:8080/users/register"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
    
        setUser({ ...user, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
      
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLYXJhbjEyMyIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzMzODQ5NDExLCJleHAiOjE3MzM4Njc0MTF9.LbNsBrYYheaSubAxGA9jy4aSIJHz6WAao1wseDGU8m0"; // Replace with your actual token
  
        try {
            setIsLoading(true);
            const response = await fetch(createUserApi, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({name: "", email: "", phone: ""})
                navigate('/show-user');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}
                <p>User Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="username" name="username" value={user.username} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Password</label>
                    <input type="text" className="form-control" id="password" name="password" value={user.password} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="pwd" className="form-label">Business Title</label>
                    <input type="text" className="form-control" id="businessTitle" name="businessTitle" value={user.businessTitle} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateUser