import React, { Component } from 'react';
import './App.css';
import RequestForm from './requestForm/RequestForm';
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
    return (
      <Router>
        <div>
          <Route path="/request" component={RequestForm} />
          <Route path="/login" component={LoginForm} />
        </div>
      </Router>
    );
  }
}
export default App;
