import React, { Component } from 'react';
import './RequestForm.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            note: '',
        };
        this.onSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var data = this.state;
        // to do: hard code what field want to submit to server, not submit all state

        console.log(data);

        axios.post('http://localhost:3000/request/test', data)
        .then(res => console.log(res));

        this.setState({
            name: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            note: '',
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
        // const { isLoader, items } = self.state;


        return (

            <div className="request-form">
                <div className="header-request">
                    Doubble Son
                    <br></br>
                    Take car
                </div>
                <Form className="form-container" onSubmit={this.onSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Name</Label>
                                <Input type="text" name="name" id="exampleEmail" placeholder="with a placeholder"
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Phone Number</Label>
                                <Input type="tel" name="phone" id="examplePassword" placeholder="password placeholder"
                                value={this.state.phone}
                                onChange={e => this.setState({ phone: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"
                        value={this.state.address}
                        onChange={e => this.setState({ address: e.target.value })}
                        />
                    </FormGroup>
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="exampleCity">Information</Label>
                                <Input type="text" name="city" id="exampleCity"
                                value={this.state.city}
                                onChange={e => this.setState({ city: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleState">State</Label>
                                <Input type="text" name="state" id="exampleState"
                                value={this.state.state}
                                onChange={e => this.setState({ state: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress2">Notes</Label>
                        <Input type="textarea" name="note" id="exampleNote" placeholder="Apartment, studio, or floor"
                        value={this.state.note}
                        onChange={e => this.setState({ note: e.target.value })}
                        />
                    </FormGroup>
                    <Button>Book</Button>
                </Form>
            </div>
        )
    }
}


export default RequestForm;
