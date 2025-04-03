import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  let navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const credential = localStorage.getItem("isLoggedIn")

    if (credential) {
      navigate("/dashboard")
    }
  }, [])

  function handleSumit(e) {
    e.preventDefault();

    if (userName.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {

      localStorage.setItem("isLoggedIn", true)
      navigate("/dashboard")
    } else {
      alert("Invalid Credential")
      setUserName('')
      setPassword('')
    }
  };

  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <div className="card-body">
        <h2 className="card-title text-center">Admin Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" className="form-control" id="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="password" required />
          </div>
          <button onClick={handleSumit} type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;