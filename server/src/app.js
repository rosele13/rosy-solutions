import React from 'react';
import { BrowserRouter as Router ,Switch, Route } from "react-router-dom";
import Home from "./components/home";
import './stylesheets/App.css';	
// import Cocktail from './components/cocktail';
// import Liquor from "./components/liquor";
import Random from "./components/random";
// import User from "./components/user";
import Signup from "./components/signup";
import About from "./components/about";
import Login from "./components/login";



class App extends React.Component {	

  render() {
    return (
      <Router>
      <div className="App">
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/auth/signup" component={Signup} exact />
        <Route path="/auth/login" component={Login} exact></Route>
        <Route path="/about" component={About} exact></Route>
        {/* {/* <Route path="/cocktail/:id" component={Cocktail} exact ></Route> */}
        {/* <Route path="/liquor/:id" component={Liquor} exact></Route> */}
        <Route path="/random" component={Random} exact></Route>
        {/* <Route path="/profile" component={User} exact></Route> */}
        </Switch>
      </div>
      </Router>
    );
   }
}

export default App;