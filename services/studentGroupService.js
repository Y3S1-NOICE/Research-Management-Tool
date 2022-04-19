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
            res.status(http.SERVER_ERROR)
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
                .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
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
    const topicFilter = {id:req.params.id, status: "Topic Accepted"}
    const getUpdatedData = {
        coSupervisorId: req.body.coSupervisorId,
        status: "Co Supervisor Pending"
    }

    studentGroup.findOne(filter, (error, groupDetails) =>{
        error ?
        res.status(http.BAD_REQUEST)
            .json(jsonResponse(false, error, error._message)) :
        !groupDetails ?
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
            studentGroup.findOneAndUpdate(topicFilter, getUpdatedData, (error, details) =>{
                error ?
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                !details ?
                    res.status(http.NOT_FOUND)
                        .json(jsonResponse(false, errorMessage.TOPIC_NOT_ACCEPTED)) :
                    res.status(http.OK)
                        .json(jsonResponse(true, getUpdatedData))
            })
    })
}

//Allocate panels to student groups or Deallocate panels from student groups
const allocateOrDeallocatePanels = (req, res) =>{
    const filter = {id: req.params.id};
    if(req.body.presentationEvaluationPanelId && req.body.topicEvaluationPanelId){ //Check if both panels are in the reqBody
        const getPanelData ={ //Assign body data
            topicEvaluationPanelId: req.body.topicEvaluationPanelId,
            presentationEvaluationPanelId: req.body.presentationEvaluationPanelId
        }
        studentGroup.findOneAndUpdate(filter, getPanelData,(error, updatedGroupDetails) =>{
            error ?
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                !updatedGroupDetails ?
                    res.status(http.NOT_FOUND)
                        .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
                    res.status(http.OK)
                        .json(jsonResponse(true, getPanelData))
        })
    }else if(req.body.topicEvaluationPanelId){//Check panel type in the reqBody
        const getPanelData = { //Assign body data
            topicEvaluationPanelId: req.body.topicEvaluationPanelId
        }
        studentGroup.findOneAndUpdate(filter, getPanelData,(error, updatedGroupDetails) =>{
            error ?
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                !updatedGroupDetails ?
                    res.status(http.NOT_FOUND)
                        .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
                    res.status(http.OK)
                        .json(jsonResponse(true, getPanelData))
        })
    }else if(req.body.presentationEvaluationPanelId){//Check panel type in the reqBody
        const getPanelData ={ //Assign body data
            presentationEvaluationPanelId: req.body.presentationEvaluationPanelId
        }
        studentGroup.findOneAndUpdate(filter, getPanelData,(error, updatedGroupDetails) =>{
            error ?
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                !updatedGroupDetails ?
                    res.status(http.NOT_FOUND)
                        .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
                    res.status(http.OK)
                        .json(jsonResponse(true, getPanelData))
        })
    }else{//Invalid req body
        res.status(http.BAD_REQUEST)
            .json(jsonResponse(false, errorMessage.INVALID_REQUEST));
    }
}

//Assign Marks to student groups
const assignMarks = (req, res) =>{
    const filter = {id: req.params.id};
    const getEvaluationDetails = {
        id:req.body.id,
        evaluationType: req.body.evaluationType,
        marks:req.body.marks
    }
    studentGroup.findOneAndUpdate(filter, {$push: {evaluation : getEvaluationDetails}}, (error, groupDetails) =>{
        error ?
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
        !groupDetails?
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
                res.status(http.OK)
                    .json(jsonResponse(true, getEvaluationDetails))
    })
}

export {registerStudentGroup, fetchAllStudentGroups, requestSupervisor, requestCoSupervisor, allocateOrDeallocatePanels, assignMarks};