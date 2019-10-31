import React from "react";	
import Header from "./header"
import { Link } from "react-router-dom";
import Result from "./result"
import {getUser} from '../utils/auth';
import axios from "axios";

//Style
import "../styles/user.css"

class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: getUser(),
            favDrinks: []
        }
    }

    componentDidMount(){
        this.setState({
            user: getUser()
        })
        this.state.user.cocktails.map( (drink) =>{
            axios({
                "method":"GET",
                "url":"https://the-cocktail-db.p.rapidapi.com/lookup.php",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key":"6092bfac02mshdeb65b993f48a1dp1596edjsn3c3a741feee2"
                },"params":{
                "i": `${drink}`
                }
                })
                .then((response)=>{
                    this.setState({
                        favDrinks : this.state.favDrinks.concat(response.data.drinks[0])
                    })
                })
                .catch((error)=>{
                  console.log(error)
                })
        })
        
    }
    deleteDrink(drink){
        this.setState({
            favDrinks : this.state.favDrinks.filter(item => item.id !== drink.idDrink)
        })
    }
    render(){
        return (
            <div>
                <Header/>
                <div>

                    <h1>Welcome {this.state.user.firstname}!</h1>
                </div>
                <div>
                    <h2>Favorite Solutions</h2>
                    <Link to="/search"><button>Add more solutions!</button></Link>
                    {
                        this.state.favDrinks.map((drinks)=> (
                            <div>
                            <Result dataSearch= {drinks} isSolution={true}/>
                            {/* <button onClick={this.deleteDrink(drinks)}>Delete</button> */}
                            </div>

                            

                        ))
                    }
                </div>
            </div>
        );
    }
}

export default User;