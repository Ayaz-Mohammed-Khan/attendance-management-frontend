import React from "react";
import { useLocation } from "react-router-dom";

function Admin() {
  const location = useLocation();
  const { state } = location;
  return (
    <div>
      <h1>Admin Home Page</h1>
      <h2>{state.username}</h2>
    </div>
  );
}

export default Admin;
