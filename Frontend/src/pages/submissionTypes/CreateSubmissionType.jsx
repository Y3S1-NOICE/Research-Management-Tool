import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { createSubmissionType } from '../../api/submissionTypesApi';

const CreateSubmissionType = () => {
    const [submissionType, setSubmissionType] = useState({});
    const [checked, setChecked] = useState(true)

    const handleCreate = () => {
        createSubmissionType(submissionType)
            .then(res => console.log(res));
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'name': {
                setSubmissionType({...submissionType, name: value});
                break;
            }
            case 'folder': {
                setSubmissionType({...submissionType, folder: value});
                break;
            }
            case 'description': {
                setSubmissionType({...submissionType, description: value});
                break;
            }
            case 'published': {
                setChecked(!checked);
                setSubmissionType({...submissionType, published: value});
                console.log(checked)
                break;
            }
            default: {}
        }
    }

    return (
        <>
            <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Submission name"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                name="folder"
                label="Upload folder"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <label>Is publish? </label>
            <input type="checkbox" onChange={handleChange} value={checked} name="published" />
            <Button onClick={handleCreate}> Create</Button>
        </>
    );
}

export default CreateSubmissionType;