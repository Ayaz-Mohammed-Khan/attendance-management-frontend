import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditStudent() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: state.information.name,
    rollno: state.information.rollno,
    year: state.information.year,
    degree: state.information.degree,
  });

  const handleDelete = async (e) => {
    await fetch("/api/delete-courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rollno: info.rollno,
        index: e.target.value,
      }),
    })
      .then(navigate("/student-data"))
      .then(window.location.reload());
  };
  const handleClick = async () => {
    let res = await fetch("/api/update-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: state.information.rollno,
        name: info.name,
        rollno: info.rollno,
        year: info.year,
        degree: info.degree,
        courses: courseState.objects,
      }),
    });
    const result = await res.json();
    console.log(result);
    if (result.message) {
      navigate("/student-data");
    }
  };

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
        type="text"
        value={info.name}
        onChange={handleChange}
        required
      />
      <p>Roll No: </p>
      <input
        type="number"
        min="1"
        name="rollno"
        value={info.rollno}
        onChange={handleChange}
        required
      />
      <p>Year: </p>
      <input
        type="number"
        min="1"
        name="year"
        value={info.year}
        onChange={handleChange}
        required
      />
      <p>Degree: </p>
      <input
        type="text"
        name="degree"
        value={info.degree}
        onChange={handleChange}
        required
      />
      <p>Courses: </p>

      <ul>
        {courseState.objects.map((element, index) => {
          return (
            <li key={index}>
              <p>Course: </p>
              <input
                name={`course`}
                type="text"
                value={courseState.objects[index].course}
                onChange={(e) => {
                  const { value } = e.target;
                  let arraycopy = [...courseState.objects];
                  arraycopy[index].course = value;
                  setCourse({ ...courseState, objects: arraycopy });
                }}
                required
              />
              <br />
              <p>Attendance: </p>
              <input
                name={`attendance`}
                type="number"
                min="0"
                max="100"
                value={courseState.objects[index].attendance}
                onChange={(e) => {
                  let { value } = e.target;
                  if (value > 100) {
                    value = 100;
                  } else if (value < 0) {
                    value = 0;
                  }
                  let arraycopy = [...courseState.objects];
                  arraycopy[index].attendance = value;
                  setCourse({ ...courseState, objects: arraycopy });
                }}
                required
              />
              <p>%</p>
              <button value={index} onClick={handleDelete}>
                Delete Course
              </button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          navigate("/add-course");
        }}
      >
        Add Course
      </button>
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
