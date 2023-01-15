import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";
import "./login.css";
import logo from "./logo.png";
const cookies = new Cookies();
function LoginSecondary(props) {
  const isAdmin = props.id === "admin" ? true : false;
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = data;
    let res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        isAdmin: isAdmin,
      }),
    });

    const result = await res.json();
    console.log(result);
    if (result.token) {
      cookies.set("token", result.token);
      const info = decode(result.token);
      navigate(`${info.isAdmin ? "/admin/home" : "/faculty/home"}`, {
        state: { username: info.username, isAdmin: info.isAdmin },
      });
    }
  };

  return (
    <div id="main">
      <div id="text">
        <img id="logo" alt="attendence-management" src={logo} />
        <h1>Attendence Management System</h1>
      </div>

      <div id="form">
        <form id="login" onSubmit={handleSubmit} method="POST">
          <div>
            <h1>{props.id}</h1>
          </div>
          <input
            id="username"
            name="username"
            className="input-data"
            onChange={handleChange}
            placeholder="Username"
            type="text"
            value={data.username}
          />
          <br />
          <br />
          <input
            id="password"
            name="password"
            className="input-data"
            onChange={handleChange}
            placeholder="Password"
            type="password"
            value={data.password}
          />
          <br />
          <br />
          <div>
            <button id="btns" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSecondary;
