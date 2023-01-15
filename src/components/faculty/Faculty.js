import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import decode from "jwt-decode";
import "./faculty.css";

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
    <div id="maninf">
      <h1 id="h1">Faculty Home Page</h1>
      <div id="headf">
        <h2 id="h2">{username}</h2>
      </div>
      <div id="btnsf">
        <Link to="/student-data">
          <button>Student Data</button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return <AllData />;
}
