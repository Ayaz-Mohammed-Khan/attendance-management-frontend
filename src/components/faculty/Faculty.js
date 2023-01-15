import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";
import "./faculty.css";

function Faculty() {
  const cookies = new Cookies();
  const username = decode(cookies.get("token")).username;
  return (
    <div id="maninf">
      <h1 id="h1">Faculty Home Page</h1>
      <div id="headf">
        <h2 id="h2">{username}</h2>
      </div>
      <div id="btnsf">
        <Link to="/student-data">
          <button>Student Data</button>
        </Link>
      </div>
    </div>
  );
}

export default Faculty;
