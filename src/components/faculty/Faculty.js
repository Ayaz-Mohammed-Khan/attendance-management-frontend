import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";

function Faculty() {
  const cookies = new Cookies();
  const username = decode(cookies.get("token")).username;
  return (
    <div>
      <h1>Faculty Home Page</h1>
      <h2>{username}</h2>
      <Link to="/student-data">
        <button>Student Data</button>
      </Link>
    </div>
  );
}

export default Faculty;
