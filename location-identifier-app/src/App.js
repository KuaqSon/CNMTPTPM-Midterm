import React, { Component } from 'react';
import MapContainer from './maps/MapContainer';
import './App.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="request-info">
          <div className="header-request">
            Doubble Son 
            <br></br>
            Take car
          </div>
          <Row>
            <Col md={6}>
              <div className="info-container">
                <ListGroup flush>
                  <ListGroupItem active>
                    <ListGroupItemHeading>Nguyen Van A</ListGroupItemHeading>
                    <ListGroupItemText>
                      227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>Nguyen Thi B</ListGroupItemHeading>
                    <ListGroupItemText>
                      10-12 Đinh Tiên Hoàng, Bến Nghé, Quận 1, Hồ Chí Minh
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>Tran Van C</ListGroupItemHeading>
                    <ListGroupItemText>
                      268 Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>Tran Van C</ListGroupItemHeading>
                    <ListGroupItemText>
                      268 Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh
                    </ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
            <Col md={6}>
              <div className="info-container">
                <ListGroup>
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      <Badge className="info-badge" color="dark" pill>Name</Badge>
                      Nguyen Van A
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <Badge className="info-badge" color="dark" pill>Phone</Badge>
                      12345678
                    </ListGroupItemText>
                    <ListGroupItemText>
                      <Badge className="info-badge" color="dark" pill>Address</Badge>
                      227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh
                    </ListGroupItemText>
                    <ListGroupItemText>
                      <Badge className="info-badge" color="dark" pill>Notes</Badge>
                      
                    </ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Input type="text" name="address" placeholder="Input address here to indentify location..."></Input> 
                    <br></br>
                    <Button color="info">Identify</Button>
                  </ListGroupItem>
                </ListGroup>
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
