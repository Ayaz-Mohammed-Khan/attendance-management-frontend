import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Student from "./Student";
import Cookies from "universal-cookie";
import "./student.css";
import decode from "jwt-decode";

function AllData() {
  const cookies = new Cookies();
  const isAdmin = decode(cookies.get("token")).isAdmin;
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:5000/api/show-student").then((res) => {
      return res.json();
    })
  );

  if (isLoading) return <h1 id="loading-text">Loading...</h1>;

  if (error)
    return <h1 id="error-text">An error has occurred: {error.message}</h1>;
  else {
    return (
      <div id="student-data-container">
        <h1 id="student-data-heading">Student Data</h1>
        <table id="table" cellSpacing="0" cellPadding="0">
          <tbody>
            <tr id="table_header">
              <th>Name</th>
              <th>Roll No.</th>
              <th>Year</th>
              <th>Degree</th>
              <th>Courses</th>
            </tr>

            {data.response.map((element, index) => {
              return <Student key={index} info={element} />;
            })}
            <Link to="/student-data/add-new-student">
              <button
                id="table_add_student"
                style={{ display: isAdmin === true ? "block" : "none" }}
              >
                <p>Add Student</p>
              </button>
            </Link>
          </tbody>
        </table>
      </div>
    );
  }
}

export default function App() {
  return <AllData />;
}
