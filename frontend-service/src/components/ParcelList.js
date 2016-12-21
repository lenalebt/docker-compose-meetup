import React, { PropTypes } from 'react';

import { Button, ListGroup, ListGroupItem, Row, Col, ProgressBar, Badge, Glyphicon } from 'react-bootstrap';

import Parcel from './Parcel';

const numInState = (state) => (parcels) => parcels.filter((parcel) => parcel.state === state).length
const numOfAccepted = numInState('accepted');
const numOfInDelivery = numInState('in_deliverey');
const numOfDelivered = numInState('delivered');

const ParcelList = ({parcels, parcelPolling, fetchParcels, pollParcels, stopPollParcels}) => (
  <div>
    <h4>Parcels { }<Badge>{parcels.length}</Badge></h4>
    <Row>
      <Col xs={1} xsOffset={10}><Button block bsSize="xsmall" onClick={fetchParcels}><Glyphicon glyph="refresh" /></Button></Col>
      <Col xs={1}>{ parcelPolling
        ? <Button block bsStyle="danger" bsSize="xsmall" onClick={stopPollParcels}><Glyphicon glyph="stop" /></Button>
        : <Button block bsStyle="info" bsSize="xsmall" onClick={pollParcels}><Glyphicon glyph="repeat" /></Button>
      }
      </Col>
    </Row>

    <ProgressBar style={{marginTop: 10}} max={parcels.length}>
      <ProgressBar striped bsStyle="info" now={numOfAccepted(parcels)} key={1} />
      <ProgressBar bsStyle="warning" now={numOfInDelivery(parcels)} key={2} />
      <ProgressBar active bsStyle="success" now={numOfDelivered(parcels)} key={3} />
    </ProgressBar>

    <ListGroup>
    { parcels.map((parcel) => (
      <ListGroupItem key={parcel.id}><Parcel parcel={parcel} /></ListGroupItem>
    ))}
    </ListGroup>
  </div>
)

export default ParcelList;
