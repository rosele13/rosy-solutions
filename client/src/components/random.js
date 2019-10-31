import React, { Component } from "react";
import axios from "axios";
import Header from "./header";
import {getUser, setUser} from "../utils/auth";
import qs from "querystring";
import { Link } from "react-router-dom";

//Style
import "../styles/cocktail.css"

require('dotenv').config();
class Single extends Component {
    constructor(props){
        super(props);
        this.state = {
           cocktail: "",
           user: getUser()
        }
        this.submitHandler= this.submitHandler.bind(this);
   }

    componentDidMount(){
        axios({
            "method":"GET",
            "url":"https://the-cocktail-db.p.rapidapi.com/random.php",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host": process.env.REACT_APP_host,
            "x-rapidapi-key": process.env.REACT_APP_key
            }
            })
            .then((response)=>{
                this.setState({
                    cocktail : response.data.drinks[0]
                })
            })
            .catch((error)=>{
              console.log(error)
            })
    }
    submitHandler = (e) => {
        e.preventDefault();
        if(this.state.user.cocktails.includes(this.state.cocktail.idDrink)) {
            this.props.history.push("/profile")
        } else {
            
            const cocktails = this.state.user.cocktails.concat(this.state.cocktail.idDrink)
            this.state.user.cocktails = cocktails;
            setUser(this.state.user)
            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API}/users/${this.state.user._id}/edit`,
                headers: { 'content-type': 'application/x-www-form-urlencoded'},
                data: qs.stringify({cocktails}),
            })
            .then((res) => {
                this.props.history.push("/profile");
            })
            .catch((err) => {
                console.log(err.message);
            })
           
        }
    }
    
    render(){
        var ingredientkeys = Object.keys(this.state.cocktail).filter((drinkKey) => 
        drinkKey.indexOf("strIngredient") !== -1 && this.state.cocktail[drinkKey] !== null
            )
        var ingredients = ingredientkeys.map((ingredientKeys) => this.state.cocktail[ingredientKeys])

        var measurementkeys = Object.keys(this.state.cocktail).filter((drinkKey) => 
                drinkKey.indexOf("strMeasure") !== -1 && this.state.cocktail[drinkKey] !== null
            )
        var measures = measurementkeys.map((measurementKeys) => this.state.cocktail[measurementKeys])
        return( <>
        { !this.state.cocktail ?
        <>
            <Header/>
            <p> page is loading</p>
        </>
        :
        <>
        <Header/>
        <div>
            <Link to="/search"><button>Go back to searching</button></Link>
        </div>
        <div className = "solution-single">
            <div className="solName">
                <h1 className="font-weight-bold">{this.state.cocktail.strDrink}</h1>
            </div>
            <div className="img-ingr">
                <div className="solImage">
                    <img src={this.state.cocktail.strDrinkThumb} className="single-cocktail" alt=""/>
                </div>
                <div className = "solIngredients">
                <h2>Ingredients</h2>
                    <table className = "solIngTable">
                        <thead>
                            <tr>
                                <th>Measurements</th>
                                <th>Ingredients</th>
                            </tr>
                        </thead>
                        <tbody> 
                        {
                        ingredients.map((ingredientKey, index)=> 
                            ( <tr>
                                    <td>{measures[index]}</td>  
                                    <td>{ingredientKey}</td>
                                </tr>)
                            )
                        }   
                        </tbody>     
                    </table>
                </div>
            </div>
            <div className="instructions">
                <h2>Instructions</h2>
                <p>{this.state.cocktail.strInstructions}</p>
            </div>
            <div>
                <h3>Want to add to Favorites?</h3>
                {
                this.state.user ?
                <div>
                    <button onClick={this.submitHandler}>Add to Favorites</button>
                </div>
                :
                <div>
                    <p>Please <Link to="/login">Login</Link> to add to Favorites</p>
                </div>
                }    
            </div>  
         </div>
        </>

        }</>

        )
    }
}

export default Single 