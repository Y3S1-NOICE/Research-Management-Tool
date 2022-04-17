import mongoose from "mongoose";

const panelSchema = new mongoose.Schema({
        id: {
            type: String, 
            required: true, 
            unique: true,
        }, 
        supervisors: [String],
        allocatedGroups: [String],
        groupStatus: {
            type: String, 
            required: true,
        },
        panelType: {
            type: String, 
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const panel = mongoose.model('panel', panelSchema);

export default panel;