import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  );
}