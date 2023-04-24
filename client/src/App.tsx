import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Navbar } from './Navbar';
import { Register } from "./Register";

export default function App() {
  return(
    <>
    <Navbar />
    <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/api/users/register" element={<Register />} />
    </Routes>
    </main>
    </>
  )
};