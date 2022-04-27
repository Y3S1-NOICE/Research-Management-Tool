import mongoose from "mongoose";

const researchTopicSchema = new mongoose.Schema({
    topic: {
        type: String, required: true,
    },

    area: {
        type: String, required: true,
    }
    
});

export default researchTopicSchema;
