import React, { Component } from 'react';
import './RequestForm.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

class RequestForm extends Component {


    constructor() {
        super();
        var self = this;
        self.handleSubmit = self.handleSubmit.bind(self);
        // this.state={ name:"", telephone:""} 
        // this.name = React.createRef();
        // self.telephone = React.createRef();
        // self.address = React.createRef();
        // self.infor = React.createRef();

    }

    

    handleSubmit(e) {
        e.preventDefault();
        var self = this;
        // const data = new FormData(e.target);
        var data = {
            "name": self.name.value,
            "telephone": self.telephone.value,
            "address": self.address.value,
            "infor": self.infor.value
        }
        console.log(data);
        console.log(JSON.stringify(data));
        console.log(this.name.value);

        fetch('http://localhost:3002/request/add', {
            method: 'POST',
            // mode: 'noCORS',
            body: JSON.stringify(data),
            headers: {
                // 'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    // componentDidMount() {
    //     // fetch("https://jsonplaceholder.typicode.com/users")
    //     fetch("http://localhost:3000/receivers/add", {
    //         method: "POST",
    //         // mode: 'no-cors',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({

    //         })
    //     }).then(res => res.json())
    //         // .then(parsedJSON => console.log(parsedJSON))
    //         .then(json => this.setState({
    //             items: json,
    //             isLoader: false
    //         }))
    //         .catch(err => console.log(err));
    // }
  
     
    render() {
        const self = this;
        return (

            <div className="request-form">
                <div className="header-request">
                    Doubble Son
                    <br></br>
                    Take car
            </div>

                {/* {items.map(item => (
                    <li key={item.id}>
                        => Name: {item.name}
                        Telephone: {item.telephone}
                        Address: {item.address}
                        Infor: {item.infor}

                    </li>

                ))} */}
                <Form className="form-container" onSubmit={self.handleSubmit}>

                    <Row form>
                        <Col md={6}>
                            <FormGroup >
                                <Label for="name">Name</Label>
                                {/* <Input  type="text" name="name" id="name" placeholder="with a placeholder" floatingLabelText="name"/> */}
                                <Input  innerRef = {(name) => this.name = name} type="text" name="name" id="name" placeholder="with a placeholder" floatingLabelText="name"/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup >
                                <Label for="telephone">Phone Number</Label>
                                {/* <Input ref={(ref) => {self.telephone = ref}} type="tel" name="phone" id="examplePassword" placeholder="password placeholder" floatingLabelText="telephone" /> */}
                                <Input innerRef = {(telephone) => this.telephone = telephone} type="tel" name="phone" id="telephone" placeholder="password placeholder" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        {/* <Input ref={(ref) => {self.address = ref}} type="text" name="address" id="exampleAddress" placeholder="1234 Main St" floatingLabelText="address"/> */}
                        <Input innerRef = {(address) => this.address = address} type="text" name="address" id="address" placeholder="1234 Main St" />
                    </FormGroup>
                    <Row form>
                        <Col md={8}>
                            <FormGroup >
                                <Label for="exampleCity">Information</Label>
                                {/* <Input ref={(ref) => {self.infor = ref}} type="text" name="city" id="exampleCity" floatingLabelText="infor" /> */}
                                <Input innerRef = {(infor) => this.infor = infor} type="text" name="city" id="infor"  />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup >
                                <Label for="exampleState">State</Label>
                                {/* <Input ref={(ref) => {self.state = ref}} type="text" name="state" id="exampleState"  floatingLabelText="state"/> */}
                                <Input innerRef = {(state) => this.State = state} type="text" name="state" id="state"  />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress2">Notes</Label>
                        {/* <Input ref={(ref) => {self.note = ref}} type="textarea" name="note" id="exampleNote" placeholder="Apartment, studio, or floor" /> */}
                        <Input innerRef = {(note) => this.note = note} type="textarea" name="note" id="note"  />
                    </FormGroup>
                    <Button>Book</Button>
                </Form>
            </div>)
    }
}


export default RequestForm;
