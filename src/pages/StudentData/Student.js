import React from "react";
import { useNavigate } from "react-router-dom";

function Student(props) {
  function handleDelete(param) {
    console.log(param);
  }
  function handleEdit(param) {
    navigate(`edit-student/${param}`, { state: { information: props.info } });
  }
  const navigate = useNavigate();
  return (
    <div>
      <p>Name : {props.info.name}</p>
      <p>Roll No: {props.info.rollno}</p>
      <p>Year: {props.info.year}</p>
      <p>Batch: {props.info.batch}</p>
      <p>Courses: </p>
      <ul>
        {props.info.courses.map((element, index) => {
          return (
            <li key={index}>
              Course: {element.course} <br />
              Attendance: {element.attendance}%
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => {
          handleEdit(props.info.rollno);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          handleDelete(props.info.rollno);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Student;
