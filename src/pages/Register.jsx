import { useState } from "react";
import api from "../services/api"
import { useNavigate } from "react-router-dom";
import "./css/register.css";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");

   const [successMessage, setSuccessMessage] = useState("");
   const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    const userdata = {
      name,
      email,
      password,
      role,
    };

    try {
      const response = await api.post(
        "/api/auth/register",
        userdata
      );
     // Success message
      setSuccessMessage("Registration successful!");

      // Form clear
      setname("");
      setemail("");
      setpassword("");
      setrole("");

      // Message hide after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
         navigate("/");
      }, 3000);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-page">
        {successMessage && (
        <div className="success-toast">
          <div className="success-icon">✓</div>

          <div>
            <strong>Success</strong>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      <div className="register-card">

        <h1>Register</h1>

        <p className="register-subtitle">
          Create your account to continue
        </p>

        <form className="register-form" onSubmit={handlesubmit}>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e) => setrole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;
