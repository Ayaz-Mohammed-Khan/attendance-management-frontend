import { useQuery } from "react-query";
import Faculty from "./Faculty";

function FacultyData() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:5000/api/show-faculty").then((res) => res.json())
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred: {error.message}</h1>;
  else {
    return (
      <div>
        <h1>Faculty Database</h1>
        {data.response.map((element,index)=>{
          return <Faculty key={index} info={element}/>

        })}
      </div>
    );
  }
}

export default FacultyData;
