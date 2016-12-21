import axios from 'axios';

export const fetchParcels = () => {
  return axios.get('/api/parcels');
};

export const postParcel = (parcel) => {
  return axios.post('/api/parcels', parcel);
};
