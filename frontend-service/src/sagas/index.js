import { takeLatest, takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

// sagas for the sub parts
import { customerFetch } from './customers';
import { presentFetch } from './presents';
import { parcelsFetch, parcelPost, watchParcelsData } from './parcels';

// Actions to trigger the sagas
import { FETCH_CUSTOMER } from '../actions/customers';
import { FETCH_PRESENT } from '../actions/presents';
import { FETCH_PARCELS, POST_PARCEL } from '../actions/parcels';

// main saga generators
export function* sagas() {
  yield [
    fork(takeEvery, FETCH_CUSTOMER, customerFetch),
    fork(takeEvery, FETCH_PRESENT, presentFetch),
    fork(takeEvery, FETCH_PARCELS, parcelsFetch),
    fork(takeEvery, POST_PARCEL, parcelPost),
    fork(watchParcelsData),
  ];
}
