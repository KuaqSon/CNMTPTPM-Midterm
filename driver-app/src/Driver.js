import React, { Component } from 'react';
import MapContainer from './maps/MapContainer';
import './App.css';
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Progress,
  Badge,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Modal,
} from 'reactstrap';
import socketIoClient from 'socket.io-client';

class Driver extends Component {
  constructor(props) {
    super(props)
    const self = this;
    self.state = {
      status: false,
      statusText: "STANDBY",
      rideStatus: false,
      rideText: "BẮT ĐẦU",
      modalVisible: false,
      time: {}, 
      seconds: 10,
      requestLocation: {
        lat: "",
        lng: "",
      },
      // openModal: false,
      socketListener: true,
      // socketListener: "driver" + localStorage.getItem("idDriver"),
      res: false,
      endpoint: "http://localhost:3000"
    }; // pass data here 

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);  
    this.handleStart = this.handleStart.bind(this);  
    this.handleModalVisible = this.handleModalVisible.bind(this);
    this.hanldeAcceptRequest = this.hanldeAcceptRequest.bind(this);

    self.timer = 0;
    self.startTimer = self.startTimer.bind(self);
    self.countDown = self.countDown.bind(self);
    self.handleStatusChange = self.handleStatusChange.bind(self);
    // self.notice = self.notice.bind(self);
    self.send = self.send.bind(self);
    // self.accept = self.accept.bind(self);
}

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    // let timeLeftVar = self.secondsToTime(self.state.seconds);
    // self.setState({ time: timeLeftVar });
    const self = this;
    // self.setState({
    //   socketListener: true
    // });
    var auth = localStorage.getItem('auth');
    if (auth === "false" || auth === null) {
      self.props.history.push('/login');
    }

    // console.log(self.state.socketListener);
    self.authRfToken();
    if (self.state.socketListener === true)
      self.send();

      // var auth = localStorage.getItem("auth");
      // if (auth === "false" || auth === null) {
      //     self.props.history.push('/login');
      // }

  }

  send = () => {
    var self = this;


    const id = localStorage.getItem('idDriver');
    const { endpoint } = self.state;
    const socket = socketIoClient(endpoint, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 2000,
      reconnectionAttempts: 5
    });
    const socketListener = 'driver' + id;
    socket.on(socketListener, (data) => {
      self.setState({ res: data });
      if (!self.isEmpty(data)){

        console.log(data);
      localStorage.setItem('idRequest', self.state.res.id);
      localStorage.setItem('idRequest', data.id);

      self.setState({
        modalVisible: true,
        socketListener: false,
      });
    }
      // console.log(self.state.socketListener);
    })

  }

  authRfToken = () => {
    const self = this;
    var auth = localStorage.getItem('auth');
    if (auth === "false" || auth === null) {
      self.props.history.push('/login');
    }
  }

  startTimer() {
    const self = this;
    self.setState({
      seconds: 10,
      time: self.secondsToTime(10)
    })
    clearInterval(self.timer);
    self.timer = setInterval(self.countDown, 1000);
    // if (self.timer == 0 && self.state.seconds > 0) {
    //   self.timer = setInterval(self.countDown, 1000);
    // }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    const self = this;
    let seconds = self.state.seconds - 1;
    self.setState({
      time: self.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(self.timer);
      self.handleModalVisible();
      // self.setState({
      //   modalVisible: false
      // })
    }
  }

  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }


  // notice whrn new request come


  handleModalVisible = () => {
    const self = this;

    self.setState({
      modalVisible: false,
      res: false
    })
    // self.setState({
    //   modalVisible: !self.state.modalVisible,
    // });
    // const id = localStorage.getItem("idDriver");

  }

  handleStart = () => {
    const self = this;
    if (self.state.status) {
      self.setState({
        rideStatus: true,
        rideText: "KẾT THÚC",
        status: false,
        statusText: "STANDBY"
      })
      localStorage.setItem('state', 0);
      self.changeState();
      self.changeStateRequest(1);

    } else {
      self.setState({
        rideStatus: false,
        rideText: "BẮT ĐẦU",
        status: true,
        statusText: "READY"
      })
      localStorage.setItem('state', 1);
      self.changeState();
      self.changeStateRequest(2);

    }

  }


  changeStateRequest = (state) => {
    const self = this;
    var idRequest = localStorage.getItem('idRequest');
    // var state = localStorage.getItem('')
    const data = {
      idRequest: idRequest,
      state: state
    }
    console.log(data);

    const session = {
      // email: localStorage.getItem('email'),
      token: localStorage.getItem('x-access-token')
    }
    const h = new Headers();
    h.append('Content-Type', 'application/json');

    if (session.email && session.token) {
      h.append('x-access-token', session.token);
      // h.append('email', session.email);
    };

    fetch('http://localhost:3000/request/state', {
      method: 'POST',
      // mode: 'noCORS',
      body: JSON.stringify(data),
      headers: h
    }).then(function (res) {
      return res.json();
    })
  } 



  handleStatusChange = () => {
    const self = this;
    if (self.state.status) {
      self.setState({
        status: false,
        statusText: "STANDBY"
      })
      localStorage.setItem('state', 0);
      self.changeState();

    } else {
      self.setState({
        status: true,
        statusText: "READY"
      })
      localStorage.setItem('state', 1);
      self.changeState();

    }
  }
  // Change status of driver
  changeState = () => {
    const self = this;
    const id = localStorage.getItem("idDriver");
    const state = localStorage.getItem("state");
    const data = {
      id: id,
      state: state,
      "latDriver": localStorage.getItem("latDriver"),
      "lngDriver": localStorage.getItem("lngDriver")
    }
    const session = {
      // email: localStorage.getItem('email'),
      token: localStorage.getItem('x-access-token')
    }
    const h = new Headers();
    h.append('Content-Type', 'application/json');

    if (session.email && session.token) {
      h.append('x-access-token', session.token);
      // h.append('email', session.email);
    };

    fetch('http://localhost:3000/driver/state', {
      method: 'POST',
      // mode: 'noCORS',
      body: JSON.stringify(data),
      headers: h
    }).then(function (res) {
      return res.json();
    })
      .then((res) => {
        console.log(res);
        console.log(res.msg);
        if (res.msg === "INVALID TOKEN") {

          const rfToken = localStorage.getItem('refresh_token');
          const id = localStorage.getItem('idDriver');
          const dataRfToken = {
            id: id,
            rfToken: rfToken
          }
          fetch('http://localhost:3000/users/updateToken', {
            method: 'POST',
            body: JSON.stringify(dataRfToken),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function (res) {
            return res.json();
          }).then((res) => {
            if (res.auth === true) {

              localStorage.setItem('x-access-token', res.access_token);
              // self.updateToken()
              const sessionT = {
                // email: localStorage.getItem('email'),
                token: localStorage.getItem('x-access-token')
              }

              const hT = new Headers();
              hT.append('Content-Type', 'application/json');

              if (sessionT.email && sessionT.token) {
                hT.append('x-access-token', sessionT.token);
                // hT.append('email', sessionT.email);
              };

              fetch('http://localhost:3000/driver/state', {
                method: 'POST',
                // mode: 'noCORS',
                body: JSON.stringify(data),
                headers: hT
              }).then(function (res) {
                return res.json();
              })
                .then((res) => {
                  console.log(res);
                })
            } else {
              localStorage.setItem('auth', false);

            }
          })
        };
        if (res.statusCode === 403) {
          localStorage.setItem("auth", false);
        }
      })
  }

  hanldeAcceptRequest = () => {
    // e.preventDefault();
    var self = this;
    var data = {
      "idDriver": localStorage.getItem("idDriver"),
      "idRequest": localStorage.getItem("idRequest"),
      "latDriver": localStorage.getItem("latDriver"),
      "lngDriver": localStorage.getItem("lngDriver")
      
    };
    console.log(data.idDriver);
    const session = {
      token: localStorage.getItem('x-access-token'),
      email: localStorage.getItem('email')
    };
    const h = new Headers();
    h.append('Content-Type', 'application/json');

    if (session.email && session.token) {
      h.append('x-access-token', session.token);
      // h.append('email', session.email);
    };
    fetch('http://localhost:3000/driver/accept', {
      method: 'POST',
      // mode: 'noCORS',
      body: JSON.stringify(data),
      headers: h
    }).then(function (res) {
      return res.json();

    }).then((res) => {
      console.log(res.msg);

      //

      if (res.msg === "INVALID TOKEN") {

        const rfToken = localStorage.getItem('refresh_token');
        const id = localStorage.getItem('id');
        const dataRfToken = {
          id: id,
          rfToken: rfToken
        }
        fetch('http://localhost:3000/users/updateToken', {
          method: 'POST',
          body: JSON.stringify(dataRfToken),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          return res.json();
        }).then((res) => {
          if (res.auth === true) {

            localStorage.setItem('x-access-token', res.access_token);
            // self.updateToken()
            const sessionT = {
              email: localStorage.getItem('email'),
              token: localStorage.getItem('x-access-token')
            }

            const hT = new Headers();
            hT.append('Content-Type', 'application/json');

            if (sessionT.email && sessionT.token) {
              hT.append('x-access-token', sessionT.token);
              // hT.append('email', sessionT.email);
            };

            fetch('http://localhost:3000/driver/accept', {
              method: 'POST',
              // mode: 'noCORS',
              body: JSON.stringify(data),
              headers: hT
            }).then(function (res) {
              return res.json();
            })
              .then((res) => {
                console.log(res);
              })
          } else {
            localStorage.setItem('auth', false);
          }
        })
      };
      if (res.statusCode === 403) {
        localStorage.setItem("auth", false);
      }
      //
    })

    const requestLat = this.state.res.lat;
    const requestLng = this.state.res.log;
    self.setState({
      modalVisible: false,
      requestLocation: {
        lat: requestLat + '',
        lng: requestLng + ''
      }
    });
  }


  // handleModalVisible = (isAccept) => {
  //   this.setState({
  //     modalVisible: !this.state.modalVisible,
  //   });

  //   // if (isAccept){
  //   //   this.hanldeAcceptRequest();
  //   // }
  // }

  // hanldeAcceptRequest = () => {
  //   this.setState({
  //     requestLocation: {
  //       lat: "10.7614556",
  //       lng: "106.6827258"
  //     }
  //   });
  // }


  render() {
    const self = this;
    // self.notice();
    // var req = self.state.res;
    // console.log("test " + req);
    // const data = JSON.parse(self.state.res);
    const data = self.state.res;
    // console.log(data);
    var driverId = localStorage.getItem('id');
    // console.log(data);
    return (
      <div className="App">
        <div className="app-container">
          <div className="brand-logo">
            Doubble Son
            <br></br>
            Take car
          </div>

          <div>
            <Modal
              isOpen={self.state.modalVisible}
              toggle={self.handleModalVisible}
              onOpened={self.startTimer}
              centered={true}
            >
              <div className="request-modal">
                {/* {Object.values(data).map(x => */}
                {
                  <div className="request-modal-content">

                    <h4>Khách hàng</h4>

                    <h3>{(data && data.name) ? data.name : ''}</h3>
                    <div>
                      Sđt: {(data && data.telephone) ? data.telephone : ''}
                    </div>
                    <div>
                      Địa chỉ: {(data && data.address) ? data.address : ''}
                    </div>
                  </div>
                }

                <div>
                  {/* <Button color="primary" onClick={() => this.handleModalVisible(true)}>Accept{this.state.time.s}</Button>{' '}
                  <Button color="secondary" onClick={() => this.handleModalVisible(false)}>Cancel</Button> */}
                  <Button color="primary" onClick={() => self.hanldeAcceptRequest()}>Accept {self.state.time.s}</Button>{' '}
                  <Button color="secondary" onClick={self.handleModalVisible}>Cancel</Button>
                </div>
              </div>
            </Modal>
          </div>

          <Row>
            <Col md={3} sm={6} className="card-infor">
              <div className="info-container ride-info-card">
                <div className="card-info-header">
                  Thông tin
                  <br />
                  chuyến đi
                </div>
                <div className="status-info text-center">
                  <Button color={self.state.rideStatus ? "danger" : "success"} onClick={() => this.handleStart()}>{self.state.rideText}</Button>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6} className="card-infor">
              <div className="info-container request-info-card">
                <div className="card-info-header">
                  Khách hàng
                  <br />
                  {data.name}
                </div>

                <div className="card-bottom-content">
                {data.infor}
                </div>
              </div>
            </Col>
            <Col md={3} sm={6} className="card-infor">
              <div className="info-container driver-info-card">
                <div className="card-info-header">
                  Tài xế
                  <br />
                  {localStorage.getItem("name")}
                </div>

                {/* <div className="card-bottom-content">
                </div> */}
              </div>
            </Col>
            <Col md={3} sm={6} className="card-infor">
              <div className="info-container driver-status-card">
                <div className="card-info-header">
                  Trạng thái
                </div>

                <div className="status-info">
                  <div className="text-center">
                    <div>
                      <Badge color={self.state.status == true ? "primary" : "danger"} className="info-badge">
                        {self.state.statusText}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <label className="switch">
                        <input type="checkbox" checked={self.state.status} onChange={() => self.handleStatusChange()} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="maps-container">
          <MapContainer
            driverId={driverId}
            requestLocation={this.state.requestLocation}
          ></MapContainer>
        </div>
      </div>
    );
  }
}




export default Driver;
