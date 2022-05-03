import { useState } from "react";
import { login } from "../api/authApi";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { handleError } from "../helper/helper";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Login = () => {
    const [credentials, setCredentials] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        login(credentials)
            .then(res => {
                console.log(res)
                if(res.data.isSuccessful) {
                    localStorage.setItem('authentication', res.data.responseData.accessToken);
                    window.location.href='/';
                } else {
                    handleError();
                }
            })
            .catch(() => handleError());

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email': {
                setCredentials({ ...credentials, email: value });
                break;
            }
            case 'password': {
                setCredentials({ ...credentials, password: value });
                break;
            }
            default: { }
        }
    }

    return (
        <>
            <Grid container
                sx={{ boxShadow: 3 }}
                spacing={0}
                direction="column"
                alignItems="center"
            >
                <h1>RMT App</h1>
                <Grid item xs={12} md={12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email address"
                        style={{ minWidth: '350px' }}
                        variant="standard"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        autoFocus
                        name="password"
                        margin="dense"
                        label="Password"
                        style={{ minWidth: '350px' }}
                        type="password"
                        variant="standard"
                        onChange={handleChange}
                    />
                </Grid>
                <Button onClick={handleSubmit}>Sign in</Button>
            </Grid>

        </>
    );
}

export default Login;