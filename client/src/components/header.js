import React from "react"
import { Link } from "react-router-dom";
import {getUser, logout} from "../utils/auth";
import { withRouter } from "react-router";
import { slide as Menu } from 'react-burger-menu'
import burger from '../styles/images/hamburger.png'
import logo from '../styles/images/logo.png' 

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
            
            <nav>
                <div id="nav-wrapper">
                    {
                        this.state.user ?
                        <a id="logo" href="/profile">Rosy's Solutions</a>:
                        <a id="logo" href="/">Rosy's Solutions</a>
                    }
                    {/* <Menu right customBurgerIcon={ <img src={burger} /> }> */}
                    <div id='dropdown' >
                        <button id='hamburger' ><img src={burger} alt="menu"/></button>
                        <ul id="dropdown-content">                
                            <li >
                            <Link className="show" to="/">Home</Link>
                            </li>
                            {!this.state.user ?
                            <>  
                                <li className="show">
                                <Link  to="/login">Login</Link>
                                </li>
                                <li className="show">
                                <Link  to="/signup">SignUp</Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="show">
                                <Link  to="/profile">Profile</Link>
                                </li>
                                <li className="show">
                                <a  onClick={this.logoutUser} >Logout</a>
                                </li>
                            </>}
                            <li className="show">
                            <Link  to="/search">Search</Link>
                            </li>
                            <li className="show">
                            <Link  to="/random">Random</Link>
                            </li>
                            <li className="show">
                            <Link  to="/about">About us</Link>
                            </li>
                        </ul>
                    </div>
                    {/* </Menu> */}
                </div>
            </nav>
            
        )
    }
}

export default withRouter(Header);