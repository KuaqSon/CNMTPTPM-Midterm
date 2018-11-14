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



    render() {

        var self = this;
        var { res, endpoint } = self.state;

        // res là json như app location

        return (
            <div className="request-list">
                <div className="header-request">
                    Doubble Son
                    <br></br>
                    Take car
                </div>

                <div className="list-container">
                    <Table hover borderless>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>123456</td>
                                <td>227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>5435345</td>
                                <td>227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>345345</td>
                                <td>227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
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
