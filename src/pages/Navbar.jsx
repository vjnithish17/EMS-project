import React from "react";
import { useNavigate } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import "../pages/css/nav.css";

function Navbar() {

    const navigate = useNavigate();

    const userName = localStorage.getItem("name") || "User";
    const userRole = localStorage.getItem("role") || "Employee";

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role");

        navigate("/");
    };

    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="navbar-logo">

                <span>EMS</span>

                <small>
                    Employee Management
                </small>

            </div>


            {/* Right User Section */}
            <div className="navbar-user">

                <div className="user-avatar">
                    <MdPerson />
                </div>

                <div className="user-details">

                    <h4>
                        {userName}
                    </h4>

                    <span>
                        {userRole}
                    </span>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
