import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from "./pages/users/Users";
import RegisterUser from "./pages/users/RegisterUser";

const App = () =>{

    return (
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/register" element={<RegisterUser />} />

        </Routes>
      </BrowserRouter>
    )
}

export default App