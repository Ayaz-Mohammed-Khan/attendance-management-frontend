import { useQuery } from "react-query";
import Faculty from "./Faculty";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";

function FacultyData() {
  const cookies = new Cookies();
  const isAdmin = decode(cookies.get("token")).isAdmin;
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:5000/api/show-faculty").then((res) => res.json())
  );

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred: {error.message}</h1>;
  else {
    return (
      <div>
        <h1>Faculty Database</h1>
        {data.response.map((element, index) => {
          return <Faculty key={index} info={element} />;
        })}
        <Link to="/faculty-data/add-new-faculty">
          <button style={{ display: isAdmin === true ? "block" : "none" }}>
            <p>Add FACULTY</p>
          </button>
        </Link>
      </div>
    );
  }
}

export default FacultyData;
