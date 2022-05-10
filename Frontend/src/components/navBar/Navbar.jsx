import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { getAuth, logout } from '../../helper/helper';
import { roles } from "../../Util/utils";
import { fetchStudentGroup } from '../../api/studentGroupApi';

export default function NavBar() {
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [group, setGroup] = useState(null);
    const { SUPERVISOR, STUDENT, PANEL_MEMBER, ADMIN } = roles;

    useEffect(() => {
        const auth = getAuth()
        console.log(auth)
        auth && setRole(auth.role);
        auth && setUserId(auth.id);
        checkGroup()
    },[userId]);

    const checkGroup = () =>{
      fetchStudentGroup(`studentsId=${userId}`)
      .then((res) =>{
        setGroup(res.data.responseData);
        
      }).catch((error) =>{
        console.error(error);
      })
    }
    

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => window.location.href='/'}
          >
              RMT APP
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {
                role === ADMIN && 
                <>
                    <Button color="inherit" >Panels</Button>
                    <Button color="inherit" onClick={() => window.location.href='/users'}>Users</Button>
                    <Button color="inherit" onClick={() => window.location.href='/panels'}>Groups</Button>
                    <Button color="inherit" onClick={() => window.location.href='/submission-types'}>Submissions</Button>
                    <Button color="inherit" onClick={() => window.location.href='/templates'}>Templates</Button>
                </>
            }
            {
                role === PANEL_MEMBER && 
                <>
                    <Button color="inherit"onClick={() => window.location.href = '/panel/studentgroup'} >Groups</Button>
                    <Button color="inherit" >My Panel</Button>
                </>

            }
            {
                role === STUDENT && group !== null ?
                <>
                    <Button color="inherit" onClick={() => window.location.href = '/studentgroup'}>My Group</Button>
                    <Button color="inherit" >Chat</Button>
                </>:
                role === STUDENT && group === null ?
                <>
                    <Button color="inherit" onClick={() => window.location.href = '/studentgroup/registration'}>Register StudentGroup</Button>
                </>:
                <>
                </>

            }
            {
                role === SUPERVISOR && 
                <>
                    <Button color="inherit" >Groups</Button>
                    <Button color="inherit" >Chat</Button>
                    <Button color="inherit" >Requests</Button>
                </>
            }
          </Typography>
            {
                role && <Button color="inherit" onClick={logout}>Logout</Button>
            }
                        
                {!role && 
                <>
                    <Button color="inherit" onClick={() => window.location.href='/login'}>Login</Button>
                    <Button color="inherit" onClick={() => window.location.href='/signup'}>Signup</Button>
                </>

            }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
