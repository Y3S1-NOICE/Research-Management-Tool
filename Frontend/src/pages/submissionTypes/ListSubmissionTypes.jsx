import { useEffect, useState } from "react"
import { deleteSubmissionType, fetchSubmissionTypes } from "../../api/submissionTypesApi";
import { handleError } from "../../helper/helper";
import EditSubmissionType from "./EditSubmissionType";

const ListSubmissionTypes = () => {
    const [submissionTypes, setSubmissionTypes] = useState([]);
    const [submissionType, setSubmissionType] = useState({});
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        handleFetchSubmissionTypes();
    },[]);

    const handleFetchSubmissionTypes = () => {
        fetchSubmissionTypes()
            .then(res => {
                console.log(res)
                res.data.isSuccessful ? 
                    setSubmissionTypes(res.data.responseData) : 
                    handleError();
            })
            .catch(() => handleError());
    }

    const handleDeleteSubmissionType = (id) => {
        deleteSubmissionType(`id=${id}`)
            .then((res) => {
                res.data.isSuccessful ? 
                    handleFetchSubmissionTypes() :
                    handleError()
            })
            .catch(() => handleError())
    }

    const setEditingSubmissionType = (payload) => {
        setSubmissionType(payload);
        setEditOpen(true);
    }

    return(
        <>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Submission Type</th>
                    <th scope="col">Folder Name</th>
                    <th scope="col">Visibilty</th>
                    <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {submissionTypes && submissionTypes.map((sub, index) => 
                     <tr key={index}>
                        <td>{sub.name}</td>
                        <td>{sub.folder}</td>
                        <td>{sub.published ? 'Published' : 'Hidden'}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => handleDeleteSubmissionType(sub._id)}>Delete</button>
                            <button className="btn btn-primary" onClick={() => setEditingSubmissionType(sub)}>Edit</button>
                        </td>
                        </tr>
                    )}
                  
                </tbody>
                </table>
                {editOpen && submissionType && 
                    <EditSubmissionType 
                        submissionType={submissionType}
                        setEditOpen={setEditOpen}
                        handleFetchSubmissionTypes={handleFetchSubmissionTypes}
                    />
                    }

        </>
    )

}

export default ListSubmissionTypes;