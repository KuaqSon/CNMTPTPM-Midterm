import React, { Component } from 'react';
import Driver from './Driver';
import LoginForm from './logIn/Login';

class App extends Component {
  render() {
    return (
      <div>
        <LoginForm />
        {/* <Driver/> */}
      </div>
    );
  }
}

export default App;
