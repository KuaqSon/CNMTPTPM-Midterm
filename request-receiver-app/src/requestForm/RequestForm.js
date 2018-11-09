import React, { Component } from 'react';
import './RequestForm.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class RequestForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoader: true
        };

    }

    componentDidMount() {
        // fetch("https://jsonplaceholder.typicode.com/users")
        fetch("http://localhost:3000/receivers", {
            method: "GET",
            // mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            // .then(parsedJSON => console.log(parsedJSON))
            .then(json => this.setState({
                items: json,
                isLoader: false
            }))
            .catch(err => console.log(err));
    }


    render() {
        const self = this;
        const { isLoader, items } = self.state;

        if (isLoader) {
            return <div className="request-form">
                <div className="header-request">
                    Doubble Son
                    <br></br>
                    Take car
            </div>
                Loading...

          </div>;
        }
        // else {


        // return <li key={telephone} title={name}>
        //     </li>
        //     })

        return (
            


            <div className="request-form">Data have been loaded
              <div className="header-request">
                Doubble Son
                    <br></br>
                Take car
            </div>

            {items.map(item =>(
                <li key={item.id}>
                                => Name: {item.name}
                                Telephone: {item.telephone}
                                Address: {item.address}
                                Infor: {item.infor}

                            </li>

                ))}
            {/* <Form className="form-container">
                
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <li key={item.telephone}>
                                Name: {item.name}
                            </li>
                            {/* <Label for="exampleEmail">Name</Label>
                            <Input type="text" name="name" id="exampleEmail" placeholder="with a placeholder" /> */}
                        {/* </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">Phone Number</Label>
                            <Input type="tel" name="phone" id="examplePassword" placeholder="password placeholder" />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="exampleAddress">Address</Label>
                    <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" />
                </FormGroup>
                <Row form>
                    <Col md={8}>
                        <FormGroup>
                            <Label for="exampleCity">Information</Label>
                            <Input type="text" name="city" id="exampleCity" />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="exampleState">State</Label>
                            <Input type="text" name="state" id="exampleState" />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="exampleAddress2">Notes</Label>
                    <Input type="textarea" name="note" id="exampleNote" placeholder="Apartment, studio, or floor" />
                </FormGroup>
                <Button>Book</Button>
            </Form> */}
            



        </div>)
        // });
    }
    // }
}


export default RequestForm;
