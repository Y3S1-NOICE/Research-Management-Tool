import mongoose from "mongoose";
import researchTopicSchema from "./researchTopic.js";
import evaluationSchema from "./evaluation.js";

const studentGroupSchema = new mongoose.Schema({
    id: {
        type: String, required: true, unique: true,
    },
    
    researchTopic: researchTopicSchema, //SubDoc reaserchTopic

    studentId: [String],

    supervisorId: {
        type: String,
    },

    coSupervisorId: {
        type: String,
    },

    topicEvaluationPanelId: {
        type: String,
    },

    presentationEvaluationPanelId: {
        type: String,
    },
    
    status: {
        type: String,
    },
    
    evaluation: evaluationSchema, required: false, //SubDoc evaluation

});

const studentGroup = mongoose.model('studentGroup', studentGroupSchema);

export default studentGroup;