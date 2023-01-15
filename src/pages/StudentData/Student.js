import React from "react";
import { useNavigate } from "react-router-dom";
import "./student.css";
import Cookies from "universal-cookie";
import decode from "jwt-decode";

function Student(props) {
  const cookies = new Cookies();
  const isAdmin = decode(cookies.get("token")).isAdmin;
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    await fetch("/api/remove-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rollno: props.info.rollno,
      }),
    }).then(window.location.reload());
  };
  function handleEdit(param) {
    navigate(`edit-student/${param}`, {
      state: { information: props.info },
    });
  }

  return (
    <tr className="table_row" height="10px">
      <td>
        <p>{props.info.name}</p>
      </td>
      <td>
        <p>{props.info.rollno}</p>
      </td>
      <td>
        <p>{props.info.year}</p>
      </td>
      <td>
        <p>{props.info.degree}</p>
      </td>
      <td className="table_column_courses">
        <ul className="table_courses">
          {props.info.courses.map((element, index) => {
            return (
              <li key={index} className="table_course">
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "rgb(78, 4, 4)",
                  }}
                >
                  Course:{" "}
                </span>
                {element.course} <br />
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "rgb(53, 32, 4)",
                  }}
                >
                  Attendance:{" "}
                </span>
                {element.attendance}
              </li>
            );
          })}
        </ul>
        <button
          className="table_edit_button"
          onClick={() => {
            handleEdit(props.info.rollno);
          }}
        >
          Edit
        </button>
        <button
          className="table_delete_button"
          onClick={() => {
            handleDelete(props.info.rollno);
          }}
          style={{ display: isAdmin === true ? "block" : "none" }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Student;
