import { call, put } from 'redux-saga/effects';
import { fetchPresent } from '../api/presents';

import { addPresent } from '../actions/presents';

export function* presentFetch(action) {
  // call the api to get one present
  const response = yield call(fetchPresent);
  const present = response.data;

  console.log('Received present', present);

  // add the present to the presents state array
  yield put(addPresent(present));
}
