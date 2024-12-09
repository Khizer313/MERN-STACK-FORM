import React from "react";
import "./homepage.css";

const HomePage = ({ updateUser }) => {
  return (
    <>
      <div className="homepage">
        <h1>Redirected to HomePage</h1>
        <button className="button" onClick={() => updateUser({})}>
          Logout
        </button>
      </div>
    </>
  );
};

export default HomePage;
