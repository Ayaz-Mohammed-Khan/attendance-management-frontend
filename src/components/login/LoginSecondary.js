import { React, useState } from "react";

function LoginSecondary(props) {
  const isAdmin = props.id === "admin" ? true : false;

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
    let res = await fetch("/logincred", {
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
    if (result.status === 422) {
      alert("Failed");
    } else {
      alert("Success");
    }
  };

  return (
    <div>
      <h1>{props.id}</h1>
      <form onSubmit={handleSubmit} method="POST">
        <input
          id="username"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          type="text"
          value={data.username}
        />
        <input
          id="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          value={data.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginSecondary;
