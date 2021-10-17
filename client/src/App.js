// Import modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, LogoutUser } from "./actions/authActions";

// Import pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Main from "./components/pages/Main";
import Stats from './components/pages/Stats';

import PrivateRoute from './PrivateRoute';

// Import Bootstrap and CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/CSS/Home.css';
import './components/CSS/Form.css';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;

    setAuthToken(token);

    const decoded = jwt_decode(token);

    store.dispatch(setCurrentUser(decoded));
    
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      store.dispatch(LogoutUser());
      window.location.href = "./login";
    }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Route exact path="/"><Home /></Route>
          <Route path ="/login" component = {Login} />
          <Route path ="/signup" component = {Signup} />
          <Route path ="/stats" component = {Stats} />
        <Switch>
          <PrivateRoute exact path="/main" component={Main} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;