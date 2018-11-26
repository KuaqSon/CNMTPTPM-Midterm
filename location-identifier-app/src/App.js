import React, { Component } from 'react';
import './App.css';
import Identify from './Identify';
import LoginForm from './logIn/Login';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class App extends Component {
  render() {
    const auth = localStorage.getItem("auth");
    return (
<<<<<<< HEAD
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
=======
      <Router>
        <div>
          <Route exact path="/" render={() => (
            auth ? (
              <Redirect to="/identify"/>
            ) : (
              <Redirect to="/login"/>
            )
          )}/>
          <Route path="/identify" component={Identify} />
          <Route path="/login" component={LoginForm} />
>>>>>>> f/login-redirect
        </div>
      </Router>
    );
  }
}
export default App;
