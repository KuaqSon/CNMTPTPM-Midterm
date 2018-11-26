import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './login.css';
import '../App.css';
// import Cookies from 'universal-cookie';
import axios from 'axios'
import { isObject } from 'util';


class LoginForm extends Component {

  constructor() {
    super();
    var self = this;
    self.handleSubmit = self.handleSubmit.bind(self);
    self.state = {
      data: '',
      isLogin: false
    }
  }





  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    var data = {
      "username": self.username.value,
      "password": self.password.value
      // "refresh_token": self.refresh_token.value,

    }
    console.log(JSON.stringify(data));
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then(function (res) {
      console.log(res);
      return res.json();
    })
      .then(function (res) {
        // console.log(res);
        if (res.auth === true) {
          self.setState({isLogin: true});
          localStorage.setItem('refresh_token', res.refresh_token);
          localStorage.setItem('x-access-token', res.access_token);
          localStorage.setItem('email', JSON.stringify(res.user.email));
          localStorage.setItem('id', JSON.stringify(res.user.id));
          // if(res.auth === true)
          localStorage.setItem('auth', res.auth);
          this.props.history.push('/request');
        }
        else {
          console.log("DKM éo có tài khoảng cũng đòi login!");
          localStorage.setItem('auth', false);

        }

      })


  }


  render() {
    const self = this;
    if(self.state.isLogin === false){

    return (
      <div>
        <Form className="driver-login" onSubmit={self.handleSubmit}>
          <div className="brand-logo">
            Doubble Son
                <br></br>
            Take car
            </div>
          <FormGroup className="mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
            {/* <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" /> */}
            <Input innerRef={(username) => self.username = username} type="username" name="username" id="username" placeholder="something@idk.cool" />
          </FormGroup>
          <FormGroup className="mr-sm-2 mb-sm-0">
            <Label for="examplePassword" className="mr-sm-2 mt-3">Password</Label>
            {/* <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" /> */}
            <Input innerRef={(password) => self.password = password} type="password" name="password" id="examplePassword" placeholder="don't tell!" />
          </FormGroup>
          <Button color="success" className="mt-4">Log in</Button>
        </Form>

      </div>
    );
    } else {
      return(
            <Label for="success" className="mr-sm-2">Success</Label>
      );
    } 
  }
}

export default LoginForm;