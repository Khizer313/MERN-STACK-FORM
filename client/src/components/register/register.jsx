import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password) {
      if (password === reEnterPassword) {
        axios
          .post("http://localhost:3000/register", user)
          .then((res) => {
            console.log(res);
            alert(res.data.message);
            navigate("/login");
          })
          .catch((err) => {
            console.error(err);
            alert("Registration failed");
          });
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <>
      <div className="register">
        <h1>Register</h1>
        <input
          name="name"
          value={user.name}
          type="text"
          placeholder="Your Name"
          onChange={handleChange}
        />
        <input
          name="email"
          value={user.email}
          type="text"
          placeholder="Your Email"
          onChange={handleChange}
        />
        <input
          name="password"
          value={user.password}
          type="password"
          placeholder="Your Password"
          onChange={handleChange}
        />
        <input
          name="reEnterPassword"
          value={user.reEnterPassword}
          type="password"
          placeholder="Re-Enter your password"
          onChange={handleChange}
        />
        <button className="button" onClick={register}>
          Register
        </button>
        <div>or</div>
        <button className="button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </>
  );
};

export default Register;
