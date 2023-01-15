import { useState } from "react";
import "./Faculty.css";
import { useNavigate } from "react-router-dom";

function AddFaculty() {
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [data, setData] = useState({
    username: "",
    name: "",
  });

  const addComponent = () => {
    setComponents([...components, { subject: "", courses: "" }]);
  };

  const handleChange = (e) => {
    console.log(data, components);
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleADD = async () => {
    var subjectArray = document.getElementsByClassName("newSubject");
    var coursesArray = document.getElementsByClassName("newAttendance");

    for (var i = 0; i < subjectArray.length; i++) {
      let subjectVal = subjectArray.item(i).value;
      const coursesVal = coursesArray.item(i).value;

      components[i].subject = subjectVal;
      components[i].courses = coursesVal;
    }

    console.log(data, components);
    await fetch("/api/create-faculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        name: data.name,
        subjects: components,
      }),
    })
      .then(navigate("/faculty-data"))
      .then(window.location.reload());
  };
  return (
    <div id="add_newfaculty">
      <p>UserName: </p>
      <input
        type="text"
        value={data.username}
        name="username"
        onChange={handleChange}
      />
      <p>Name: </p>
      <input
        type="text"
        value={data.name}
        name="name"
        onChange={handleChange}
      />
      <div className="display-flex-row">
        <p>Subjects: </p>
        <div className="display-flex-col">
          {components.map((item, i) => (
            <div key={i} className="add_newfaculty_sub">
              <p>Subject:</p>
              <input type="text" className="newSubject" />
              <p>Courses:</p>
              <input type="text" className="newAttendance" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <button id="faculty_add_subject" onClick={addComponent}>
          + SUBJECT
        </button>
      </div>

      <button id="faculty_add_faculty" onClick={handleADD}>
        ADD FACULTY
      </button>
    </div>
  );
}

export default AddFaculty;
