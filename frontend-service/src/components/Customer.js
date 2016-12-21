import React, { PropTypes } from 'react';

import { Image, Row, Col } from 'react-bootstrap';

const Customer = ({ customer }) => (
  <Row>
    <Col xs={2}><Image src={customer.avatar} rounded style={{width: 20}} /></Col>
    <Col xs={10}>{customer.name}</Col>
  </Row>
)

export default Customer;
