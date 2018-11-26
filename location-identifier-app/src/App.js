import React, { Component } from 'react';
import MapContainer from './maps/MapContainer';
import './App.css';
import { Col, Row, Button, Table, Form, FormGroup, Label, Input, FormText, Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import socketIoClient from 'socket.io-client';


class App extends Component {
  constructor() {
    super();
    this.state = {
      res: false,
      detail: "",
      endpoint: "http://localhost:3000"
    }

    this.SetRequestDetail = this.SetRequestDetail.bind(this);
  }

  componentDidMount() {
    const self = this;
    const  endpoint  = self.state.endpoint;
    const socket = socketIoClient(endpoint);
    console.log(endpoint, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 2000,
      reconnectionAttempts: 5,
    });
    socket.on("get data", data => self.setState({ res: JSON.stringify(data) }));
    console.log(self.state.res);
  };

  SetRequestDetail = (record) => {
    this.setState({
      detail: record
    })
  }
  GetRequestDetail = (record) => {
    this.SetRequestDetail(record);
  }

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
      // console.log(data);
      
    });

  }

  render() {
    var self = this;
    var { res, detail } = self.state;
    const data = JSON.parse(self.state.res);
// res.map(item => console.log(item.name));
// res là 1 cục json mẫu như này:
//create table `request`(
//id int(11) unsigned AUTO_INCREMENT PRIMARY KEY,
//telephone int(14) not null,
//name varchar(50) not null,
//address varchar(50) not null,
//infor varchar(100),
//state integer not null, = 1 là đang chờ thằng tài tới chở, =0 là nó đón cmnr, =2 là lọ đó hủy chuyến
//isDelete boolean default false,
//created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
//);
// Cần lấy name, telephone, address, state thôi nhá

    console.log(res);
    return (
      < div className="App" >
        < div className="request-info" >
          <div className="header-request">
            Doubble Son
          </div>



          <Row>
            <Col md={6}>
              <div className="info-container">
                <div className="request-table">
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map(x => 
                      <tr key={x.id} onClick={() => this.GetRequestDetail(x)}>
                        <td>{x.name}</td>
                        <td>{x.address.length >= 50 ? x.address.substring(0, 50)+ "..." : x.address}</td>
                      </tr>
                    )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="info-container">
                <ListGroup>
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      <Badge className="info-badge" color="dark" pill>Name</Badge>
                      {detail.name? detail.name : ""}
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <Badge className="info-badge" color="dark" pill>Phone</Badge>
                      {detail.telephone? detail.telephone: ""}
                    </ListGroupItemText>
                    <ListGroupItemText>
                      <Badge className="info-badge" color="dark" pill>Address</Badge>
                      {detail.address? detail.address: ""}
                    </ListGroupItemText>
                    <ListGroupItemText>
                      <Badge className="info-badge" color="dark" pill>Notes</Badge>
                      {detail.infor? detail.infor: ""}
                    </ListGroupItemText>
                  </ListGroupItem>
                  {/* <ListGroupItem>
                    <Input value={detail.address} type="text" name="address" placeholder="Input address here to indentify location..."></Input>
                    <br></br>
                    <Button color="info" onClick={this.IdentityLocation(detail.address)}>Identify</Button>
                  </ListGroupItem> */}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </div >
        <div className="maps-container">
          <MapContainer
            requestId={detail.id}
            address={detail.address}
          ></MapContainer>
        </div>
      </div >
    );
  }
}

export default App;
