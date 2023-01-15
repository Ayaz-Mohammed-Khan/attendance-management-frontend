import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./student.css";

function AddStudent() {
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [data, setData] = useState({
    name: "",
    rollno: 0,
    year: 0,
    degree: "",
  });

  const addComponent = () => {
    setComponents([...components, { course: "", attendance: 0 }]);
  };

  const handleChange = (e) => {
    console.log(data, components);
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleADD = async () => {
    var courseArray = document.getElementsByClassName("newCourse");
    var attendanceArray = document.getElementsByClassName("newAttendance");

    for (var i = 0; i < courseArray.length; i++) {
      let attendanceVal = parseInt(attendanceArray.item(i).value);
      const courseVal = courseArray.item(i).value;
      if (attendanceVal > 100) {
        alert("Attendance percentage cannot be greater than 100");
      } else if (attendanceVal < 0) {
        alert("Attendance percentage cannot be less than 100");
      }
      components[i].course = courseVal;
      components[i].attendance = attendanceVal;
    }

    console.log(data, components);
    await fetch("/api/create-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        rollno: data.rollno,
        year: data.year,
        degree: data.degree,
        courses: components,
      }),
    })
      .then(navigate("/student-data"))
      .then(window.location.reload());
  };
  return (
    <div>
      <p>Name: </p>
      <input
        type="text"
        value={data.name}
        name="name"
        onChange={handleChange}
      />
      <p>RollNo :</p>
      <input
        type="number"
        value={data.rollno}
        name="rollno"
        onChange={handleChange}
      />
      <p>Year: </p>
      <input
        type="number"
        value={data.year}
        name="year"
        onChange={handleChange}
      />
      <p>Degree: </p>
      <input
        type="text"
        value={data.degree}
        name="degree"
        onChange={handleChange}
      />
      <div className="display-flex-row">
        <p>Courses: </p>
        <div className="display-flex-col">
          {components.map((item, i) => (
            <div key={i}>
              <p>Course:</p>
              <input type="text" className="newCourse" />
              <p>Attendance</p>
              <input type="number" className="newAttendance" />
            </div>
          ))}
        </div>
      </div>

      <button onClick={addComponent}>ADD COURSE</button>
      <button onClick={handleADD}>ADD STUDENT</button>
    </div>
  );
}

export default AddStudent;
