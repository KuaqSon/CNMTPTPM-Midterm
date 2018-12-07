import React, { Component } from 'react';
import MapContainer from './maps/MapContainer';
import './App.css';
import { Col, Row, Button, Table, Form, FormGroup, Label, Input, FormText, Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import socketIoClient from 'socket.io-client';
import Skeleton from 'react-loading-skeleton';

class Identify extends Component {
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
    // console.log(self.state.res);

    var auth = localStorage.getItem("auth");
    if (auth === "false" || auth === null) {
        self.props.history.push('/login');
    }
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
                  {
                    !data ? (
                      <div className="skeleton-container">
                        <div className="short"><Skeleton/></div>
                        <div className="long"><Skeleton/></div>
                        <div className="long"><Skeleton/></div>
                        <div className="short mt-3"><Skeleton/></div>
                        <div className="long"><Skeleton/></div>
                        <div className="long"><Skeleton/></div>
                        <div className="short mt-3"><Skeleton/></div>
                        <div className="long"><Skeleton/></div>
                        <div className="long"><Skeleton/></div>
                        <div className="long"><Skeleton/></div>
                        <div className="long"><Skeleton/></div>
                      </div>
                    )
                    :(
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
                    )
                  }
                  
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="info-container">
                <ListGroup flush>
                  <ListGroupItem>
                    <Badge className="info-badge" color="dark">Name</Badge>
                    <div className="mt-2 ml-3 detail-infor">
                      {!data && (
                        <div className="skeleton-container">
                          <div className="short"><Skeleton height={24}/></div>
                        </div>
                      )}
                      {detail.name? detail.name : ""}
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Badge className="info-badge" color="dark">Phone</Badge>
                    <div className="mt-2 ml-3 detail-infor">
                      {!data && (
                        <div className="skeleton-container">
                          <div className="short"><Skeleton height={20}/></div>
                        </div>
                      )}
                      {detail.telephone? detail.telephone: ""}
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Badge className="info-badge" color="dark">Address</Badge>
                    <div className="mt-2 ml-3 detail-infor">
                      {!data && (
                        <div className="skeleton-container">
                          <div className="long"><Skeleton height={24}/></div>
                        </div>
                      )}
                      {detail.address? detail.address: ""}
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Badge className="info-badge" color="dark">Notes</Badge>
                    <div className="mt-2 ml-3 detail-infor">
                      {!data && (
                        <div className="skeleton-container">
                          <div className="short"><Skeleton height={20}/></div>
                        </div>
                      )}
                      {detail.infor? detail.infor: ""}
                    </div>
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

export default Identify;
