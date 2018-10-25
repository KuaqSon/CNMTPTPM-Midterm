import React, { Component } from 'react';
import './App.css';
import RequestList from './requestList/RequestList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <RequestList></RequestList>
        </div>
      </div>
    );
  }
}

export default App;