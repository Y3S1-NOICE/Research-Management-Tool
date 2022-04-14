import mapToUserModel from "../models/user.js";
import http from "../utils/httpStatusCodes.js";

const createUser = (req, res) => {
    const user = mapToUserModel(req.body);
    user.save((error) => {
        if(error){
            return res.status(http.BAD_REQUEST).json({
                isSuccessful: false,
                error
            });
        } else {
            return res.status(http.CREATED).json({
                isSuccessful: true,
                user
            })
        }
    });
}

export { createUser };