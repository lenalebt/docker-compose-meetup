import { POLL_PARCELS, STOP_POLL_PARCELS } from '../actions/parcels';

// users reducer
export default function users(state = false, action) {
  switch (action.type) {
    case POLL_PARCELS:
      return true;

    case STOP_POLL_PARCELS:
      return false;

    // initial state
    default:
      return state;
  }
}
