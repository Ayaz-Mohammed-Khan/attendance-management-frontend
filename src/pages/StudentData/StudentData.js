import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Student from "./Student";

function AllData() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:5000/api/show-student").then((res) => res.json())
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>An error has occurred: {error.message}</h1>;
  else {
    return (
      <div>
        <h1>Student Data</h1>
        {data.response.map((element, index) => {
          return <Student key={index} info={element} />;
        })}
        <button
          onClick={() => {
            navigate("/student-data/add-new-student");
          }}
        >
          ADD STUDENT
        </button>
      </div>
    );
  }
}

export default function App() {
  return <AllData />;
}
