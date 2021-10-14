// Import modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path ="/login" component = {Login} />
        <Route path ="/signup" component = {Signup} />
      </Switch>
    </Router>
  );
}

export default App;