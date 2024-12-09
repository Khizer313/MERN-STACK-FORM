import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { useEffect, useState } from "react";

function App() {
  const [user, setLoginUser] = useState(null); // Initialize user as null
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Load user from localStorage when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("MyUser");
    console.log("Retrieved user:", storedUser); // Debugging
    if (storedUser) {
      setLoginUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Mark loading complete
  }, []);

  // Update user and store in localStorage
  const updateUser = (user) => {
    console.log("Updating user:", user); // Debugging
    localStorage.setItem("MyUser", JSON.stringify(user));
    setLoginUser(user);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render a loader while loading
  }

  return (
    <div className="App">
      <Routes>
        {/* Redirect to HomePage if logged in, otherwise Login */}
        <Route
          path="/"
          element={
            user && user._id ? (
              <HomePage setLoginUser={updateUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Login Page */}
        <Route path="/login" element={<Login updateUser={updateUser} />} />
        {/* Register Page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
