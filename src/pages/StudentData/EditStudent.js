import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditStudent() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const handleClick = async (param) => {
    let res = await fetch("/api/update-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rollno: param,
      }),
    });
    const result = await res.json();
    if (result.message === "success") {
      navigate("/student-data");
    }
  };

  const [info, setInfo] = useState({
    name: state.information.name,
    rollno: state.information.rollno,
    year: state.information.year,
    batch: state.information.batch,
  });

  const [courseState, setCourse] = useState({
    objects: state.information.courses,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <p>Name :</p>
      <input
        name="name"
        value={info.name}
        onChange={(e) => {
          handleChange(e, 1);
        }}
      />
      <p>Roll No: </p>
      <input name="rollno" value={info.rollno} onChange={handleChange} />
      <p>Year: </p>
      <input name="year" value={info.year} onChange={handleChange} />
      <p>Batch: </p>
      <input name="batch" value={info.batch} onChange={handleChange} />
      <p>Courses: </p>
      <ul>
        {courseState.map((element, index) => {
          return (
            <li key={index}>
              <p>Course: </p>
              <input
                name={`course`}
                value={courseState[index].course}
                onChange={(e) => {
                  setCourse((prev) => {
                    const { value } = e.target;
                    let newCourse = prev;
                    newCourse[index].course = value;
                    console.log(e.target.name, index, prev);
                    return newCourse;
                  });
                }}
              />
              <br />
              <p>Attendance: </p>
              <input
                name={`attendance`}
                value={courseState[index].attendance}
                onChange={(e) => {
                  setCourse((prev) => {
                    const { value } = e.target;
                    let newCourse = prev;
                    newCourse[index].attendance = value;
                    return newCourse;
                  });
                }}
              ></input>
              <p>%</p>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          handleClick(info.rollno);
        }}
      >
        Save
      </button>
    </div>
  );
}

export default EditStudent;
