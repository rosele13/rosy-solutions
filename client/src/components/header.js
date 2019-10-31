import React from "react"
import { Link } from "react-router-dom";
import {getUser, logout} from "../utils/auth";
import { withRouter } from "react-router";

//Style
import "../styles/header.css"

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: getUser()
        }
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser() {
        logout()
        .then(()=> {
            this.setState({user: null})
            this.props.history.push("/")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div>
            <div className="logo">
                {
                    this.state.user ?
                    <Link to="/profile">Rosy's Solutions</Link>:
                    <Link to="/">Rosy's Solutions</Link>
                }
            </div>
            <div className="navbar">
            <nav className="navbar navbar-expand-sm bg-primary navbar-light">
                <ul className="navbar-nav">                
                    <li className="nav-item active">
                    <Link className="nav-link btn btn-light mr-2" to="/">Home</Link>
                    </li>
                    {!this.state.user ?
                    <>  
                        <li className="nav-item">
                        <Link className="nav-link btn btn-light mr-2" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link btn btn-light" to="/signup">SignUp</Link>
                        </li>
                    </>
                    :
                    <>
                        <li className="nav-item">
                        <Link className="nav-link btn btn-light mr-2" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link btn btn-light" onClick={this.logoutUser} >Logout</a>
                        </li>
                    </>}
                    <li className="nav-item">
                    <Link className="nav-link btn btn-light mr-2" to="/search">Search</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link btn btn-light mr-2" to="/random">Random</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link btn btn-light" to="/about">About us</Link>
                    </li>
                </ul>
            </nav>
            </div>
            </div>
        )
    }
}

export default withRouter(Header);