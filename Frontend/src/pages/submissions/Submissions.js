import { useEffect, useState } from "react";
import { fetchSubmissionTypes } from "../../api/submissionTypesApi";
import Uploader from "../../components/cards/Uploader";


export default function Submissions() {
    const [submissionTypes, setSubmissionTypes] = useState([]);

    useEffect(() => {
        handleFetchSubmissionTypes();
    },[]);

    const handleFetchSubmissionTypes = () => {
        fetchSubmissionTypes('?published=true')
            .then(res => {
                console.log(res)
                res.data.isSuccessful ? 
                    setSubmissionTypes(res.data.responseData) : 
                    handleError();
            })
            .catch(() => handleError());
    }

    return (
        <>
            {submissionTypes && submissionTypes.map((sub, index) => 
                <Uploader 
                    title={sub.name}
                    description={sub.description}
                    type={'submissions'}
                    folder={sub.folder}
                />
            )}
        </>
 
    );
}
