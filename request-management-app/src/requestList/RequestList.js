import React, { Component } from 'react';
import './RequestList.css';
import {
  Col, Row, Button, Form, FormGroup, Label, Input, Table, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardImgOverlay, Badge
} from 'reactstrap';
import socketIoClient from 'socket.io-client';
import MapContainer from '../maps/MapContainer';
import Skeleton from 'react-loading-skeleton';


class RequestForm extends Component {

  constructor() {
    super();
    this.state = {
      res: false,
      detail: false,
      requestLocation: {
        lat: '',
        lng: ''
      },
      driverLocation: {
        lat: '',
        lng: ''
      },
      endpoint: "http://localhost:3000"
    }

    this.SetRequestDetail = this.SetRequestDetail.bind(this);

  }

  componentDidMount() {
    const self = this;
    const { endpoint } = self.state;
    const socket = socketIoClient(endpoint);
    socket.on("manager", data => self.setState({ res: JSON.stringify(data) }));
    // console.log(self.state.res);

    // authRfToken();
    var auth = localStorage.getItem("auth");
    if (auth === "false" || auth === null) {
      this.props.history.push('/login');
    }

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

  SetRequestDetail = (record) => {
    this.setState({
      detail: record,
      requestLocation: {
        lat: record.lat + '',
        lng: record.log + ''
      },
      driverLocation: {
        lat: record.latDriver + '',
        lng: record.lngDriver + ''
      }
    })
  }

  GetRequestDetails = (record) => {
    this.SetRequestDetail(record);
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
            {
              !data ? (
                <div className="skeleton-container">
                  <div className="short"><Skeleton/></div>
                  <div className="long"><Skeleton/></div>
                  <div className="long"><Skeleton/></div>
                  <div className="short mt-3"><Skeleton/></div>
                  <div className="long"><Skeleton/></div>
                  <div className="long"><Skeleton/></div>
                  <div className="short mt-3"><Skeleton/></div>
                  <div className="long"><Skeleton/></div>
                  <div className="long"><Skeleton/></div>
                  <div className="long"><Skeleton/></div>
                  <div className="long"><Skeleton/></div>
                </div>
              ) : (
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
                        <td>{x.address.length >= 70 ? x.address.substring(0, 70) + "..." : x.address}</td>
                        <td>{x.state === 0 ? "CHƯA NHẬN XE" : (x.state === 1 ? "ĐANG ĐI" : "HOÀN THÀNH")}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )
            }
          </div>
        </div>

        <Row>
          <Col md={6}>
            <div className="list-container">
              <CardBody>
                <CardTitle><Badge className="driver-name" color="info">Tài xế: {(this.state.detail.idDriver !== 0 && this.state.detail.idDriver !== 1 && this.state.detail.nameDriver) ? this.state.detail.nameDriver : ''}</Badge></CardTitle>
                <CardText>Điện thoại: {(this.state.detail.idDriver !== 0 && this.state.detail.idDriver !== 1 && this.state.detail.telephoneDriver) ? this.state.detail.telephoneDriver : ''}</CardText>
              </CardBody>

              <CardBody className="mt-3">
                <CardTitle><Badge className="driver-name" color="info">Khách {this.state.detail.name ? this.state.detail.name : ''}</Badge></CardTitle>
                <CardText>Điện thoại: {this.state.detail.telephone ? this.state.detail.telephone : ''}</CardText>
                <CardText>Địa chỉ: {this.state.detail.address ? this.state.detail.address : ''}</CardText>
                <CardText>Thông tin: {this.state.detail.infor ? this.state.detail.infor : ''}</CardText>
              </CardBody>
            </div>
          </Col>
          <Col md={6}>
            <div className="mt-3">
              {/* <h1><Badge color="secondary">Maps will load here...</Badge></h1> */}
              <MapContainer
                requestLocation={this.state.requestLocation}
                driverLocation={this.state.driverLocation}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RequestForm;
