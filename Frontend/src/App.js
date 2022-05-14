import React from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from "./pages/users/Users";
import RegisterUser from "./pages/users/RegisterUser";
import SubmissionTypes from "./pages/submissionTypes";
import Submissions from "./pages/submissions/Submissions";
import Home from "./pages/home/Home";
import Templates from "./pages/templates";
import ButtonAppBar from "./components/navBar/Navbar";
import MyGroup from "./pages/studentGroup/MyGroup";
import RegisterStudentGroup from "./pages/studentGroup/RegisterStudentGroup";
import AllocatedStudentGroups from "./pages/studentGroup/AllocatedStudentGroups";
import AllocatePanels from "./pages/studentGroup/AllocatePanels";
import CreateMarkingScheme from "./pages/markingScheme/CreateMarkingScheme";
import ListMarkingSchemes from "./pages/markingScheme/ListMarkingSchemes";
import ListSubmissions from "./pages/submissions/ListSubmissions";


const App = () =>{

    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/signup" element={<RegisterUser />} />
          <Route path="/submission-types/" element={<SubmissionTypes />} />
          <Route path="/templates/" element={<Templates />} />
          <Route path="/marking-schemes" element={<CreateMarkingScheme />} />
          <Route path="/studentgroup/" element={<MyGroup />} />
          <Route path="/studentgroup/registration" element={<RegisterStudentGroup />} />
          <Route path="/panel/studentgroup" element={<AllocatedStudentGroups />} />
          <Route path="/panels" element={<AllocatePanels/>} />
          <Route path="/submissions-list" element={<ListSubmissions/>} />
        </Routes>
      </BrowserRouter>
    )
}

export default App