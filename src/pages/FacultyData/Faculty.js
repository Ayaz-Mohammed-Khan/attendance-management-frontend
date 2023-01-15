import React from "react";
import { useNavigate } from "react-router-dom";
import "../StudentData/student.css";

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
    navigate(`/edit-faculty/${param}`, { state: { information: props.info } });
  }

  return (
    <tr className="table_row" height="10px">
      <td>
        <p>{props.info.username}</p>
      </td>
      <td>
        <p>{props.info.name}</p>
      </td>

      <td className="table_column_courses">
        <ul className="table_courses">
          {props.info.subjects.map((element, index) => {
            return (
              <li key={index} className="table_course">
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "rgb(78, 4, 4)",
                  }}
                >
                  Subject
                </span>
                {element.subject}
                <br />
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "rgb(53, 32, 4)",
                  }}
                >
                  Courses
                </span>
                {element.courses}
              </li>
            );
          })}
        </ul>

        <button
          className="table_edit_button"
          onClick={() => {
            handleEdit(props.info.username);
          }}
        >
          Edit
        </button>
        <button
          className="table_delete_button"
          onClick={() => {
            handleDelete(props.info.username);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Faculty;
