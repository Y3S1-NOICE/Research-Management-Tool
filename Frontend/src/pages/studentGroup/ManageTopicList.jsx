import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Grid, Paper, TablePagination } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import toast, { Toaster } from 'react-hot-toast';
import Stack from '@mui/material/Stack';
import { findUsers } from "../../api/usersApi";
import { getAuth } from '../../helper/helper.js';
import { fetchStudentGroup, requestCoSupervisor, requestSupervisor } from '../../api/studentGroupApi';
import AddTopic from '../../components/manage-topics/AddTopic';

export default function ManageTopics() {
    const [group, setGroup] = useState([]);
    const [editOpen, setEditOpen] = useState(false);

    useEffect (() =>{
        handleGetGroups();
    },[]);

    const handleGetGroups = async() =>{
        let id = getAuth().id;
        console.log(id)
        try{
            const res = await fetchStudentGroup(`supervisorId=${id}`);
            setGroup(res.data.responseData);
            console.log(res.data.responseData)
        }catch(error){
            console.log(error)
        } 
    }

    const id = getAuth().id;

    const setEditingStatus = (payload) => {
        setGroup(payload);
        setEditOpen(true);
    }

    return (
        <div>
            <center>
                <TableContainer component={Paper} style={{width:"1400px"}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell align="left"><b>Topic</b></TableCell>
                            <TableCell align="center"><b>Area</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {group.map((group, index) => (
                                group.supervisorId === id && (
                                    <>
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row" align="left">{group.researchTopic.topic}</TableCell>
                                            <TableCell align="center">{group.researchTopic.area}</TableCell>
                                            <TableCell align="center">{group.status}</TableCell>
                                            <TableCell align="center">
                                                <Stack direction="row" spacing={1}>
                                                    <Button>Update Status</Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </center>
            {editOpen && group &&
                <EditTopicStatus
                    group={group}
                    setEditOpen={setEditOpen}
                    handleGetGroups={handleGetGroups}
                />
            }
        </div>
    )
}