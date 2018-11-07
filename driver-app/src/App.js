import React, { Component } from 'react';
import MapContainer from './maps/MapContainer';
import './App.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Progress , Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


class App extends Component {
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
            <Col sm={3}>
              <div className="info-container driver-status-card">
                <div className="card-info-header">
                  Trạng thái 
                </div>

                <div className="status-info">
                  <Row className="align-items-center">
                    <Col span={4}>
                      <label className="switch">
                        <input type="checkbox" defaultChecked/>
                        <span className="slider round"></span>
                      </label>
                    </Col>
                    <Col span={6}>
                      <Badge color="primary" className="info-badge">
                        Ready
                      </Badge>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="info-container ride-info-card">
                <div className="card-info-header">
                  Thông tin
                  <br/>
                  chuyến đi
                </div>

                <div className="status-info">
                    <div className="mb-5">
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
                    <Badge color="warning" className="info-badge">
                      Còn lại: 4Km
                    </Badge>
                </div>
              </div>
            </Col>
            <Col sm={3}>
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
            <Col sm={3}>
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
