import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String, required: true, unique: true,
    }, 
    profileImageUrl: {
        type: String, required: false
    },
    name: {
        type: String, required: true,
    },
    role: {
        type: String, required: true,
    },
    email: {
        type: String, required: true,
    },
    phone: {
        type: String, required: false,
    },
    groups: {
        // will change after student_group schema is created 
        type: String, required: false,
    },
    password: {
        type: String, required: true,
    }
});

const mapToUserModel = mongoose.model('user', userSchema);

export default mapToUserModel;