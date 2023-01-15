import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";

const cookies = new Cookies();

function Admin() {
  const username = decode(cookies.get("token")).username;

  return (
    <div>
      <h1>Admin Home Page</h1>
      <h2>{username}</h2>
      <Link to="/student-data">
        <button>Student Data</button>
      </Link>
      <Link to="/faculty-data">
        <button>Faculty Data</button>
      </Link>
    </div>
  );
}

export default Admin;
