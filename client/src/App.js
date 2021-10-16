// Import modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Main from "./components/pages/Main";
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/CSS/Home.css';
import './components/CSS/Form.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path ="/login" component = {Login} />
        <Route path ="/signup" component = {Signup} />
        <Route path ="/main" component = {Main} />
      </Switch>
    </Router>
  );
}

export default App;