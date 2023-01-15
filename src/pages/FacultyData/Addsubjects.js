import { useState } from "react";

function AddSubjects() {
  const [inputData, setInputData] = useState({ subjects:"",courses: "" });

  const handleChange = (e) => {
    let { name, value } = e.target.value;
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={inputData.subject}
        onChange={handleChange}
      />
      <input
        type="text"
    
        name="courses"
        value={inputData.courses}
        onChange={handleChange}
      />
    </div>
  );
}

export default AddSubjects;
