import mongoose from "mongoose";
import {v4} from 'uuid';

const messageSchema = new mongoose.Schema({
        id: {
            type: String,
            default: v4
        },
        content: {
            type: String,
            trim: true, 
            required: true,
        },
        pic: {
            type: String,
            required: false,
            // default:
            //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        sender: {
            type: String, 
            requried: true,
        }
    },
    {
        timestamps: true,
    }
)

export default messageSchema;