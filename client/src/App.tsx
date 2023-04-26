import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Login } from "./Navbar/Login";
import { Navbar } from "./Navbar/Navbar";
import { Register } from "./Navbar/Register";
import { AdminPage } from "./Navbar/AdminPage";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />}/>
        </Routes>
      </main>
    </>
  );
}
