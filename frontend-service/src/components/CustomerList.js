import React, { PropTypes } from 'react';

import { Button, ListGroup, ListGroupItem, Row, Col, Badge } from 'react-bootstrap';

import Customer from './Customer';

const CustomerList = ({customers, fetchCustomer, bulkFetchCustomers}) => (
  <div>
    <h4>Customer { }<Badge>{customers.length}</Badge></h4>
    <Row>
      <Col xs={6}><Button block onClick={fetchCustomer}>Load one</Button></Col>
      <Col xs={6}><Button block onClick={bulkFetchCustomers}>Bulk load</Button></Col>
    </Row>
    <ListGroup style={{marginTop: 10}}>
    { customers.map((customer) => (
      <ListGroupItem key={customer.name}><Customer customer={customer} /></ListGroupItem>
    ))}
    </ListGroup>
  </div>
)

export default CustomerList;
