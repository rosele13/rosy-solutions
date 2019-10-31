import React from "react";	
import { Link } from "react-router-dom";

//Style
import "../styles/result.css"

class Result extends React.Component{
    constructor (props){
        super(props);
       
    }
    render(){
        return this.props.isSolution ?
        (
             <Link to= {`/cocktail/${this.props.dataSearch.idDrink}`}>
                <div>
                    <div>
                    <img src={this.props.dataSearch.strDrinkThumb} className="single-cocktail" alt=""/>
                    </div>
                    <div>
                    <p>{this.props.dataSearch.strDrink}</p>
                    </div>
                </div>
            </Link>
        ):
        (
            <Link to= {`/liquor/${this.props.dataSearch.idIngredient}`}>
            <div>
                <p>{this.props.dataSearch.strIngredient}</p>
            </div>
            </Link>
        )
        
    }
}

export default Result;