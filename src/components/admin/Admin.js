import React from "react";
import { Link, useLocation } from "react-router-dom";

function Admin() {
  const location = useLocation();
  const { state } = location;
  return (
    <div>
      <h1>Admin Home Page</h1>
      <h2>{state.username}</h2>
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
