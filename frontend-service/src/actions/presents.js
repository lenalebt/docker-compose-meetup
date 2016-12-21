export const FETCH_PRESENT = 'PRESENT/FETCH';
export const ADD_PRESENT = 'PRESENT/ADD';
export const DELETE_FIRST_PRESENT = 'PRESENT/DELETE_FIRST';
export const DELETE_PRESENT = 'PRESENT/DELETE';

export const fetchPresent = () => ({
  type: FETCH_PRESENT
});

export const addPresent = (present) => ({
  type: ADD_PRESENT,
  present,
});

export const deleteFirstPresent = () => ({
  type: DELETE_FIRST_PRESENT,
})

export const deletePresent = (present) => ({
  type: DELETE_PRESENT,
  present,
})
