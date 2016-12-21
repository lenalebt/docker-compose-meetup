export const FETCH_PARCELS = 'PARCELS/FETCH';
export const POLL_PARCELS = 'PARCELS/POLL';
export const STOP_POLL_PARCELS = 'PARCELS/STOP_POLL';
export const SET_PARCELS = 'PARCELS/SET';
export const POST_PARCEL = 'PARCEL/POST';

export const fetchParcels = () => ({
  type: FETCH_PARCELS
});

export const setParcels = (parcels) => ({
  type: SET_PARCELS,
  parcels,
});

export const postParcel = (parcel, sender, receiver, present) => ({
  type: POST_PARCEL,
  parcel,
  sender,
  receiver,
  present
});

export const pollParcels = () => ({
  type: POLL_PARCELS,
});

export const stopPollParcels = () => ({
  type: STOP_POLL_PARCELS,
});
