import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {

  let navigate = useNavigate();

  function handleSumit() {
    navigate("/dashboard")
  };

  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <div className="card-body">
        <h2 className="card-title text-center">Admin Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required />
          </div>
          <button onClick={handleSumit} type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;