import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import customers from './customers';
import presents from './presents';
import parcels from './parcels';
import parcelPolling from './parcelPolling';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  // your reducer here
  customers,
  presents,
  parcels,
  parcelPolling,
});
