import React, { PropTypes } from 'react';

import { Row, Col, Panel, Button, ButtonToolbar } from 'react-bootstrap';

import Person from './Person';

const skipAll = (deleteFirstCustomer, deleteFirstPresent) => () => {
  deleteFirstCustomer();
  deleteFirstCustomer();
  deleteFirstPresent();
}

const ParcelController = ({ sender, recipient, present, deleteFirstCustomer, deleteFirstPresent, createParcel, bulkCreateParcel }) => (
  <div>
    <Row>
      <Col xs={4}>
        <h4>Sender</h4>
        <Person person={sender} />
      </Col>
      <Col xs={4}>
        <h4>Present</h4>
        <Panel>
          { present ? <h6>{present.present}</h6> : <h6>No Present defined</h6> }
        </Panel>
      </Col>
      <Col xs={4}>
        <h4>Receiver</h4>
        <Person person={recipient} />
      </Col>
    </Row>
    <Row>
      <Col xs={2} xsOffset={2}><Button block onClick={deleteFirstCustomer}>Skip Receiver</Button></Col>
      <Col xs={2}><Button block onClick={deleteFirstPresent}>Skip Present</Button></Col>
      <Col xs={2}><Button block onClick={skipAll(deleteFirstCustomer, deleteFirstPresent)}>Skip All</Button></Col>
      <Col xs={2}><Button block bsStyle="success" onClick={() => { createParcel(sender, recipient, present) }}>Send Parcel</Button></Col>
      <Col xs={2}><Button block bsStyle="success" onClick={() => { bulkCreateParcel() }}>Bulk Send</Button></Col>
    </Row>
  </div>
)

ParcelController.propTypes = {
  sender: PropTypes.object,
  recipient: PropTypes.object,
  present: PropTypes.object,
  deleteFirstCustomer: PropTypes.func,
  deleteFirstPresent: PropTypes.func
}

export default ParcelController;
