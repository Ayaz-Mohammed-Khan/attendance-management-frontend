import { useState } from "react";

function AddCourse() {
  const [inputData, setInputData] = useState({ course: "", attendance: 0 });

  const handleChange = (e) => {
    let { name, value } = e.target.value;
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

  return (
    <div>
      <input
        type="text"
        name="course"
        value={inputData.course}
        onChange={handleChange}
      />
      <input
        type="number"
        min="0"
        max="100"
        name="attendance"
        value={inputData.attendance}
        onChange={handleChange}
      />
    </div>
  );
}

export default AddCourse;
