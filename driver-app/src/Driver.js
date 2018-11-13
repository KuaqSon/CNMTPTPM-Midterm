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
  Progress , 
  Badge, 
  ListGroup, 
  ListGroupItem, 
  ListGroupItemHeading, 
  Modal,  
} from 'reactstrap';


class Driver extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      status: false, 
      statusText: "STANDBY",
      modalVisible: false,
      time: {}, 
      seconds: 10
    }; // pass data here 

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);  
    this.handleModalVisible = this.handleModalVisible.bind(this);
}

  secondsToTime(secs){
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

  // componentDidMount() {
  //   let timeLeftVar = this.secondsToTime(this.state.seconds);
  //   this.setState({ time: timeLeftVar });
  // }

  startTimer() {
    this.setState({
      seconds: 10,
      time: this.secondsToTime(10)
    })
    clearInterval(this.timer);
    this.timer = setInterval(this.countDown, 1000);
    // if (this.timer == 0 && this.state.seconds > 0) {
    //   this.timer = setInterval(this.countDown, 1000);
    // }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
      this.handleModalVisible();
    }
  }

  handleStatusChange = () => {
    if (this.state.status) {
      this.setState({
        status: false,
        statusText: "STANDBY"
      })
    } else {
      this.setState({
        status: true,
        statusText: "READY"
      })
    }
  }

  handleModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="app-container">
          <Row onClick={() => this.handleModalVisible()}>
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
            isOpen={this.state.modalVisible} 
            toggle={this.handleModalVisible} 
            onOpened={this.startTimer}
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
                <Button color="primary" onClick={this.handleModalVisible}>Accept {this.state.time.s}</Button>{' '}
                <Button color="secondary" onClick={this.handleModalVisible}>Cancel</Button>
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
                        <input type="checkbox" checked={this.state.status} onChange={() => this.handleStatusChange()}/>
                        <span className="slider round"></span>
                      </label>
                    </Col>
                    <Col>
                      <Badge color={this.state.status == true ? "primary" : "danger"} className="info-badge">
                        {this.state.statusText}
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
                  <br/>
                  chuyến đi
                </div>

                <div className="status-info">
                    <div className="mb-3 mt-2">
                      <Progress value={75}/>
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
                  <br/>
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
                  <br/>
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
