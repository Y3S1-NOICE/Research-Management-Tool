import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import toast, { Toaster } from 'react-hot-toast';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createPanel } from '../../api/panelApi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePanel = (props) =>{    
    const [panel, setPanel] = useState({});

    const handleSubmit = () => {
        createPanel(panel)
        .then(res => {
            props.setAddOpen(false);
            toast.success('Successfully Created!', {
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
            window.location.reload('/panels');
        }).catch((e) => {
            //console.log(e);
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

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'id': {
                setPanel({...panel, id: value});
                break;
            }
            case 'panelMembers': {
                setPanel({...panel, panelMembers: value});
                break;
            }
            case 'allocatedGroups': {
                setPanel({...panel, allocatedGroups: value});
                break;
            }
            default: {}
        }
    }

    return (
        <div>
        <Toaster/>
        <Dialog 
            open={true} 
            onClose={() => props.setAddOpen(false)}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>Create Panel</DialogTitle>
            <DialogContent>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="id"
                            label="Panel ID"
                            type="text"
                            value={panel.id || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <FormControl fullWidth style={{marginTop:"8px"}}>
                            <InputLabel id="demo-simple-select-label">Panel Members</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={panel.panelMembers || ''}
                                label="Panel Members"
                                onChange={handleChange}
                                name="panelMembers"
                            >
                            <MenuItem value="Amantha">Amantha</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth style={{marginTop:"8px"}}>
                            <InputLabel id="demo-simple-select-label">Allocate Groups</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={panel.allocatedGroups || ''}
                                label="Allocated Groups"
                                onChange={handleChange}
                                name="allocatedGroups"
                            >
                            <MenuItem value="MLB1">MLB1</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default CreatePanel;