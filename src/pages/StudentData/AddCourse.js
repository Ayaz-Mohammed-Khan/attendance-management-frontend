import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./student.css";

function AddCourse() {
  const [inputData, setInputData] = useState({ course: "", attendance: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "attendance") {
      if (value > 100) {
        value = 100;
      } else if (value < 0) {
        value = 0;
      }
    }
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAdd = async (e) => {
    const res = await fetch("/api/create-courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rollno: state.info,
        courses: { course: inputData.course, attendance: inputData.attendance },
      }),
    })
      .then(navigate("/student-data"))
      .then(window.location.reload());

    console.log(res.json());
  };

  return (
    <div id="add_newcourse_container">
      <p>Course: </p>
      <input
        type="text"
        name="course"
        value={inputData.course}
        onChange={handleChange}
      />
      <p>Attendance: </p>
      <input
        type="number"
        min="0"
        max="100"
        name="attendance"
        value={inputData.attendance}
        onChange={handleChange}
      />
      <div>
        <button
          id="add_newcourse_button"
          value={state.info}
          onClick={() => {
            handleAdd();
          }}
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default AddCourse;
