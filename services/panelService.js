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
const getAllPanels = ( req, res ) => {
    panel.find((error, allPanels) => {
        error ?
            res.status(http.SERVER_ERROR)
                .json(jsonResponse(false, error, error._message)) :
            res.status(http.OK)
                .json(jsonResponse(true, allPanels));
    })
}

//update panel
const updatePanel = (req, res) => {
    const filter = { id: req.params.id || 'inavlidId' };
    const getUpdatedData = { 
        id: req.body.id,
        supervisors: req.body.supervisors,
        allocatedGroups: req.body.allocatedGroups
     };

    panel.findOneAndUpdate(filter, req.body, getUpdatedData, (error, updatedPanel) => {
        !updatedPanel ? 
            res.status(http.NOT_FOUND)
                .json(jsonResponse(false, updatedPanel, errorMessage.PANEL_NOT_FOUND)) :
            error ? 
                res.status(http.BAD_REQUEST)
                    .json(jsonResponse(false, error, error._message)) :
                res.status(http.OK)
                    .json(jsonResponse(true, updatedPanel));
    });       
}
export { createPanel, getAllPanels, updatePanel };