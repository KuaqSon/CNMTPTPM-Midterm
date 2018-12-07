import React, { Component } from 'react';
import './RequestForm.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import axios from 'axios';
// import authRfToken from '../config/auth';
import { Redirect } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class RequestForm extends Component {


  constructor() {
    super();
    var self = this;
    this.state = {
      auth: Boolean,
    }
    this.handleSubmit = this.handleSubmit.bind(self);
  }

  Submit = (e) => {
    e.preventDefault();
    var self = this;
    confirmAlert({
      title: "Gọi xe ?",
      message: "Chào " + self.name.value + ", bạn sẽ gọi một xe đến đón tại: " +  self.address.value,
      buttons: [
        {
          label: "Đồng Ý",
          onClick: () => self.handleSubmit(e)
        },
        {
          label: "Hủy"
        }
      ]
    })
  }

  handleSubmit(e) {
    // e.preventDefault();
    var self = this;
    var data = {
      "name": self.name.value,
      "telephone": self.telephone.value,
      "address": self.address.value,
      "infor": self.infor.value,
      "lat": 0,
      "log": 0,
      "idUser": localStorage.getItem('id')
    }

    const session = {
      email: localStorage.getItem('email'),
      token: localStorage.getItem('x-access-token')
    }
    const h = new Headers();
    h.append('Content-Type', 'application/json');

    if (session.email && session.token) {
      h.append('x-access-token', session.token);
      // h.append('email', session.email);
    };

    fetch('http://localhost:3000/request/add', {
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

              fetch('http://localhost:3000/request/add', {
                method: 'POST',
                // mode: 'noCORS',
                body: JSON.stringify(data),
                headers: hT
              }).then(function (res) {
                return res.json();
              })
                .then((res) => {
                  console.log(res);
                  confirmAlert({
                    title: "Thành công !!",
                    message: "Bạn đã gọi xe thành công, hãy chờ một lát để xe đến đón bạn nhé !",
                    buttons: [
                      {
                        label: "OK"
                      }
                    ]
                  });
                })
            } else {
              localStorage.setItem('auth', false);

            }
          })
        } else 
        {
          confirmAlert({
            title: "Thành công !!",
            message: "Bạn đã gọi xe thành công, hãy chờ một lát để xe đến đón bạn nhé !",
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        };
        if (res.statusCode === 403) {
          localStorage.setItem("auth", false);
        }
      })
  }

  componentDidMount() {
    // authRfToken();
    var self = this;
    var auth = localStorage.getItem("auth");
    if (auth === "false" || auth === null) {
      self.props.history.push('/login');
    }
  }

  // updateToken(){
  //     const rfToken = localStorage.getItem('refresh_token');
  //     const id = localStorage.getItem('id');
  //     const data = {
  //         id: id,
  //         rfToken: rfToken
  //     }
  //     fetch('http://localhost:3000/user/updateToken', {
  //         method: 'POST',
  //         body: JSON.stringify(data),
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     }).then(function (res) {
  //         return res;
  //     }).then((res) => {
  //         if (res.auth === true) {
  //             localStorage.setItem('x-access-token', res.access_token);
  //         } else {
  //             localStorage.setItem('auth', false);
  //         }
  //     })
  // }

  render() {
    const self = this;

    return (
      <div className="container">
        <div className="request-form">
          <Row className="justify-content-between">
            <Col>
              <div className="header-request">
                Doubble Son
                <br/>
                Take car
              </div>
            </Col>
            <Col className="mt-5">
              <Form className="form-container" onSubmit={self.Submit}>
                <FormGroup >
                  <Label for="name"><h5>Name</h5></Label>
                  {/* <Input  type="text" name="name" id="name" placeholder="with a placeholder" floatingLabelText="name"/> */}
                  <Input innerRef={(name) => this.name = name} type="text" name="name" id="name" placeholder="Tell us what is your name ?" />
                </FormGroup>
                <FormGroup >
                  <Label for="telephone"><h5>Phone Number</h5></Label>
                  {/* <Input ref={(ref) => {self.telephone = ref}} type="tel" name="phone" id="examplePassword" placeholder="password placeholder" floatingLabelText="telephone" /> */}
                  <Input innerRef={(telephone) => this.telephone = telephone} type="tel" name="phone" id="telephone" placeholder="Tell us what is your phone ?" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleAddress"><h5>Address</h5></Label>
                  {/* <Input ref={(ref) => {self.address = ref}} type="text" name="address" id="exampleAddress" placeholder="1234 Main St" floatingLabelText="address"/> */}
                  <Input innerRef={(address) => this.address = address} type="text" name="address" id="address" placeholder="Tell us where are you :D ?" />
                </FormGroup>
                <FormGroup >
                  <Label for="exampleCity"><h5>Information</h5></Label>
                  {/* <Input ref={(ref) => {self.infor = ref}} type="text" name="city" id="exampleCity" floatingLabelText="infor" /> */}
                  <Input innerRef={(infor) => this.infor = infor} type="textarea" name="city" id="infor" placeholder="Give us anything else..."/>
                </FormGroup>
                {/* <FormGroup >
                  <Label for="exampleState">State</Label>
                  <Input innerRef={(state) => this.State = state} type="text" name="state" id="state" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleAddress2">Notes</Label>
                  <Input innerRef={(note) => this.note = note} type="textarea" name="note" id="note" />
                </FormGroup> */}
                <Button color="success">Book</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}


export default RequestForm;
