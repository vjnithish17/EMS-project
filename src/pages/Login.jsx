import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
      );

      console.log(response.data);

      // Token save
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("role", response.data.role);


      // Success message
      setSuccessMessage("Login successful!");
      setErrorMessage("");

      // Navigate to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid email or password");
      setSuccessMessage("");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="login-page">
      {/* Success Toast */}
      {successMessage && (
        <div className="login-toast success">
          <div className="toast-icon">✓</div>

          <div>
            <strong>Success</strong>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {errorMessage && (
        <div className="login-toast error">
          <div className="toast-icon">!</div>

          <div>
            <strong>Login Failed</strong>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="login-card">
        <h1>Welcome Back</h1>

        <p className="login-subtitle">Login to your account</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="register-link">
          New user?
          <button type="button" onClick={() => navigate("/register")}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
