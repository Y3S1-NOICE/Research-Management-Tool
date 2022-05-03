import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from "./pages/users/Users";
import RegisterUser from "./pages/users/RegisterUser";
import SubmissionTypes from "./pages/submissionTypes";
import Submissions from "./pages/submissions/Submissions";
import Home from "./pages/home/Home";
import Templates from "./pages/templates";


const App = () =>{

    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/register" element={<RegisterUser />} />
          <Route path="/submission-types/" element={<SubmissionTypes />} />
          <Route path="/templates/" element={<Templates />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App