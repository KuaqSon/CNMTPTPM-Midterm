import React, { Component } from 'react';
import MapContainer from './maps/MapContainer';

class App extends Component {
  render() {
    return (
      <div>
        <div>Request input</div>
        <div><MapContainer></MapContainer></div>
      </div>
    );
  }
}

export default App;
