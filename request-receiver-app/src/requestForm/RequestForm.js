import React, { Component } from 'react';
import './RequestForm.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import Textfield from 'material-ui/Textfield';
// import axios from 'axios';

class RequestForm extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        var self = this;
        var data = new FormData();
        // payload
        // data.append("myjsonkey", JSON.stringify(payload));

        fetch('http://localhost:3000/request/add', {
            method: 'POST',
            mode: 'CORS',
            body: JSON.stringify(data),
            headers: {
                // 'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                console.log(body);
            });
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
        // const { isLoader, items } = self.state;


        return (

            <div className="request-form">Data have been loaded
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
                <Form className="form-container" onSubmit={self.onSubmit}>

                    <Row form>
                        <Col md={6}>
                            <FormGroup ref="name">
                                <Label for="exampleEmail">Name</Label>
                                <Input type="text" name="name" id="exampleEmail" placeholder="with a placeholder" floatingLabelText="name"/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup ref="telephone">
                                <Label for="examplePassword">Phone Number</Label>
                                <Input type="tel" name="phone" id="examplePassword" placeholder="password placeholder" floatingLabelText="telephone" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" floatingLabelText="address"/>
                    </FormGroup>
                    <Row form>
                        <Col md={8}>
                            <FormGroup ref="infor">
                                <Label for="exampleCity">Information</Label>
                                <Input type="text" name="city" id="exampleCity" floatingLabelText="infor" />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup ref="state">
                                <Label for="exampleState">State</Label>
                                <Input type="text" name="state" id="exampleState"  floatingLabelText="state"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress2">Notes</Label>
                        <Input type="textarea" name="note" id="exampleNote" placeholder="Apartment, studio, or floor" />
                    </FormGroup>
                    <Button>Book</Button>
                </Form>




            </div>)
        // });
    }
    // }
}


export default RequestForm;
