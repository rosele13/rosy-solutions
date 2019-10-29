import React from "react"
import { Link } from "react-router-dom";
import {getUser, logout} from "../utils/auth";
import { withRouter } from "react-router";

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
                this.props.history.push("/auth/signup")
            })

    }

    render(){
        return(
            <div>
            <nav className="navbar navbar-expand-sm bg-primary navbar-light">
                <ul className="navbar-nav">                
                    <li className="nav-item active">
                    <Link className="nav-link btn btn-light mr-2" to="/">Home</Link>
                    </li>
                    {this.state.user ?
                    <>  
                        <li className="nav-item">
                        <Link className="nav-link btn btn-light mr-2" to="/auth/login">Login</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link btn btn-light" to="/auth/signup">SignUp</Link>
                        </li>
                    </>
                    :
                    <>
                        <li className="nav-item">
                        <Link className="nav-link btn btn-light mr-2" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link btn btn-light" to="/auth/logout">Logout</Link>
                        </li>
                    </>}
                    <li className="nav-item">
                    <Link className="nav-link btn btn-light mr-2" to="/random">Random</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link btn btn-light" to="/about">About us</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link btn btn-light" to="/contact">Contact us</Link>
                    </li>
                </ul>
            </nav>
            </div>
        )
    }
}

export default withRouter(Header);