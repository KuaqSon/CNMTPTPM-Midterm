import React, { Component } from 'react';
import './RequestForm.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class RequestForm extends Component {
    render() {
        return (
            <div className="request-form">
                <div className="header-request">
                    Doubble Son 
                    <br></br>
                    Take car
                </div>

                <Form className="form-container">
                    <Row form>
                    <Col md={6}>
                        <FormGroup>
                        <Label for="exampleEmail">Name</Label>
                        <Input type="text" name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                        <Label for="examplePassword">Phone Number</Label>
                        <Input type="tel" name="password" id="examplePassword" placeholder="password placeholder" />
                        </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress">Address</Label>
                        <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
                    </FormGroup>
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                            <Label for="exampleCity">City</Label>
                            <Input type="text" name="city" id="exampleCity"/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                            <Label for="exampleState">State</Label>
                            <Input type="text" name="state" id="exampleState"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress2">Notes</Label>
                        <Input type="textarea" name="note" id="exampleNote" placeholder="Apartment, studio, or floor"/>
                    </FormGroup>
                    <Button>Book</Button>
                </Form>
            </div>
        );
    }
}

export default RequestForm;
