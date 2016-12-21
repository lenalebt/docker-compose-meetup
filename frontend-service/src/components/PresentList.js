import React, { PropTypes } from 'react';

import { Button, ListGroup, ListGroupItem, Row, Col, Badge } from 'react-bootstrap';

const PresentList = ({presents, fetchPresent, bulkFetchPresent}) => (
  <div>
    <h4>Presents { }<Badge>{presents.length}</Badge></h4>
    <Row>
      <Col xs={6}><Button block onClick={fetchPresent}>Load one</Button></Col>
      <Col xs={6}><Button block onClick={bulkFetchPresent}>Bulk load</Button></Col>
    </Row>
    <ListGroup style={{marginTop: 10}}>
    { presents.map((present) => (
      <ListGroupItem key={present.present}>{present.present}</ListGroupItem>
    ))}
    </ListGroup>
  </div>
)

export default PresentList;
