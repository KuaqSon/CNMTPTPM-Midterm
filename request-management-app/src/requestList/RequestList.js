import React, { Component } from 'react';
import './RequestList.css';
import {
    Col, Row, Button, Form, FormGroup, Label, Input, Table, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardImgOverlay, Badge
} from 'reactstrap';
import socketIoClient from 'socket.io-client';


class RequestForm extends Component {

    constructor() {
        super();
        this.state = {
            res: false,
            endpoint: "http://localhost:3000"
        }
    }

    componentDidMount() {
        const self = this;
        const { endpoint } = self.state;
        const socket = socketIoClient(endpoint);
        socket.on("get data", data => self.setState({ res: JSON.stringify(data) }));
        console.log(self.state.res);
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
            console.log(data);
        });
    }

    GetRequestDetails = (record) => {
        console.log(record);
    }



    render() {

        var self = this;
        var { res, endpoint } = self.state;

        const data = JSON.parse(self.state.res);
        // res là json như app location
        console.log(res);
        return (
            <div className="request-list">
                <div className="header-request">
                    Doubble Son
                    <br></br>
                    Take car
                </div>

                <div className="list-container">
                    <div className="request-table">
                        <Table hover borderless>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.values(data).map(x => 
                                <tr key={x.id} onClick={() => this.GetRequestDetails(x)}>
                                    <td>{x.name}</td>
                                    <td>{x.telephone}</td>
                                    <td>{x.address.length >= 70 ? x.address.substring(0, 70)+ "..." : x.address}</td>
                                    <td>{x.infor}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                </div>

                <Row>
                    <Col md={6}>
                        <div className="list-container">
                            <CardBody>
                                <CardTitle><Badge className="driver-name" color="info">Driver Tran Van A</Badge></CardTitle>
                                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                <CardText>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </CardText>
                            </CardBody>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="list-container">
                            <h1><Badge color="secondary">Maps will load here...</Badge></h1>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RequestForm;
