import { call, put } from 'redux-saga/effects';
import { fetchCustomer } from '../api/customers';

import { addCustomer } from '../actions/customers';

export function* customerFetch(action) {
  // call the api to get one customer
  const response = yield call(fetchCustomer);
  const customer = response.data;

  console.log('Received customer', customer);

  // add the customer to the customers state array
  yield put(addCustomer(customer));
}
