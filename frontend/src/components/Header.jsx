import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

    let navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("isLoggedIn")
        navigate('/')
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Gym Management</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/members">Members</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/plans">Plans</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/active-users">Active Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/plan-reminder">Plan Reminder</Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger btn-sm ms-2 mt-1">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header