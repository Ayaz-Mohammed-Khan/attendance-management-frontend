import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./student.css";
import Cookies from "universal-cookie";
import decode from "jwt-decode";

function EditStudent() {
  const cookies = new Cookies();

  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const isAdmin = decode(cookies.get("token")).isAdmin;

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
  const handleSave = async () => {
    console.log(info, courseState.objects);
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

  const preventFaculty = (e) => {
    console.log("Sorry, faculty cannot update student record");
  };

  return (
    <div id="edit_student_container">
      <p>Name :</p>
      <input
        name="name"
        type="text"
        value={info.name}
        onChange={isAdmin === true ? handleChange : preventFaculty}
        required
      />
      <p>Roll No: </p>
      <input
        type="number"
        min="1"
        name="rollno"
        value={info.rollno}
        onChange={isAdmin === true ? handleChange : preventFaculty}
        required
      />
      <p>Year: </p>
      <input
        type="number"
        min="1"
        name="year"
        value={info.year}
        onChange={isAdmin === true ? handleChange : preventFaculty}
        required
      />
      <p>Degree: </p>
      <input
        type="text"
        name="degree"
        value={info.degree}
        onChange={isAdmin === true ? handleChange : preventFaculty}
        required
      />
      <p>Courses: </p>

      <ol id="edit_student_courselist">
        {courseState.objects.map((element, index) => {
          return (
            <li className="edit_student_course" key={index}>
              <form>
                <p>Course: </p>
                <input
                  name={`course`}
                  type="text"
                  value={courseState.objects[index].course}
                  onChange={(e) => {
                    if (isAdmin === false) {
                      preventFaculty();
                    } else {
                      const { value } = e.target;
                      let arraycopy = [...courseState.objects];
                      arraycopy[index].course = value;
                      setCourse({ ...courseState, objects: arraycopy });
                    }
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
                    if (isAdmin === false) {
                      preventFaculty();
                    } else {
                      let { value } = e.target;
                      if (value > 100) {
                        value = 100;
                      } else if (value < 0) {
                        value = 0;
                      }
                      let arraycopy = [...courseState.objects];
                      arraycopy[index].attendance = value;
                      setCourse({ ...courseState, objects: arraycopy });
                    }
                  }}
                  required
                />
              </form>
              <button
                className="delete_course_button"
                style={{ display: isAdmin === true ? "block" : "none" }}
                value={index}
                onClick={handleDelete}
              >
                Delete Course
              </button>
            </li>
          );
        })}
      </ol>
      <div id="edit_student_buttons">
        <button
          className="addcourse_student_button"
          value={state.information.rollno}
          onClick={(e) => {
            navigate(
              `/student-data/edit-student/${e.target.value}/add-course`,
              {
                state: { info: state.information.rollno },
              }
            );
          }}
        >
          + New Course
        </button>
        <button
          className="save_student_button"
          onClick={() => {
            handleSave(info.rollno);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditStudent;
