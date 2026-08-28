import { useState, useEffect } from "react";
import axios from "axios";
import"../pages/css/dashboard.css";
function Dashboard() {
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/employees/stats/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
  <div className="dashboard-container">
    <div className="dashboard-header">
      <h1>Dashboard</h1>
      <p>Employee Management Overview</p>
    </div>

    <div className="stats-grid">

      <div className="stat-card employees-card">
        {/* <div className="stat-icon">👥</div> */}
        <div className="stat-content">
          <span>Total Employees</span>
          <h2>{stats.totalEmployees || 0}</h2>
        </div>
      </div>

      <div className="stat-card salary-card">
        {/* <div className="stat-icon">₹</div> */}
        <div className="stat-content">
          <span>Total Salary</span>
          <h2>₹{stats.totalSalary || 0}</h2>
        </div>
      </div>

      <div className="stat-card department-card">
        {/* <div className="stat-icon"></div> */}
        <div className="stat-content">
          <span>Total Departments</span>
          <h2>{stats.departmentCount || 0}</h2>
        </div>
      </div>

    </div>
  </div>
);
}

export default Dashboard;
