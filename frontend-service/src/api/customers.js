import axios from 'axios';

export const fetchCustomer = () => {
  return axios.get('/api/customer');
};
