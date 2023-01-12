import React from "react";
import { Link } from "react-router-dom";

function LoginPrimary() {
  return (
    <>
      <Link to="/adminlogin">
        <button>Admin</button>
      </Link>
      <Link to="/facultylogin">
        <button>Faculty</button>
      </Link>
    </>
  );
}

export default LoginPrimary;
