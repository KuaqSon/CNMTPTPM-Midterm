import React, { Component } from 'react';
import MapContainer from './maps/MapContainer';
import './App.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Progress , Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { status: false, statusText: "STANDBY"} // pass data here 
    this.handleStatusChange = this.handleStatusChange.bind(this)  
}

  handleStatusChange = (checked) => {
    if (checked) {
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

  render() {
    return (
      <div className="App">
        <div className="app-container">
          <Row>
            <Col md={4} sm={6}> 
              <div className="brand-logo">
                Doubble Son 
                <br></br>
                Take car
              </div>
            </Col>
          </Row>
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
                        <input type="checkbox" checked={this.state.status} onChange={() => this.handleStatusChange(this.state.status)}/>
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

export default App;
