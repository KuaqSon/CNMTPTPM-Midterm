import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import './maps.css';
import { Alert, Button } from 'reactstrap';

var INITIAL_LOCATION = {
  address: 'London, United Kingdom',
  position: {
    latitude: 51.5085300,
    longitude: -0.1257400
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 16;

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

export class MapContainer extends Component {  
  constructor(props) {
    super(props);

    // const { lat, lng } = this.props.initialCenter;
    this.state = {
      // currentLocation: {
      //   lat: lat,
      //   lng: lng
      // },
      foundAddress: INITIAL_LOCATION.address,
      isGeocodingError : false,
    };
  }
  // getInitialState() {
  //   return {
  //     isGeocodingError: false,
  //     foundAddress: INITIAL_LOCATION.address
  //   };
  // }

  geocodeAddress = (address) => {
    this.geocoder.geocode({ 'address': address }, (results, status) => {

      if (status === this.props.google.maps.GeocoderStatus.OK) {

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        });

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);
        
        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      this.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

    });
  }

  handleFormSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    var address = this.searchInputElement.value;

    this.geocodeAddress(address);
  }

  componentDidMount() {
    var mapElement = this.mapElement;
    
    this.map = new this.props.google.maps.Map(mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.marker = new this.props.google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.geocoder = new this.props.google.maps.Geocoder();
  }

  setSearchInputElementReference = (inputReference) => {
    this.searchInputElement = inputReference;
  }

  setMapElementReference = (mapElementReference) => {
    this.mapElement = mapElementReference;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">

            <form onSubmit={this.handleFormSubmit}>
              <div className="row">
                <div className="col-xs-8 col-sm-10">

                  <div className="form-group">
                    {/* <label className="sr-only" htmlFor="address">Address</label> */}
                    <input defaultValue={this.props.address ? this.props.address : ""} type="text" className="form-control input-lg" id="address" placeholder="London, United Kingdom" ref={this.setSearchInputElementReference} required />
                  </div>

                </div>
                <div className="col-xs-4 col-sm-2">

                  <Button color="primary" type="submit">
                    Identify
                  </Button>

                </div>
              </div>
            </form>

          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-12">

            {this.state.isGeocodingError ? <Alert color="danger">Address not found.</Alert> : <Alert color="info">{this.state.foundAddress}</Alert>}

            <div className="map" ref={this.setMapElementReference}></div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCMoZr3IIKPqVI2SbNAWAkxwM2eWQSGXfs'
})(MapContainer);

