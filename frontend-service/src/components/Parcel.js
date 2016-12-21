import React, { PropTypes } from 'react';

import { Row, Col, Glyphicon, Badge } from 'react-bootstrap';

const name = (person) => `${person.first_name} ${person.last_name}`
const state = (state) => {
  console.log(state);
  switch (state) {
    case 'accepted':
      return <Glyphicon style={{color: 'cyan'}} glyph="hourglass" />;
    case 'in_delivery':
      return (<Glyphicon style={{color: 'orange'}} glyph="send" />);
    case 'delivered':
      return (<Glyphicon style={{color: 'green'}} glyph="ok" />);

    default:
      return (<Glyphicon glyph="alert" />);
  }
}

const Parcel = ({ parcel }) => (
  <Row>
    <Col xs={2}>{name(parcel.sender)}</Col>
    <Col xs={1}><Glyphicon glyph="chevron-right" /></Col>
    <Col xs={2}>{name(parcel.recipient)}</Col>
    <Col xs={6}><Badge>{parcel.content.content}</Badge></Col>
    <Col xs={1}>{state(parcel.state)}</Col>
  </Row>
)


// accepted
// in_delivery
// delivered

export default Parcel;
