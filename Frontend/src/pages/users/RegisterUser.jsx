import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { registerUser } from '../../api/usersApi';

const RegisterUser = () => {
    const [user, setUser] = useState({});

    const handleRegister = () => {
        registerUser(user)
            .then(res => console.log(res))
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'id': {
                setUser({...user, id: value});
                break;
            }
            case 'name': {
                setUser({...user, name: value});
                break;
            }
            case 'email': {
                setUser({...user, email: value});
                break;
            }
            case 'phone': {
                setUser({...user, phone: value});
                break;
            }
            case 'password': {
                setUser({...user, password: value});
                break;
            }
            case 'interestArea': {
                setUser({...user, interestArea: value});
                break;
            }
            case 'role': {
                setUser({...user, role: value});
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
                name="id"
                label="Your ID"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                name="name"
                label="Name"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="phone"
                label="Phone"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="password"
                label="Password"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="role"
                label="Role"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <InputLabel id="demo-simple-select-label">Interested Area</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='interestArea'
                    value={user.interestArea}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={'Machine Learning'}>Machine Learning</MenuItem>
                    <MenuItem value={'Software Engineering'}>Software Engineering</MenuItem>
                    <MenuItem value={'Cyber Security'}>Cyber Security</MenuItem>
                </Select>
            <Button onClick={handleRegister}>Register</Button>
        </>
    );
}

export default RegisterUser;