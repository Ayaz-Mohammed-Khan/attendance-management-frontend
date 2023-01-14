import React from "react";
import { Link, useLocation } from "react-router-dom";
function Faculty() {
  const location = useLocation();
  const { state } = location;
  return (
    <div>
      <h1>Faculty Home Page</h1>
      <h2>{state.username}</h2>
      <Link to="/student-data">
        <button>Student Data</button>
      </Link>
      <Link>
      </Link>
    </div>
  );
}

export default Faculty;
