import React, { Component } from 'react';
import './App.css';
import Identify from './Identify';
import LoginForm from './logIn/Login';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class App extends Component {
  render() {
    const auth = localStorage.getItem("auth");
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            auth ? (
              <Redirect to="/identify"/>
            ) : (
              <Redirect to="/login"/>
            )
          )}/>
          <Route path="/identify" component={Identify} />
          <Route path="/login" component={LoginForm} />
        </div>
      </Router>
    );
  }
}
export default App;
