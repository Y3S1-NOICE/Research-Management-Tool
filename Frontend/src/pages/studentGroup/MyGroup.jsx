import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
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

import { findUsers } from "../../api/usersApi";
import { getAuth } from '../../helper/helper.js';
import { fetchStudentGroup, requestCoSupervisor, requestSupervisor } from '../../api/studentGroupApi';

export default function MyGroup() {
const [expanded, setExpanded] = React.useState(false);
const [supervisors, setSupervisors] = useState([]);
const [group, setGroup] = useState({})

useEffect (() =>{
    function getSupervisors(){
        let id = getAuth().id;
        console.log(id);
        findUsers(`role=Supervisor`)
        .then((res) =>{
            setSupervisors(res.data.responseData);
            console.log(res.data.responseData)
        }).catch((error) =>{
            console.log(error);
        })
    }
    getSupervisors();
},[]);

useEffect (() =>{
    groupDetails();
},[])

const groupDetails = () =>{
    let id = getAuth().id;
    fetchStudentGroup(`studentsId=${id}`)
    .then((res) =>{
        setGroup(res.data.responseData);
        console.log(group.studentsId.length);

    }).catch((err) =>{
        console.log(err);
    })
}

const reqSupervisor = (groupId, supervisorId, type) =>{
    type === "supervisor" ?
        requestSupervisor(groupId, {supervisorId})
        .then((res) =>{
            console.log(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    :
    requestCoSupervisor(groupId, supervisorId)
        .then((res) =>{
            console.log(res.data);
        }).catch((err) =>{
            console.log(err);
        })
}

const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
};

  return (
    <div>
        <br/>
        <Container maxWidth="90%">
            <Paper elevation= {2} style={{padding:10}}>
                <Typography sx={{ color: 'text.secondary' }}>
                           Group No : {group.id}
                </Typography>
            </Paper><br/>
                
            <Paper elevation ={2} style={{padding:1}}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Member Details
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>No of members : {group.studentsId.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Members
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header" >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Research Topic Details</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                       Topic details
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Topic details
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header" >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Supervisor Details
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        
                       Status:{group.status}
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid>
                            <Paper elevation={3} style={{padding:"20px", maxWidth:"100%"}} sx={{ display: 'grid'}}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', align:'left'}}>
                                    <Typography>Supervisor ID: </Typography>
                                    <Typography>1</Typography>
                                </Box>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', align:'left'}}>
                                    <Typography>Supervisor Name</Typography>
                                    <Typography>1</Typography>
                                </Box>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', align:'left'}}>
                                    <Typography>Interested Area</Typography>
                                    <Typography>1</Typography>
                                </Box>
                            </Paper>
                        </Grid> <br/>
                        <Grid>
                            <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                                <center><h4>Request Supervisor</h4></center>
                                <center>
                                    <TextField label="Search" variant="standard"  />
                                    <IconButton fontSize="small" aria-label="search" >
                                        <SearchIcon />
                                    </IconButton>
                                    <IconButton fontSize="small" aria-label="cancel" >
                                        <CancelIcon />
                                    </IconButton>
                                </center><br/>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell >Name</TableCell>
                                            <TableCell >Interested Area</TableCell>
                                            <TableCell >Options</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                supervisors.map((row) =>(
                                                    <TableRow>
                                                        <TableCell >{row.id}</TableCell>
                                                        <TableCell >{row.name}</TableCell>
                                                        <TableCell >{row.interestArea}</TableCell>
                                                        <TableCell >
                                                            <Button variant="contained" onClick={()=> reqSupervisor(group.id, row.id)}>Request</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header"  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Co Supervisor Details</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {
                            group.status === "Topic Accepted" ?
                            "Status: Eligible":
                            "Status: Ineligible"
                        }
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid>
                            <Paper elevation={3} style={{padding:"20px", maxWidth:"100%"}} sx={{ display: 'grid'}}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', align:'left'}}>
                                    <Typography>Supervisor ID: </Typography>
                                    <Typography>1</Typography>
                                </Box>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', align:'left'}}>
                                    <Typography>Supervisor Name</Typography>
                                    <Typography>1</Typography>
                                </Box>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', align:'left'}}>
                                    <Typography>Interested Area</Typography>
                                    <Typography>1</Typography>
                                </Box>
                            </Paper>
                        </Grid> <br/>
                        <Grid item xs={8}>
                            <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                                <center><h4>Request Co-Supervisor</h4></center>
                                <center>
                                    <TextField label="Search" variant="standard"  />
                                    <IconButton fontSize="small" aria-label="search" >
                                        <SearchIcon />
                                    </IconButton>
                                    <IconButton fontSize="small" aria-label="cancel" >
                                        <CancelIcon />
                                    </IconButton>
                                </center><br/>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell >Name</TableCell>
                                            <TableCell >Interested Area</TableCell>
                                            <TableCell >Options</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                supervisors.map((row) =>(
                                                    <TableRow>
                                                        <TableCell >{row.id}</TableCell>
                                                        <TableCell >{row.name}</TableCell>
                                                        <TableCell >{row.interestArea}</TableCell>
                                                        
                                                        <TableCell>
                                                        <Button variant="contained" 
                                                            disabled={ group.status !== "Topic Accepted" } 
                                                            onClick={()=> reqCoSupervisor(group.id, row.id, "coSupervisor")}>
                                                            Request
                                                        </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Container>
    </div>
  )
}
