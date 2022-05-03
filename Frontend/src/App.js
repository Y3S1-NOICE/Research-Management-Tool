import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from "./pages/users/Users";
import RegisterUser from "./pages/users/RegisterUser";
import SubmissionTypes from "./pages/submissionTypes";
import Submissions from "./pages/submissions/Submissions";


const App = () =>{

    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Submissions />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/register" element={<RegisterUser />} />
          <Route path="/submission-types/" element={<SubmissionTypes />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App