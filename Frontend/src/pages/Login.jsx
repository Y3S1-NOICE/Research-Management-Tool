import { useState } from "react";
import { login } from "../api/authApi";
import { handleError } from "../helper/helper";

const Login = () => {
    const [credentials, setCredentials] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault(); 
        login(credentials)
            .then(res => {
                console.log(res)
                res.data.isSuccessful ?
                    localStorage.setItem('authentication', res.data.responseData.accessToken) :
                    handleError();
            })
            .catch(error => handleError('Authentication failed!'));

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'email': {
                setCredentials({...credentials, email: value});
                break;
            }
            case 'password': {
                setCredentials({...credentials, password: value});
                break;
            }
            default: {}
        }
    }

    return(
        <>
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>Sign in</button>
            </form>
        </>
    );
}

export default Login;