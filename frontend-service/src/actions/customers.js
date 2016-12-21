export const FETCH_CUSTOMER = 'CUSTOMER/FETCH';
export const ADD_CUSTOMER = 'CUSTOMER/ADD';
export const DELETE_FIRST_CUSTOMER = 'CUSTOMER/DELETE_FIRST';
export const DELETE_CUSTOMER = 'CUSTOMER/DELETE';

export const fetchCustomer = () => ({
  type: FETCH_CUSTOMER,
});

export const addCustomer = (customer) => ({
  type: ADD_CUSTOMER,
  customer,
});

export const deleteFirstCustomer = () => ({
  type: DELETE_FIRST_CUSTOMER,
})

export const deleteCustomer = (customer) => ({
  type: DELETE_CUSTOMER,
  customer,
})
