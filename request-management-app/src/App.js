import React, { Component } from 'react';
import './App.css';
import RequestList from './requestList/RequestList';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import LoginForm from './logIn/Login';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/request" component={RequestList}/>
          <Route path="/login" component={LoginForm} />
          </div>
      </Router>

    );
  }
}

export default App;