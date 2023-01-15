import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddSubjects() {
  const [inputData, setInputData] = useState({ subject: "", courses: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const handleChange = (e) => {
    let { name, value } = e.target.value;
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleAdd = async (e) => {
    const res = await fetch("/api/create-subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: state.info,
        subjects: { subject: inputData.subject, courses: inputData.courses },
      }),
    })
      .then(navigate("/faculty-data"))
      .then(window.location.reload());

    console.log(res.json());
  };

  return (
    <div>
      <p>Subject:</p>
      <input
        type="text"
        name="subject"
        value={inputData.subject}
        onChange={handleChange}
      />
      <p>Courses:</p>
      <input
        type="text"
        name="courses"
        value={inputData.courses}
        onChange={handleChange}
      />

      <button
        value={state.info}
        onClick={() => {
          handleAdd();
        }}
      >
        ADD
      </button>
    </div>
  );
}

export default AddSubjects;
