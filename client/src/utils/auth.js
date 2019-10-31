import Axios from "axios";
import qs from "querystring";
const bcrypt     = require('bcryptjs');

const axios = Axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API
});

export const signup = function({username, password, firstname, lastname, email}) {
    return axios({
        method: "POST",
        url: "/auth/signup",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({username, firstname, lastname, password, email})
    })
    
    .catch((err)=>{
        console.log(err);
    })
}

export const setUser = function(user){
    localStorage.setItem('user', JSON.stringify(user));
}

export const login = function({username, password}, navigate) {
    
    // const salt     = bcrypt.genSaltSync(10);
    // const password = bcrypt.hashSync(pass, salt);
    debugger
    return axios({
        method: "POST",
        url: "/auth/login",
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*' },
        data: qs.stringify({username, password}),
    })
    .then((response)=> {
        setUser(response.data);
        navigate.push('/profile');
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const loggedIn = function(){
    const user = getUser()
    return !!user; 
}

export const getUser = function(){
    return JSON.parse(localStorage.getItem('user'));
}

export const logout = function(){
    return axios({
         url: "/auth/logout"
     })
     .then((res, navigate)=> {
         localStorage.removeItem('user');
         navigate.push('/')
     })
     .catch((err)=>{
        console.log(err);
    })
 } 