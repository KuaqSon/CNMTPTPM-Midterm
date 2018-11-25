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
      modalVisible: false,
      // openModal: false,
      time: {},
      seconds: 10,
      res: false,
      endpoint: "http://localhost:3000"
    }; // pass data here 

    self.timer = 0;
    self.startTimer = self.startTimer.bind(self);
    self.countDown = self.countDown.bind(self);
    self.handleStatusChange = self.handleStatusChange.bind(self);
    self.handleModalVisible = self.handleModalVisible.bind(self);
    // self.notice = self.notice.bind(self);
    self.send = self.send.bind(self);
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
    var auth =localStorage.getItem('auth');
    if(auth ==="false" || auth === null){
      self.props.history.push('/login');
    }

    self.authRfToken();
    self.send();
  }
  
  send = () => {
    var self = this;


    const id = localStorage.getItem('idDriver');
    const { endpoint } = self.state;
    const socket = socketIoClient(endpoint,{
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 2000,
      reconnectionAttempts: 5
    });
    socket.on('driver'+id, (data)=>{
      self.setState({res: JSON.stringify(data)});
      // console.log(data);
      if(!self.isEmpty(data))
      console.log(data);
      self.setState({
        modalVisible: true,
        // openModal: true
      })
      // return data;
    })
  }

  authRfToken = () =>{
    const self =this;
    var auth =localStorage.getItem('auth');
    if(auth ==="false" || auth === null){
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
      modalVisible: false
    })
    // self.setState({
    //   modalVisible: !self.state.modalVisible,
    // });
    // const id = localStorage.getItem("idDriver");

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
      state: state
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



  render() {
    const self = this;
    // self.notice();
    return (
      <div className="App">
        <div className="app-container">
          <Row onClick={() => self.handleModalVisible()}>
            <Col md={4} sm={6}>
              <div className="brand-logo">
                Doubble Son
                <br></br>
                Take car
              </div>
            </Col>
          </Row>

          <div>
            <Modal
              isOpen={self.state.modalVisible}
              toggle={self.handleModalVisible}
              onOpened={self.startTimer}
              centered={true}
            >
              <div className="request-modal">
                <div className="request-modal-content">
                  <h4>Khách hàng</h4>
                  <h3>Trần Thị B</h3>
                  <div>
                    Sđt: 124124124
                  </div>
                  <div>
                    Địa chỉ: 391 Lũy Bán Bích
                  </div>
                </div>
                <div>
                  <Button color="primary" onClick={self.handleModalVisible}>Accept {self.state.time.s}</Button>{' '}
                  <Button color="secondary" onClick={self.handleModalVisible}>Cancel</Button>
                </div>
              </div>
            </Modal>
          </div>

          <Row>
            <Col md={3} sm={6}>
              <div className="info-container driver-status-card">
                <div className="card-info-header">
                  Trạng thái
                </div>

                <div className="status-info">
                  <Row className="align-items-center no-gutters">
                    <Col>
                      <label className="switch">
                        <input type="checkbox" checked={self.state.status} onChange={() => self.handleStatusChange()} />
                        <span className="slider round"></span>
                      </label>
                    </Col>
                    <Col>
                      <Badge color={self.state.status == true ? "primary" : "danger"} className="info-badge">
                        {self.state.statusText}
                      </Badge>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="info-container ride-info-card">
                <div className="card-info-header">
                  Thông tin
                  <br />
                  chuyến đi
                </div>

                <div className="status-info">
                  <div className="mb-3 mt-2">
                    <Progress value={75} />
                    <div className="text-center">
                      <Badge color="dark" className="info-badge mt-2">
                        75%
                        </Badge>
                    </div>
                  </div>
                  <Badge color="success" className="info-badge mb-2">
                    Tổng cộng: 9Km
                    </Badge>
                  <Badge color="info" className="info-badge mb-2">
                    Hoàn Thành: 5Km
                    </Badge>
                  <Badge color="warning" className="info-badge mb-2">
                    Còn lại: 4Km
                    </Badge>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="info-container request-info-card">
                <div className="card-info-header">
                  Khách hàng
                  <br />
                  Trần Thị B
                </div>

                <div className="card-bottom-content">
                  Lorem Ipsum has
                  been the industry's standard
                  dummy text ever since the 1500s
                </div>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="info-container driver-info-card">
                <div className="card-info-header">
                  Tài xế
                  <br />
                  Nguyễn Văn A
                </div>

                <div className="card-bottom-content">
                  Lorem Ipsum has
                  been the industry's standard
                  dummy text ever since the 1500s
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="maps-container">
          <MapContainer></MapContainer>
        </div>
      </div>
    );
  }
}




export default Driver;
