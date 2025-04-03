import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa"; // Import gym icon

function AdminLogin() {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const credential = localStorage.getItem("isLoggedIn");
    if (credential) {
      navigate("/dashboard");
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (userName.toLowerCase() === "admin" && password.toLowerCase() === "admin") {
      localStorage.setItem("isLoggedIn", true);
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
      setUserName("");
      setPassword("");
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-dark">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}>
        <div className="card-body text-center">
          {/* Gym Icon */}
          <FaDumbbell size={50} className="text-primary mb-3" />

          <h2 className="card-title fw-bold">Admin Login</h2>
          <p className="text-muted">Enter your credentials to access the dashboard</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label fw-bold">Username</label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
                className="form-control rounded-pill"
                id="username"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-bold">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="form-control rounded-pill"
                id="password"
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
