import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components
import Header from "./components/partials/Header.jsx";
import Home from "./components/home.jsx";
import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import Logout from "./components/logout.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const userInfo = localStorage.getItem('user');


  const [user,setUser] = useState(JSON.parse(userInfo));


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login user={user} setUser={setUser}/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
