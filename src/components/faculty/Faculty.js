import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";
import axios from "axios";

function AllData() {
  const cookies = new Cookies();
  const isAdmin = decode(cookies.get("token")).isAdmin;

  const f = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/display-faculty"
    );
    return data;
  };
  console.log(f);
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

export default function App() {
  return <AllData />;
}
