import panel from "../models/panel.js";
import http from "../utils/httpStatusCodes.js";
import { jsonResponse } from "../utils/serviceUtilities.js";
import { errorMessage } from "../utils/errorMessages.js";

//create panel
const createPanel =  (req, res ) => {
    const newPanel = panel(req.body);
    newPanel.save((error) => {
        error ? 
            res.status(http.BAD_REQUEST)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.CREATED)
                .json(jsonResponse(true, newPanel));
    });
}

//fetch panels
const getAllPanels = ( res ) =>{
    panel.find((error, panels) =>{
        error ?
            res.staus(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.OK)
                .json(jsonResponse(true, panels));
    })
}

export { createPanel, getAllPanels };