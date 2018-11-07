import React, { Component } from 'react';
import './App.css';
import MapContainer from './maps/MapContainer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MapContainer></MapContainer>
      </div>
    );
  }
}

export default App;
