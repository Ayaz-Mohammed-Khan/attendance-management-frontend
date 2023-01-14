import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditFaculty() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        username: state.information.username,
        name: state.information.name,
     
      })
    const handleDeleteSubjects=async(e)=>{
        await fetch("/api/delete-subjects",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                username: info.username,
                index: e.target.value,
              }),
        })
        .then(navigate("/faculty-data"))
        .then(window.location.reload())
    }
    const handleClick = async (param) => {
        let res = await fetch("/api/update-faculty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: info.username,
            name: info.name,
            subjects: subjectState.objects,
          }),
        });
        const result = await res.json();
        if (result.message === "success") {
          navigate("/faculty-data");
        }
      };
    


    const[subjectState,setSubject]=useState({
        object:state.information.subjects
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };
    
return(
    <div>
        <p>UserName:</p>
        <input 
            username="username"
            type="text"
            value={info.name}
            onchange={handleChange}
            required
            />
        <p>Name:</p>
        <input
        name="name"
        type="text"
        value={info.name}
        onchange={handleChange}
        required
        />
        <p>Subjects:</p>

        {/* <ul>
        {subjectState.objects.map((element, index) => {
          return (
            <li key={index}>
              <p>Subject: </p>
              <input
                name={`subject`}
                type="text"
                value={subjectState.objects[index].subject}
                onChange={(e) => {
                  const { value } = e.target;
                  let arraycopy = [...subjectState.objects];
                  arraycopy[index].subject = value;
                  setSubject({ ...subjectState, objects: arraycopy });
                }}
                required
              />
              <br />
              <p>Courses: </p>
              <input
                name={`courses`}
                type="text"
                value={subjectState.objects[index].courses}
                onChange={(e) => {
                    const { value } = e.target;
                    let arraycopy = [...subjectState.objects];
                    arraycopy[index].courses = value;
                    setSubject({ ...subjectState, objects: arraycopy });
                  }}
                  required
              />
              <button value={index} onClick={handleDeleteSubjects}>
                Delete Subjects
              </button>
            </li>
          );
        })}
      </ul> */}
      <button>Add Course</button>
      <button
        onClick={() => {
          handleClick(info.username);
        }}
      >
        Save
      </button>
    </div>
)

    }
    
export default EditFaculty;