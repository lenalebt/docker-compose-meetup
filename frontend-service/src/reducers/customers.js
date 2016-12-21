import { ADD_CUSTOMER, DELETE_FIRST_CUSTOMER, DELETE_CUSTOMER } from '../actions/customers';

// users reducer
export default function users(state = [], action) {
  switch (action.type) {
    case ADD_CUSTOMER:
      return [...state, action.customer];

    case DELETE_FIRST_CUSTOMER:
      return state.slice(1);

    case DELETE_CUSTOMER:
      return state.filter((x) => x != action.customer)

    // initial state
    default:
      return state;
  }
}
