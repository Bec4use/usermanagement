import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Department from "./Components/Category/Department";
import Profile from "./Components/Profile";
import AddDepartment from "./Components/Category/AddDepartment";
import Adduser from "./Components/Usermanagement/Adduser";
import Usermanagement from "./Components/Usermanagement/Usermanagement";
import Edituser from "./Components/Usermanagement/Edituser";
import LandingPage from "./Components/LandingPage";
import RegisterForm from "./Components/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="usersmanage" element={<Usermanagement />}>5</Route>
          <Route path="category" element={<Department />}>
          </Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="add_category" element={<AddDepartment />}></Route>
          <Route path="add_user" element={<Adduser />}></Route>
          <Route path="edit_user/:id" element={<Edituser />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}