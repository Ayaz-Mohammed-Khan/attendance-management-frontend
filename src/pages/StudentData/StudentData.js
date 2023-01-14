import { useQuery } from "react-query";
import Student from "./Student";

function AllData() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:5000/api/show-student").then((res) => res.json())
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>An error has occurred: {error.message}</h1>;

  return (
    <div>
      <h1>Student Data</h1>
      {data.response.map((element, index) => {
        return <Student key={index} info={element} />;
      })}
    </div>
  );
}

export default function App() {
  return <AllData />;
}
