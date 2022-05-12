import { Container, Grid, Paper,TablePagination,Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
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

import ID from "nodejs-unique-numeric-id-generator";
import { findUsers } from '../../api/usersApi';
import { registerStudentGroup } from '../../api/studentGroupApi';
import { getAuth } from '../../helper/helper';

export default function RegisterStudentGroup() {
    let id = getAuth().id;
    const [students, setStudents] = useState([]);
    const [select, setSelect] = useState([]);
    const [selected, setSelected] = useState([
        id
    ]);
    const [page, setPage] = React.useState(0);
    const [pageSelect, setPageSelect] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [rowsPerSelectPage, setRowsPerSelectPage] = React.useState(4);
    const emptyRows = rowsPerSelectPage - Math.min(rowsPerSelectPage, select.length - pageSelect * rowsPerSelectPage);

    useEffect(() =>{
        function getStudents(){
            findUsers(`role=Student`)
            .then((res) =>{
                setStudents(res.data.responseData);
                console.log(res.data)
            }).catch((err)=>{
                console.error(err);
            })
        }
        getStudents()
    },[])


    const stud = (id, name) =>{
        const newSelect = {
            id: id,
            name: name
        }
        setSelect(select => [...select, newSelect])
        setSelected(selected => [...selected, id])
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const onSubmit = () =>{
        let groupID = ID.generate(new Date().toJSON())
        const selectObj = {
            id:"G"+ groupID,
            studentsId:selected
        };
        registerStudentGroup(selectObj)
        .then((res)=>{
            console.log(select);
            window.location.href = '/studentgroup'
        }).catch((err) =>{
            console.error(err);
        })
    }

  return (
    <div>
        <Container maxWidth={"90%"}>
            <br />
            <Typography variant='h6'>
                <center><b>CREATE STUDENT GROUP</b></center>
            </Typography><br/>
            <Paper elevation={3} style={{padding:20}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                <Typography>
                    <b>SELECTED STUDENT ID's</b>
                </Typography><br/>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell><b>ID</b></TableCell>
                                <TableCell><b>Name</b></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    select.map((row) =>(
                                        <TableRow>
                                            <TableCell >{row.id}</TableCell>
                                            <TableCell >{row.name}</TableCell>
                                            </TableRow>
                                ))}
                                {emptyRows > 0 && <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>}   
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
                    <br/>
                    <center>
                        <Button variant='contained' onClick={onSubmit}>Submit Details</Button>
                    </center>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} style={{padding:20}}>
                        <Typography>
                            <center><b>ADD STUDENTS</b></center>
                        </Typography>
                        <Grid>
                        <center>
                            <TextField label="Search" variant="standard"  />
                            <IconButton fontSize="small" aria-label="search" >
                                <SearchIcon />
                            </IconButton>
                            <IconButton fontSize="small" aria-label="cancel" >
                                <CancelIcon />
                            </IconButton>
                        </center><br/>
                            <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                            <Grid>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell >Name</TableCell>
                                            <TableCell >Options</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                                    <TableRow>
                                                        <TableCell >{row.id}</TableCell>
                                                        <TableCell >{row.name}</TableCell>
                                                        <TableCell >
                                                            <Button variant="contained" onClick={()=> stud(row.id, row.name)} disabled={select.length === 4 || row.id === id}>SELECT</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                ))
                                            }            
                                        </TableBody>
                                        <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[2, 3, 5]}
                                            count={students.length}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                        </TableRow>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            </Paper>
        </Container>
    </div>
  )
}