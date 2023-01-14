import React from "react";
import { useNavigate } from "react-router-dom";

function Faculty(props) {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    await fetch("/api/remove-faculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.info.username,
      }),
    }).then(window.location.reload());
  };
  function handleEdit(param) {
    navigate(`edit-faculty/${param}`, { state: { information: props.info } });
  }
  return (
    <div>
      <p>UserName : {props.info.username}</p>
      <p>Name: {props.info.name}</p>
      <p>Subjects: </p>
      <ul>
        {props.info.subjects.map((element, index) => {
          return (
            <li key={index}>
              Subject:{element.subject}
              <br />
              Courses:{element.courses}
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => {
          handleEdit(props.info.username);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          handleDelete(props.info.username);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Faculty;
