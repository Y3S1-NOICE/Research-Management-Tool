import studentGroup from "../models/studentGroup.js";
import http from "../utils/httpStatusCodes.js";
import { jsonResponse } from "../utils/serviceUtilities.js";

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
    const fields = 'id status topicEvaluationPanelId presentationEvaluationPanelId'
    var query = studentGroup.find({}).select(fields); //Only returns requested fields
    query.exec((error, studentGroups) => {
        error ?
            res.staus(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.OK)
                .json(jsonResponse(true, studentGroups));
    })
}

export {registerStudentGroup, fetchAllStudentGroups};