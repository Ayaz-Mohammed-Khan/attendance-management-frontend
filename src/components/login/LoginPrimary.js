import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import logo from "./logo.png";
function LoginPrimary() {
  return (
    <div className="login_primary_main">
      <div className="login_primary_text">
        <img className="logo" alt="attendence-management" src={logo} />
        <h1>Attendence Management System</h1>
      </div>
      <div className="login_primary_container">
        <div className="login_primary">
          <h3>Log in</h3>
          <Link to="/adminlogin">
            <button>Admin</button>
          </Link>
          <Link to="/facultylogin">
            <button>Faculty</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPrimary;
