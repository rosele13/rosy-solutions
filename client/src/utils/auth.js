import Axios from "axios";
import qs from "querystring";

const axios = Axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API
});

export const signup = function({username, password, firstname, lastname, email}, navigate) {
    return axios({
        method: "POST",
        url: "/auth/signup",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({username, firstname, lastname, password, email}),
    })
    .then((response)=> {
        setUser(response.data);
        navigate.push('/');
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const setUser = function(user){
    localStorage.setItem('user', JSON.stringify(user));
}

export const login = function({username, password}, navigate) {
    return axios({
        method: "POST",
        url: "/auth/login",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({username, password}),
    })
    .then((response)=> {
        setUser(response.data);
        navigate.push('/');
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
     .then((res)=> {
         localStorage.removeItem('user');
         navigate.push('/')
     })
     .catch((err)=>{
        console.log(err);
    })
 } 