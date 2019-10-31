import React from "react";	
import Header from "./header"
import { Link } from "react-router-dom";

//Style
import "../styles/home.css"

class Home extends React.Component{
    render(){
        return (
            <div className="home-pg">
                <Header/>
                <div>
                <h2>Start your search</h2>
                <Link to="/search"><button>Solutions</button></Link>
                </div>
                <div>
                <h2>Feeling Adventurous? Try </h2>
                <Link to="/random"><button>Random Solution</button></Link>
                </div>
                <div>
                <Link to="/signup"><button>Sign up</button></Link>
                <Link to="/login"><button>Log in</button></Link>
                </div>
            </div>
        );
    }
}

export default Home;