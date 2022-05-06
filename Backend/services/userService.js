import user from "../models/user.js";
import http from "../utils/httpStatusCodes.js";
import { jsonResponse } from "../utils/serviceUtilities.js";
import { errorMessage } from "../utils/errorMessages.js";

const findUsers = (req, res) => {
    const filter = {};
    const {id, name, role, interestArea, email} = req.query;
        id && (filter.id = id); 
        name && (filter.name = name);
        role && (filter.role = role);
        interestArea && (filter.interestArea = interestArea);
        email && (filter.email = email);
    user.find(filter, (error, users) => {
        error ? 
            res.status(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.OK)
                .json(jsonResponse(true, users));
        })
}

const registerUser = (req, res) => {
    const newUser = user(req.body);
    newUser.save((error) => {
        error ? 
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.CREATED)
                .json(jsonResponse(true, newUser));
    });
}

const updateUser = (req, res) => {
    const filter = { id: req.query.id || 'inavlidId' };
    const getUpdatedData = { new: true };

    user.findOneAndUpdate(filter, req.body, getUpdatedData, (error, updatedUser) => {
        !updatedUser ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, updatedUser, errorMessage.USER_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, updatedUser));
    });       
}

const deleteUser = (req, res) => {
    const filter = { id: req.query.id || 'inavlidId' };

    user.findOneAndDelete(filter, (error, deletedUser) => {
        !deletedUser ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, deletedUser, errorMessage.USER_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, deletedUser));
    });       
}

export { registerUser, updateUser, deleteUser, findUsers };