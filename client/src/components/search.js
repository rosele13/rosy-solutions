import React from "react";	
import Header from "./header"
import Result from "./result"
import axios from "axios";

//Style
import "../styles/search.css"

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInput: "",
            solution: false,
            liquor: false,
            results: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleCheck(e) {
              this.setState({
                  [e.target.name]: JSON.parse(e.target.value)
              })
      }
    submitHandler(event) {
        event.preventDefault();
    
        this.state.solution ?
        (axios({
                "method":"GET",
                "url":"https://the-cocktail-db.p.rapidapi.com/search.php",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key":"6092bfac02mshdeb65b993f48a1dp1596edjsn3c3a741feee2"
                },"params":{
                "s": `${this.state.userInput}`
                }
                })
                .then((response)=>{
                    this.setState({
                        results : response.data.drinks
                    })
                })
                .catch((error)=>{
                  console.log(error)
                }))

            :
            (axios({
                "method":"GET",
                "url":"https://the-cocktail-db.p.rapidapi.com/search.php",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key":"6092bfac02mshdeb65b993f48a1dp1596edjsn3c3a741feee2"
                },"params":{
                "i": `${this.state.userInput}`
                }
                })
                .then((response)=>{
                    this.setState({
                        results : response.data.ingredients
                    })
                })
                .catch((error)=>{
                  console.log(error)
                }))

      }
    

    render(){
        return (
            <div>
                <Header/>
                <form onSubmit={this.submitHandler}>
                    <label>
                        <h2>Search for a Solution</h2>
                        <input name="userInput" type="text" placeholder="i.e. Bahama mama"  onChange={this.handleChange}/>
                        <label>Liquor?</label>
                        <input name="liquor" type="checkbox" value={!this.state.liquor} onChange={this.handleCheck} />
                        <label>Solution?</label>
                        <input name="solution" type="checkbox" value={!this.state.solution} onChange={this.handleCheck} />
                    </label>
                    <input type="submit" value="Search"/>
                </form>
                {this.state.results ? 
                <> {
                    (this.state.results.map((result)=>
                    <Result dataSearch= {result} isSolution={this.state.solution}/>)) 
                }
                </> 
                : <></>}
            </div>
        );
    }

}

export default Search;