import React from "react";
import { Link } from "react-router-dom";
import {signup, setUser} from "../../utils/auth";
import Header from "../header";

//Style
import "../../styles/signup.css"

class Signup extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        signup(this.state)
        .then((response)=> {
            setUser(response.data);
            this.props.history.push('/profile');
        })
        .catch((err) => console.log(err))
    }

    render(){
        return(
            <div>
            <Header />
            <form class="form-inline" onSubmit={this.submitHandler} id="new-form">
                <div>
                <label for="name">Username</label>
                <input type="text" className="form-control" name="username" onChange={this.changeHandler} required/>
                </div>
                <div>
                <label for="firstname">Firstname</label>
                <input type="text" className="form-control" name="firstname" onChange={this.changeHandler} required/>
                </div>
                <div>
                <label for="lastname">Lastname</label>
                <input type="text" className="form-control" name="lastname" onChange={this.changeHandler} required/>
                </div>
                <div>
                <label for="email">Email</label>
                <input type="email" className="form-control" name="email" onChange={this.changeHandler} required/>
                </div>
                <div>
                <label for="password">Password</label>
                <input type="password" className="form-control" name="password" onChange={this.changeHandler} required/>
                </div>
                <div>
                <button type="submit" className="btn btn-primary">Signup</button>
                </div>
            </form>
            <span>Already have an account?</span><Link to="/login" className="btn btn-primary ml-2">Login</Link>
            </div>
        )
    }
}

export default Signup 