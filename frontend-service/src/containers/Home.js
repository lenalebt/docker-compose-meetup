import React from "react";
import { connect } from "react-redux";

import { fetchCustomer, deleteFirstCustomer } from '../actions/customers';
import { fetchPresent, deleteFirstPresent } from '../actions/presents';
import { fetchParcels, postParcel, pollParcels, stopPollParcels } from '../actions/parcels';

import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

import CustomerList from '../components/CustomerList';
import PresentList from '../components/PresentList';
import ParcelList from '../components/ParcelList';
import ParcelController from '../components/ParcelController';

// Home page component
export class Home extends React.Component {
  callMultiple(fn) {
    return () => {
      for (var i = 0; i < 100; i++) {
        fn();
      }
    }
  }

  bulkSendParcels() {
    const {customers, presents} = this.props
    console.log("Going to bulk-send parcels");
    let parcels = [];
    for (var i = 0; i < Math.min(customers.length/2, presents.length); i++) {
      const sender = customers[2*i+1];
      const receiver = customers[2*i];
      const present = presents[i];

      if (!sender || !receiver || !present)
        break;
      parcels.push({sender, receiver, present});
    }

    parcels.map((o) => this.handlePostParcel(o.sender, o.receiver, o.present));
  }

  handlePostParcel(sender, receiver, present) {
    console.log('Will create a parcel with');
    console.log('Sender: ', sender);
    console.log('Receiver: ', receiver);
    console.log('Present: ', present);

    const extractPerson = (person) => {
      const names = person.name.split(' ');

      return {
        first_name: names[0],
        last_name: names[1],
        address: {
          street: person.address.streetA,
          house_number: "123", // TODO: the customer currently does not realy have the correct street number
          zip_code: person.address.zipcode.toString(),
          city: person.address.city,
        }
      }
    }

    const parcelPresent = {
      type: "",
      content: present.present,
    }

    const parcel = {
      sender: extractPerson(sender),
      recipient: extractPerson(receiver),
      content: parcelPresent,
    }

    console.log('Parcel', parcel);
    this.props.postParcel(parcel, sender, receiver, present);
  }

  // render
  render() {

    const sender = this.props.customers[1];
    const receiver = this.props.customers[0];
    const present = this.props.presents[0];

    return (
      <div className="page-home">
        <Row>

          <Col xs={2}>
            <CustomerList customers={this.props.customers} fetchCustomer={this.props.fetchCustomer} bulkFetchCustomers={this.callMultiple(this.props.fetchCustomer)} />
          </Col>

          <Col xs={8}>

            <h1>Santa is on the way!</h1>

            <ParcelController sender={sender} recipient={receiver} present={present} deleteFirstCustomer={this.props.deleteFirstCustomer} deleteFirstPresent={this.props.deleteFirstPresent} createParcel={this.handlePostParcel.bind(this)} bulkCreateParcel={this.bulkSendParcels.bind(this)} />
            <Row>
              <Col xs={12}>
                <ParcelList parcels={this.props.parcels} parcelPolling={this.props.parcelPolling} fetchParcels={this.props.fetchParcels} pollParcels={this.props.pollParcels} stopPollParcels={this.props.stopPollParcels} />
              </Col>
            </Row>
          </Col>

          <Col xs={2}>
            <PresentList presents={this.props.presents} fetchPresent={this.props.fetchPresent} bulkFetchPresent={this.callMultiple(this.props.fetchPresent)} />
          </Col>
        </Row>

      </div>
    );
  }
}

export default connect(
  (state) => ({
    customers: state.customers,
    presents: state.presents,
    parcels: state.parcels,
    parcelPolling: state.parcelPolling,
  }),
  {
    fetchCustomer,
    fetchPresent,
    fetchParcels,
    postParcel,
    pollParcels,
    stopPollParcels,
    deleteFirstCustomer,
    deleteFirstPresent,
  },
)(Home);
