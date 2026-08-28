import "../pages/css/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    MdDashboard,
    MdPeople,
    MdPerson,
    MdLogout,
    MdMenu
} from "react-icons/md";

function Sidebar() {

    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <aside className={open ? "sidebar" : "sidebar collapsed"}>

            {/* Logo */}
            <div className="sidebar-logo">

                <div className="logo-icon">
                    <MdPeople />
                </div>

                {open && (
                    <div className="logo-text">
                        <h2>EMS</h2>
                        <span>Admin Panel</span>
                    </div>
                )}

            </div>


            {/* Menu */}
            <nav className="sidebar-menu">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <MdDashboard className="menu-icon" />

                    {open && <span>Dashboard</span>}
                </NavLink>


                <NavLink
                    to="/employees"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <MdPeople className="menu-icon" />

                    {open && <span>Employees</span>}
                </NavLink>


                {/* <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <MdPerson className="menu-icon" />

                    {open && <span>Profile</span>}
                </NavLink> */}

            </nav>


            {/* Bottom */}
            <div className="sidebar-bottom">

                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    <MdLogout className="menu-icon" />

                    {open && <span>Logout</span>}
                </button>


                <button
                    className="toggle-btn"
                    onClick={() => setOpen(!open)}
                >
                    <MdMenu />
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;
