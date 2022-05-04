import jwt_decode from "jwt-decode";

export const handleError = (error) => {
    error && error.response && error.response.status == 401 ? 
        window.location.href='/login' :
        alert('Something went wrong!')
}

export const getAuth = () => {
    const token = localStorage.getItem('authentication');
    return token ? jwt_decode(token) : null;
}

export const logout = () => {
    localStorage.removeItem('authentication');
    window.location.href='/login'
}