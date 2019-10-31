import React from "react";	
import Header from "./header"
import axios from "axios"
import Result from "./result"
import { Link } from "react-router-dom";

//Style
import "../styles/liquor.css"

class Liquor extends React.Component{
    constructor(props){
        super(props)
        this.state={
            liquor:"",
            drinks: ""
        }
    }
    componentDidMount(){

        axios({
            "method":"GET",
            "url":"https://the-cocktail-db.p.rapidapi.com/lookup.php",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
            "x-rapidapi-key":"6092bfac02mshdeb65b993f48a1dp1596edjsn3c3a741feee2"
            },"params":{
            "iid": `${this.props.match.params.id}`
            }
            })
            .then((response)=>{
                this.setState({
                    liquor : response.data.ingredients[0]
                })
            })
            .catch((error)=>{
              console.log(error)
            })
    }
    solforLiquor(){
        axios({
            "method":"GET",
            "url":"https://the-cocktail-db.p.rapidapi.com/filter.php",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
            "x-rapidapi-key":"6092bfac02mshdeb65b993f48a1dp1596edjsn3c3a741feee2"
            },"params":{
            "i": `${this.state.liquor.strIngredient}`
            }
            })
            .then((response)=>{
                this.setState({
                    drinks : response.data.drinks
                })
            })
            .catch((error)=>{
              console.log(error)
            })
    }

    render(){
        return (
            <div>
                <Header/>
                <div>
                <Link to="/search"><button>Go back to searching</button></Link>
                </div>
                <div>
                    <h1>{this.state.liquor.strIngredient}</h1>
                </div>
                <div>
                    <p>{this.state.liquor.strDescription}</p>
                </div>
                <div>
                    <h3>Solutions with {`${this.state.liquor.strIngredient}`}</h3>
                    {this.solforLiquor()}
                    {this.state.drinks ? 
                <> {
                    (this.state.drinks.map((drink)=>
                    <Result dataSearch= {drink} isSolution={true}/>)) 
                }
                </> 
                : <></>}
                </div>
            </div>
        );
    }
}

export default Liquor;