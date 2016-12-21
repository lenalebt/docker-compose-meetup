import { ADD_PRESENT, DELETE_FIRST_PRESENT, DELETE_PRESENT } from '../actions/presents';

// users reducer
export default function users(state = [], action) {
  switch (action.type) {
    case ADD_PRESENT:
      return [...state, action.present];

    case DELETE_FIRST_PRESENT:
      return state.slice(1);

    case DELETE_PRESENT:
      return state.filter((x) => x != action.present)

    // initial state
    default:
      return state;
  }
}
