import React from "react";	
import Header from "./header"

//Style
import "../styles/about.css"

class About extends React.Component{
    render(){
        return (
            <div>
                <Header/>
                <p>
                    "For a chemist Alcohol is not a problem, it's a Solution!"
                    -Unknown
                </p>
            </div>
        );
    }
}

export default About;