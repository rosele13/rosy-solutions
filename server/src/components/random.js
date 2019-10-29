import React, { Component } from "react";
import axios from "axios";
import Header from "./header";

class Single extends Component {
    constructor(props){
        super(props);
        this.state = {
            cocktail: {}
        }
    }

    componentDidMount(){
        axios.get(` https://the-cocktail-db.p.rapidapi.com/random.php`)
        .then(response => {debugger;
            this.setState({
                
                cocktail: response.data
            })
        })
    }

    render(){
        return( <>
            { this.state.cocktail === "" ?
                <>
                <Header/>
                <p> page is loading</p>
                </>
                :
                <div className="single-container">
            
                <Header/>
                <img src={this.state.cocktail.image_url} class="single-cocktail" alt=""/>
                <div className="d-flex">
                    <span className="font-weight-bold">{this.state.cocktail.name}</span>
                    <span className="ml-auto lead text-secondary">{this.state.cocktail.attenuation_level}</span>
                </div>
                <div className="d-flex">
                    <span className="text-secondary">{this.state.cocktail.tagline}</span>
                    <span className="ml-auto font-weight-bold">{this.state.cocktail.first_brewed}</span>
                </div>
                <div className="d-flex flex-column justify-content-start align-items-start">
                <p>{this.state.cocktail.description}</p>
                <p className="text-secondary">{this.state.cocktail.contributed_by}</p>
                </div>
            </div>
            }</>
            
        )
    }
}

export default Single 