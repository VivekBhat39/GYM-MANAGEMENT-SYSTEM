import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const handleLogout = () => {
        // Perform logout logic here
        localStorage.removeItem("isLoggedIn")
        navigate("/");
    };

    const closeNavbar = () => {
        setIsNavbarOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" onClick={closeNavbar}>Gym Management</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard" onClick={closeNavbar}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/members" onClick={closeNavbar}>Members</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/plans" onClick={closeNavbar}>Plans</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/active-users" onClick={closeNavbar}>Active Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/plan-reminder" onClick={closeNavbar}>Plan Reminder</Link>
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
    );
}

export default Navbar;
