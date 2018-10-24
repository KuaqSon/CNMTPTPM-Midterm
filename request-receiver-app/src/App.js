import React, { Component } from 'react';
import './App.css';
import RequestForm from './requestForm/RequestForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <RequestForm></RequestForm>
        </div>
      </div>
    );
  }
}

export default App;
