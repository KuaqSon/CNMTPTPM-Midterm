import React, { Component } from 'react';
import MapContainer from './maps/MapContainer';
import './App.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import socketIoClient from 'socket.io-client';


class App extends Component {
  constructor() {
    super();
    this.state = {
      res: false,
      endpoint: "http://localhost:3000"
    }
  }

  componentDidMount() {
    const self = this;
    const { endpoint } = self.state;
    const socket = socketIoClient(endpoint);
    socket.on("get data", data => self.setState({ res: JSON.stringify(data) }));
    console.log(self.state.res);
    // const  {endpoint} = self.state;

    // setInterval(() => self.send(), 3000);
  }

  // componentWillUnmount() {
  //   // use intervalId from the state to clear the interval
  //   clearInterval(this.send());
  // }; 

  send = () => {
    var self = this;
    const socket = socketIoClient(self.state.endpoint, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 2000,
      reconnectionAttempts: 5,
    });
    socket.on("get data", (data) => {
      self.setState({ res: data });
      console.log(self.state.res);
    });

  }

  render() {
    var self = this;
    var { res, endpoint } = self.state;
// res.map(item => console.log(item.name));

    console.log(res);
    return (
      < div className="App" >
        < div className="request-info" >
          <div className="header-request">

            Doubble Son
            <br></br>

            

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
        </div >
        <div className="maps-container">
          <MapContainer></MapContainer>
        </div>
      </div >
    );
  }
}

export default App;
