import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react';
import './maps.css';
import { Alert, Button } from 'reactstrap';
import { Stats } from 'fs';

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
      currentLocation: String,
    };
  }

  geocodeAddress = (address) => {
    this.geocoder.geocode({ 'address': address }, (results, status) => {

      if (status === this.props.google.maps.GeocoderStatus.OK) {

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        });

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);
        
        // const lat= results[0].geometry.location.lat();
        // const lng= results[0].geometry.location.lng();

        // console.log("lat: " + lat);
        // console.log("lng: " + lng);

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

  componentWillReceiveProps(props) {
    this.renderDirection(this.state.currentLocation);
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

    this.directionsService = new this.props.google.maps.DirectionsService();
    this.directionsDisplay = new this.props.google.maps.DirectionsRenderer(); 

    this.detectCurrentLocation();

    this.geocoder = new this.props.google.maps.Geocoder();
    this.props.google.maps.event.addListener(this.map, 'click', (event) => {
      this.geocoder.geocode({
        'latLng': event.latLng
      }, (results, status) => {
        if (status == this.props.google.maps.GeocoderStatus.OK) {
          console.log(results[0].formatted_address);
          this.marker.setPosition(results[0].geometry.location);
          var distance = this.caculatorDistance(this.state.currentLocation ,results[0].geometry.location);
          console.log(distance);
          if(distance <= 100 ){
            alert("Không thể định vị, vị trí bạn chọn nằm trong bán kính 100m, vui lòng cập nhật vị trí ngoài bán kính 100m!");
          } else {
            this.setState({
              foundAddress: results[0].formatted_address,
              isGeocodingError: false,
              currentLocation: results[0].geometry.location,
            });
            this.renderDirection(results[0].geometry.location);
          }

        }
      });
    });

    this.renderDirection(this.state.currentLocation);
    console.log(this.props.requestLocation);
  }

  caculatorDistance = (coor1, coor2) => { 
    
    function toRad(x) {
      return x * Math.PI / 180;
    }

    var lon1 = coor1.lng();
    var lat1 = coor1.lat();

    console.log("test lat1" + lat1);

    var lon2 = coor2.lng();
    var lat2 = coor2.lat();
    console.log("test lat2" + lat2);


    var R = 6378137; // m

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
  }

  detectCurrentLocation = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        const latLng = new this.props.google.maps.LatLng(coords.latitude, coords.longitude);
        this.geocoder.geocode({
          'latLng': latLng
        }, (results, status) => {
          if (status == this.props.google.maps.GeocoderStatus.OK) {
            console.log(results[0].formatted_address);
            this.marker.setPosition(results[0].geometry.location);
            this.map.setCenter(results[0].geometry.location);
            this.setState({
              foundAddress: results[0].formatted_address,
              isGeocodingError: false,
              currentLocation: latLng, 
            });
          }
          this.renderDirection(results[0].geometry.location);
        });
      });
    }
  }

  renderDirection = (currentLocation) => {
    console.log(this.props.requestLocation);
    if (!this.props.requestLocation.lat && !this.props.requestLocation.lng){
      return;
    }
    const des = new this.props.google.maps.LatLng(Number(this.props.requestLocation.lat), Number(this.props.requestLocation.lng));
    this.directionsService.route({
      origin: currentLocation,
      destination: des,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status ===  'OK'){
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setDirections(response);
      }
    });
  }

  setMapElementReference = (mapElementReference) => {
    this.mapElement = mapElementReference;
  }

  render() {
    return (
      <div>
        <div className="row mt-2">
          <div className="col-sm-12">

            {this.state.isGeocodingError ? <Alert color="danger">Address not found.</Alert> : <Alert color="info">Vị trí hiện tại: {this.state.foundAddress}</Alert>}

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

