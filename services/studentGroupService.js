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
    const filter = {id: req.params.id || 'inavlidId' };
    const getSupervisorData = {
        supervisorId: req.body.supervisorId,
        status: "Topic Registered"
    }
    studentGroup.findOneAndUpdate(filter, getSupervisorData, (error, updatedGroupDetails) =>{
        !updatedGroupDetails ?
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
            error?
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, getSupervisorData));
    });
}

//Request coSupervisors
const requestCoSupervisor = (req, res) =>{
    const filter = {id: req.params.id || 'inavlidId' };
    const topicFilter = {id:req.params.id, status: "Topic Accepted"}
    const coSupervisorData = {
        coSupervisorId: req.body.coSupervisorId,
        status: "Co Supervisor Pending"
    }
    studentGroup.findOneAndUpdate(topicFilter, coSupervisorData, (error, groupDetails) =>{
        error ?
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
        !groupDetails ?
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, errorMessage.STUDENT_GROUP_WITH_STATUS_NOT_FOUND)) :
            res.status(http.OK)
                .json(jsonResponse(true, coSupervisorData))
    })
}

//Allocate panels to student groups or Deallocate panels from student groups
const allocateOrDeallocatePanels = (req, res) =>{
    const filter = {id: req.params.id || 'inavlidId' };
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
    const filter = {id: req.params.id || 'inavlidId' };
    const getEvaluationData = {
        id:req.body.id,
        evaluationType: req.body.evaluationType,
        marks:req.body.marks
    }
    studentGroup.findOneAndUpdate(filter, {$push: {evaluation : getEvaluationData}}, (error, groupDetails) =>{
        error ?
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
        !groupDetails?
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
                res.status(http.OK)
                    .json(jsonResponse(true, getEvaluationData))
    })
}

//Fetch specific studentGroup
const fetchStudentGroup = (req, res) =>{
    const filter = {id: req.params.id || 'inavlidId' };
    studentGroup.findOne(filter, (error, groupDetails) =>{
        error ?
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            !groupDetails ?
                res.status(http.NOT_FOUND)
                    .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
                res.status(http.OK)
                    .json(jsonResponse(true, groupDetails));
    })
}


//Add research topic
const addResearchTopic = (req, res) =>{
    const filter = {id: req.params.id || 'inavlidId' };
    const getTopicDetails = {
       researchTopic:{
           topic:req.body.topic,
           area:req.body.area
        }
       }
    studentGroup.findOneAndUpdate(filter, getTopicDetails, (error, updatedGroupDetails) =>{
        !updatedGroupDetails ?
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, errorMessage.STUDENT_GROUP_NOT_FOUND)) :
            error?
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, getTopicDetails));
    });
}

export {registerStudentGroup, fetchAllStudentGroups, requestSupervisor, requestCoSupervisor, allocateOrDeallocatePanels, assignMarks, fetchStudentGroup,addResearchTopic};