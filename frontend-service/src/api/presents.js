import axios from 'axios';

export const fetchPresent = () => {
  return axios.get('/api/present');
};
