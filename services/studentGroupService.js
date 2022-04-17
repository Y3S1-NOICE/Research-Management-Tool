import studentGroup from "../models/studentGroup.js";
import http from "../utils/httpStatusCodes.js";
import { jsonResponse } from "../utils/serviceUtilities.js";
import { errorMessage } from "../utils/errorMessages.js";

//Create new student group
const registerStudentGroup = (req, res) =>{
    const newStudentGroup = studentGroup(req.body);
    newStudentGroup.save((error) =>{
        error ?
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.CREATED)
                .json(jsonResponse(true, newStudentGroup));
    });
}

//Fetch all student groups
const fetchAllStudentGroups = (req, res) =>{
    studentGroup.find((error, studentGroups) =>{
        error ?
            res.staus(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.OK)
                .json(jsonResponse(true, studentGroups));
    })
}

//Request supervisors
const requestSupervisor = (req, res) =>{
    const filter = {id: req.params.id};
    const getUpdatedData = {
        supervisorId: req.body.supervisorId,
        status: "Topic Registered"
    }
    studentGroup.findOneAndUpdate(filter, getUpdatedData, (error, updatedGroupDetails) =>{
        !updatedGroupDetails ?
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, updatedGroupDetails, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
            error?
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, getUpdatedData));
    });
}

//Request coSupervisors
const requestCoSupervisor = (req, res) =>{
    const filter = {id: req.params.id};
    const getUpdatedData = {
        coSupervisorId: req.body.coSupervisorId,
        status: "Co Supervisor Pending"
    }
    studentGroup.findOneAndUpdate(filter, getUpdatedData, (error, updatedGroupDetails) =>{
        error?
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            !updatedGroupDetails ?
                res.status(http.NOT_FOUND)
                    .json(jsonResponse(false, updatedGroupDetails, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
                updatedGroupDetails.status === "Topic Accepted" ? //Checks if topic is accepted
                    res.status(http.OK)
                        .json(jsonResponse(true, getUpdatedData)) :
                    res.status(http.BAD_REQUEST)
                        .json(jsonResponse(false, errorMessage.TOPIC_NOT_ACCEPTED));
    });
}





export {registerStudentGroup, fetchAllStudentGroups, requestSupervisor, requestCoSupervisor};