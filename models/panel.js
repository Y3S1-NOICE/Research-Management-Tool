import mongoose from "mongoose";
// import evaluationSchema from "./evaluation.js";

const panelSchema = new mongoose.Schema({
        id: {
            type: String, 
            required: true, 
            unique: true,
        },
        supervisors: [String],
        allocatedGroups: [String],
        //evaluation: [evaluationSchema], required: false,
    },
    {
        timestamps: true,
    }
);

const panel = mongoose.model('panel', panelSchema);

export default panel;