import { useQuery } from "react-query";
import Faculty from "./Faculty";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";
import "../StudentData/student.css";
import "./Faculty.css";

function FacultyData() {
  const cookies = new Cookies();
  const isAdmin = decode(cookies.get("token")).isAdmin;

  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:5000/api/show-faculty").then((res) => res.json())
  );
  if (isLoading) return <h1 className="loading-text">Loading...</h1>;
  if (error)
    return (
      <h1 className="error-text">An error has occurred: {error.message}</h1>
    );
  else {
    return (
      <div className="student-data-container">
        <h1 className="student-data-heading">Faculty Database</h1>
        <table className="table" cellSpacing="0" cellPadding="0">
          <tbody>
            <tr id="table_header">
              <th>userID</th>
              <th>Name</th>
              <th>Subjects</th>
            </tr>

            {data.response.map((element, index) => {
              return <Faculty key={index} info={element} />;
            })}
            <Link to="/faculty-data/add-new-faculty">
              <button
                className="table_add_student"
                style={{ display: isAdmin === true ? "block" : "none" }}
              >
                <p>Add Faculty</p>
              </button>
            </Link>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FacultyData;
