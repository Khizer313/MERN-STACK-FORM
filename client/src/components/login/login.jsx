import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ updateUser }) => {
  const navigate = useNavigate(); // Use useNavigate for React Router v6

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", user);
      if (res.status === 200) {
        alert(res.data.message);
        if (updateUser) {
          updateUser(res.data.user); // Update parent component's user state
        }
        navigate("/"); // Redirect to dashboard or another page
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />
      <button className="button" onClick={login}>
        Login
      </button>
      <div>or</div>
      <button className="button" onClick={() => navigate("/register")}>
        Sign up
      </button>
    </div>
  );
};

export default Login;
