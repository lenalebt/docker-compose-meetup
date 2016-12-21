import { call, put, take, race } from 'redux-saga/effects';
import { fetchParcels as fetchParcelsApiCall, postParcel } from '../api/parcels';

import { fetchParcels, setParcels, POLL_PARCELS, STOP_POLL_PARCELS } from '../actions/parcels';
import { deleteCustomer } from '../actions/customers';
import { deletePresent } from '../actions/presents';

export function* parcelsFetch(action) {
  const response = yield call(fetchParcelsApiCall);
  const parcels = response.data;

  console.log('Received parcels', parcels);

  yield put(setParcels(parcels));
}

export function* parcelPost(action) {
  try {
    const response = yield call(postParcel, action.parcel);

    console.log('Created parcel', response)

    // delete the first present and first two customers
    yield put(deleteCustomer(action.sender));
    yield put(deleteCustomer(action.receiver));
    yield put(deletePresent(action.present));

    // refresh parcels
    //yield put(fetchParcels()); commented out due to performance issues
  } catch(error) {
    console.log(error);
  }
}


// Utility function to delay effects
function delay(millis) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), millis)
    });
    return promise;
}

// Fetch data every 20 seconds
function* pollParcels() {
    try {
        yield call(delay, 1000);
        yield put(fetchParcels());
    } catch (error) {
        // cancellation error -- can handle this if you wish
        return;
    }
}

// Wait for successful response, then fire another request
// Cancel polling if user logs out
export function* watchParcelsData() {
  let running = false;

  while (true) {
    yield take(POLL_PARCELS);
    running = true;
    while (running) {
      const res = yield race([
        call(pollParcels),
        take(STOP_POLL_PARCELS)
      ]);
      if (res[1]) running = false;
    }

  }
}
