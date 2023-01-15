import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import logo from "./logo.png";
function LoginPrimary() {
  return (
    <div id="main">
      <div id="text">
        <img id="logo" alt="attendence-management" src={logo} />
        <h1>Attendence Management System</h1>
      </div>
      <div id="form">
        <div className="login-primery" id="loginp">
          <h3>Log in</h3>
          <br />
          <Link to="/adminlogin">
            <button className="btns">Admin</button>
          </Link>
          <Link to="/facultylogin">
            <button className="btns">Faculty</button>
          </Link>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default LoginPrimary;
