import React, { Component } from 'react';
import MapContainer from './maps/MapContainer';
import Driver from './Driver';
import LoginForm from './logIn/Login';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={LoginForm}/>
          <Route path="/driver" component={Driver}/>
        </div>
      </Router>
    );
  }
}

export default App;
