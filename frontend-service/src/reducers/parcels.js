import { SET_PARCELS } from '../actions/parcels';

// users reducer
export default function users(state = [], action) {
  switch (action.type) {
    case SET_PARCELS:
      return action.parcels || [];

    // initial state
    default:
      return state;
  }
}
