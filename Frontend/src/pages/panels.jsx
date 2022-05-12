import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import toast, { Toaster } from 'react-hot-toast';
import { deletePanel, fetchAllPanels } from '../api/panelApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import CreatePanel from '../components/manage-panels/createPanel';

const PanelManagement = () => {
  const [panels, setPanels] = useState([]);
  const [panel, setPanel] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    handleGetPanels();
  }, []);

  const handleGetPanels = () => {
    fetchAllPanels().then(res => {
        res.data.isSuccessful ? setPanels(res.data.responseData) : toast.error('Error Retrieving');
        // console.log(res.data)
    }).catch(() => {
        toast.error('Error!', {
            position: "top-right",
            style: {
              padding: '16px',
              color: 'white',
              background: '#FF0000'
            },
            iconTheme: {
              primary: 'red',
              secondary: '#FFFAEE',
            },
        });
    });
  }

  const handleDeletePanel = (id) => {
    deletePanel(id)
        .then((res) => {
            handleGetPanels();
            toast.success('Deleted Successfully!', {
                position: "top-right",
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: 'white',
                  background: '#4BB543'
                },
                iconTheme: {
                  primary: 'green',
                  secondary: '#FFFAEE',
                },
            });
        })
        .catch(() => {
            toast.error('Error!', {
                position: "top-right",
                style: {
                  padding: '16px',
                  color: 'white',
                  background: '#FF0000'
                },
                iconTheme: {
                  primary: 'red',
                  secondary: '#FFFAEE',
                },
            });
        })
  }

  const setEditingPanel = (payload) => {
    setPanel(payload);
    setEditOpen(true);
  }

  const setAddPanel = (payload) => {
    setAddOpen(true);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <Toaster/>
    <h1>Panels</h1>
    <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setAddPanel(panel)} style={{float:"right"}}>Create</Button>
        <center>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell align="left"><b>Panel ID</b></TableCell>
              <TableCell align="center"><b>Panel Members</b></TableCell>
              <TableCell align="center"><b>Allocated Groups</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {panels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((panel, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">{reservation.id}</TableCell> */}
                <TableCell component="th" scope="row" align="left">{panel.id}</TableCell>
                <TableCell align="center">
                    {panel.panelMembers}
                </TableCell>
                <TableCell align="center">{panel.allocatedGroups}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    <IconButton aria-label="delete" style={{color:"#FF0000"}} onClick={() => handleDeletePanel(panel.id)}>
                        <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              count={panels.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </Table>
      </TableContainer>
        </center>
      {addOpen && (
            <CreatePanel
            setAddOpen={setAddOpen}
            />
        )
      }
      {/* {editOpen && reservation &&
        <MakeReservation
          reservation={reservation}
          setEditOpen={setEditOpen}
          handleGetReservations={handleGetReservations}
        />
      } */}
    </>
  )
}

export default PanelManagement;