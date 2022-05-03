import { useEffect, useState } from "react"
import { handleError } from "../../helper/helper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import { deleteTemplate, fetchTemplates } from "../../api/templateApi";
import EditTemplate from "./EditTemplate";
import { getSubmission } from "../../api/submissionsApi";
import fileDownload from 'js-file-download'

const ListTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState({});
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        handleFetchTemplates();
    }, []);

    const handleFetchTemplates = () => {
        fetchTemplates()
            .then(res => {
                console.log(res)
                res.data.isSuccessful ?
                    setTemplates(res.data.responseData) :
                    handleError();
            })
            .catch(() => handleError());
    }

    const handleDeleteTemplate = (id) => {
        deleteTemplate(id)
            .then((res) => {
                res.data.isSuccessful ?
                    handleFetchTemplates() :
                    handleError()
            })
            .catch(() => handleError())
    }

    const setEditingTemplate = (payload) => {
        setTemplate(payload);
        setEditOpen(true);
    }

    const handleDownloadTemplate = (temp) => {
        getSubmission(temp.key)
        .then((res) => {
            fileDownload(res.data, `${temp.name}.pdf`)
          })
    }

    return (
        <>
        <h1>Templates</h1>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Template</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Upload Folder</TableCell>
                            <TableCell align="right">Visibilty</TableCell>
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {templates && templates.map((temp, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {temp.name}
                                </TableCell>
                                <TableCell align="right">{temp.description}</TableCell>
                                <TableCell align="right">{temp.folder}</TableCell>
                                <TableCell align="right">{temp.published ? 'Published' : 'Hidden'}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => setEditingTemplate(temp)}>Edit</Button>
                                    <Button onClick={() => handleDeleteTemplate(temp._id)}>Delete</Button>
                                    <Button onClick={() => handleDownloadTemplate(temp)}>Download</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {editOpen && template &&
                <EditTemplate
                    template={template}
                    setEditOpen={setEditOpen}
                    handleFetchTemplates={handleFetchTemplates}
                />
            }

        </>
    )

}

export default ListTemplates;