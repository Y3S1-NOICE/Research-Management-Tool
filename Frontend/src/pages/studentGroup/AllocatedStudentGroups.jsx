import { Button, Container, Divider, Grid, Paper, TablePagination, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { assignMarks, fetchStudentGroup } from '../../api/studentGroupApi';
import { fetchPanel } from '../../api/panelApi';
import { getAuth } from '../../helper/helper';
import { AssignMarksForm } from './AssignMarksForm';
import ID from "nodejs-unique-numeric-id-generator";

export default function AllocatedStudentGroups() {
  let id = getAuth().id;
  const [expanded, setExpanded] = React.useState(false);
  const [groupDataT, setGroupDataT] = useState([]);
  const [groupDataP, setGroupDataP] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [panelId, setPanelId] = useState(null);
  const [evaluation, setEvaluation] = useState([])
  const [grp, setGrp] = useState("")
  const [evaluationData, setEvaluationData] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  let groupData = [...groupDataT, ...groupDataP]
  const [open, setOpen] = React.useState(false);

  useEffect(() =>{
    function getId(){
      fetchPanel(`panelMembers=${id}`)
      .then((res) =>{
        setPanelId(res.data.responseData[0].id);
        console.log(panelId)
      }).catch((err) =>{
        console.error(err);
      })
    }
    getId()
    getGroupsT()
    getGroupsP()
  },[panelId])

  const getGroupsT = () => {
    fetchStudentGroup(`topicEvaluationPanelId=${panelId}`)
    .then((res) =>{
      setGroupDataT(res.data.responseData)
      console.log( res.data.responseData)
    }).catch((err) =>{
      console.error(err);
    })
  }

  const getGroupsP = () => {
    fetchStudentGroup(`presentationEvaluationPanelId=${panelId}`)
    .then((res) =>{
      setGroupDataP(res.data.responseData)
      console.log( res.data.responseData)
    }).catch((err) =>{
      console.error(err);
    })
  }

  const handleClickOpen = (grpId) => {
    setOpen(true);
    setGroupId(grpId)
    setEvaluationData({
      id:"",
      evaluationType:"",
      marks:""
    })
    fetchStudentGroup(`id=${grpId}`)
    .then((res) =>{
      setGrp(res.data.responseData[0])
      setEvaluation(res.data.responseData[0].evaluation)
      console.log(res.data.responseData[0].evaluation)
    }).catch((err) =>{
      console.err(err);
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) =>{
    let evaluationId = ID.generate(new Date().toJSON())
    const evaluationObj = {
        id:"E"+ evaluationId,
        evaluationType:data.evaluationType,
        marks: data.marks
    };
    assignMarks(groupId, evaluationObj)
    .then((res) =>{
        console.log(res.data)
    }).catch((err) =>{
        console.error(err);
    })
    setOpen(false);
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  return (
    <div>
      <br />
      <Container maxWidth={"90%"}>
        <center>
          <Typography variant='h6'>
            <b>ALLOCATED STUDENT GROUPS</b>
          </Typography>
        </center>
        <Paper elevation={3} style={{padding:20}}>
          {
            groupData.map((row) =>(
              <Accordion expanded={expanded === row.id} onChange={handleChange(row.id)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  <b>GROUP ID :</b>
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{row.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper elevation={3} style={{padding:20}}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12}>
                    <Typography align='center'><b>TOPIC DETAILS</b></Typography><br/>
                  </Grid>
                  <Grid item xs>
                    <Typography align='center'><b>Topic: </b>Springboot</Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem></Divider>
                  <Grid item xs >
                    <Typography align='center'><b>Status: </b>Finalized Supervisors</Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem></Divider>
                    <Grid item xs>
                    <Button variant='contained' onClick={()=>handleClickOpen(row.id)}>EVALUATION DETAILS</Button>
                    </Grid>
                  </Grid><br/>
                </Paper>
              <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
                <DialogTitle><b>EVALUATION DETAILS</b></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    This window will allow you to view and asign evaluation details relating to the specific group!
                  </DialogContentText><br/>
                  <Typography><center><b>GROUP ID : {grp.id}</b></center></Typography><br/>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={6}>
                        <Paper evaluation={3} style={{padding:20}}>
                        <Typography><center>
                          <b>MARKS</b>
                        </center></Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell >Name</TableCell>
                                    <TableCell >Marks</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        evaluation.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                            <TableRow>
                                                <TableCell >{row.id}</TableCell>
                                                <TableCell >{row.evaluationType}</TableCell>
                                                <TableCell >{row.marks}</TableCell>
                                                </TableRow>
                                        ))
                                    }            
                                </TableBody>
                                <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[2, 3, 5]}
                                    count={evaluation.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                </TableRow>
                            </Table>
                        </TableContainer>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        {
                          evaluationData?(
                            <div>
                              <Container maxWidth="100%">
                                  <AssignMarksForm markObj={evaluationData} onSubmit={onSubmit}/>
                              </Container>
                            </div>
                          ):(
                            <div>
                              Loading....
                            </div>
                          )
                        }
                      </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>CLOSE</Button>
                </DialogActions>
              </Dialog>
              </AccordionDetails>
            </Accordion>
            ))
          }
        </Paper>
      </Container>
      
    </div>
  )
}
