import LoginPrimary from "./components/login/LoginPrimary";
import LoginSecondary from "./components/login/LoginSecondary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FacultyData from "./pages/FacultyData/FacultyData";
import StudentData from "./pages/StudentData/StudentData";
import Admin from "./components/admin/Admin";
import Faculty from "./components/faculty/Faculty";
import EditStudent from "./pages/StudentData/EditStudent";
import AddCourse from "./pages/StudentData/AddCourse";
import AddStudent from "./pages/StudentData/AddStudent";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPrimary />}></Route>
        <Route
          exact
          path="/adminlogin"
          element={<LoginSecondary id="admin" />}
        ></Route>
        <Route
          exact
          path="/facultylogin"
          element={<LoginSecondary id="faculty" />}
        ></Route>
        <Route path="/faculty/home" element={<Faculty />}></Route>
        <Route path="/admin/home" element={<Admin />}></Route>
        <Route path="/faculty-data" element={<FacultyData />}></Route>
        <Route path="/student-data" element={<StudentData />}></Route>
        <Route
          path="student-data/edit-student/:id"
          element={<EditStudent />}
        ></Route>
        <Route
          path="/student-data/edit-student/:id/add-course"
          element={<AddCourse />}
        />
        <Route path="/student-data/add-new-student" element={<AddStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
