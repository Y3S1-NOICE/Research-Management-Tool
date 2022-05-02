import CreateSubmissionType from "./CreateSubmissionType";
import ListSubmissionTypes from "./ListSubmissionTypes";

const SubmissionTypes = () => {
    return (
        <>
        <div className="">
            <div className="row">
                <div className="col-7">
                    <ListSubmissionTypes />
                </div>
                <div className="col-5">
                    <CreateSubmissionType />
                </div>
            </div>
        </div>
        </>
    )
}

export default SubmissionTypes;

