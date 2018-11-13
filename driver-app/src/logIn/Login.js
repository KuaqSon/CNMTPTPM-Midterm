import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './login.css';
import '../App.css';


class LoginForm extends Component {
  render() {
    return (
      <div>
        <Form className="driver-login">
            <div className="brand-logo">
                Doubble Son 
                <br></br>
                Take car
            </div>  
            <FormGroup className="mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
            </FormGroup>
            <FormGroup className="mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2 mt-3">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
            </FormGroup>
            <Button color="success" className="mt-4">Log in</Button>
        </Form>
        
      </div>
    );
  }
}

export default LoginForm;