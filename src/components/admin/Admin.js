import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";
import "./admin.css";

const cookies = new Cookies();

function Admin() {
  const username = decode(cookies.get("token")).username;

  return (
    <div id="mainpa">
      <h1 id="Header1">Admin Home Page</h1>
      <div id="head">
        <h2 id="Header2"><span id="admin_span" >Logged in as: </span>{username}</h2>
      </div>
      <div id="btnsa">
        <Link to="/student-data">
          <button>Student Data</button>
        </Link>
        <Link to="/faculty-data">
          <button>Faculty Data</button>
        </Link>
      </div>
    </div>
  );
}

export default Admin;
