import React from 'react';
import { BrowserRouter as Router ,Switch, Route } from "react-router-dom";

//Style sheets
import './stylesheets/App.css';

//Components
import Home from "./components/home";
import Random from "./components/random";
import Signup from "./components/signup";
import About from "./components/about";
import Login from "./components/login";
// import Cocktail from './components/cocktail';
// import Liquor from "./components/liquor";
// import User from "./components/user";

class App extends React.Component {	

  render() {
    return (
      <Router>
      <div className="App">
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/signup" component={Signup} exact />
        <Route path="/login" component={Login} exact></Route>
        <Route path="/about" component={About} exact></Route>
        <Route path="/random" component={Random} exact></Route>
        {/* {/* <Route path="/cocktail" component={Cocktail} exact ></Route> */}
        {/* <Route path="/liquor" component={Liquor} exact></Route> */}
        {/* <Route path="/profile" component={User} exact></Route> */}
        </Switch>
      </div>
      </Router>
    );
   }
}

export default App;