import axios from 'axios';
import { apiRoutes } from '../../constants/apiRoutes';
export const CREATE_TRANSPORT_REQUEST_START = 'CREATE_TRANSPORT_REQUEST_START';
export const CREATE_TRANSPORT_REQUEST_SUCCESS = 'CREATE_TRANSPORT_REQUEST_SUCCESS';
export const CREATE_TRANSPORT_REQUEST_FAILED = 'CREATE_TRANSPORT_REQUEST_FAILED';

export const SEND_TRANSPORT_MESSAGE_START = 'SEND_TRANSPORT_MESSAGE_START';
export const SEND_TRANSPORT_MESSAGE_SUCCESS = 'SEND_TRANSPORT_MESSAGE_SUCCESS';
export const SEND_TRANSPORT_MESSAGE_FAILED = 'SEND_TRANSPORT_MESSAGE_FAILED';

export const GET_ALL_TRANSPORTS_START = 'GET_ALL_TRANSPORTS_START';
export const GET_ALL_TRANSPORTS_SUCCESS = 'GET_ALL_TRANSPORTS_SUCCESS';
export const GET_ALL_TRANSPORTS_FAILED = 'GET_ALL_TRANSPORTS_FAILED';

export const GET_ALL_TRANSPORT_MESSAGE_START = 'GET_ALL_TRANSPORT_MESSAGE_START';
export const GET_ALL_TRANSPORT_MESSAGE_SUCCESS = 'GET_ALL_TRANSPORT_MESSAGE_SUCCESS';
export const GET_ALL_TRANSPORT_MESSAGE_FAILED = 'GET_ALL_TRANSPORT_MESSAGE_FAILED';

const createTransportRequestStart = () => ({
  type: CREATE_TRANSPORT_REQUEST_START,
});
const createTransportRequestSuccess = (payload) => ({
  type: CREATE_TRANSPORT_REQUEST_SUCCESS,
  payload,
});
const createTransportRequestFailed = (error = '') => ({
  type: CREATE_TRANSPORT_REQUEST_FAILED,
  error,
});
const sendTransportMessageStart = () => ({
  type: SEND_TRANSPORT_MESSAGE_START,
});
const sendTransportMessageSuccess = (payload) => ({
  type: SEND_TRANSPORT_MESSAGE_SUCCESS,
  payload,
});
const sendTransportMessageFailed = (error = '') => ({
  type: SEND_TRANSPORT_MESSAGE_FAILED,
  error,
});
const getAllTransportRequestStart = () => ({ type: GET_ALL_TRANSPORTS_START });
const getAllTransportRequestSuccess = (payload) => ({
  type: GET_ALL_TRANSPORTS_SUCCESS,
  payload,
});
const getAllTransportRequestFailed = (error = '') => ({
  type: GET_ALL_TRANSPORTS_FAILED,
  error,
});
const getAllTransportMessagesStart = () => ({
  type: GET_ALL_TRANSPORT_MESSAGE_START,
});
const getAllTransportMessagesSuccess = (payload) => ({
  type: GET_ALL_TRANSPORT_MESSAGE_SUCCESS,
  payload,
});
const getAllTransportMessagesFailed = (error) => ({
  type: GET_ALL_TRANSPORT_MESSAGE_FAILED,
  error,
});

export const createTransportRequest = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(createTransportRequestStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(createTransportRequestSuccess(response.data));
      } else if (response.error) {
        dispatch(createTransportRequestFailed(response.error));
      }
    } catch (error) {
      dispatch(createTransportRequestFailed('An error occurred'));
    }
  };
};

export const sendTransportMessage = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(sendTransportMessageStart());
      const response = await axios.post(
        apiUrl + apiRoutes.SEND_TRANSPORT_MESSAGE,
        userData
      );
      if (response && response.data) {
        dispatch(sendTransportMessageSuccess(response.data));
      } else if (response.error) {
        dispatch(sendTransportMessageFailed(response.error));
      }
    } catch (error) {
      dispatch(sendTransportMessageFailed('An error occurred'));
    }
  };
};

export const getAllTransportRequest = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(getAllTransportRequestStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(getAllTransportRequestSuccess(response.data));
      } else if (response.error) {
        dispatch(getAllTransportRequestFailed(response.error));
      }
    } catch (error) {
      dispatch(getAllTransportRequestFailed('An error occurred'));
    }
  };
};

export const getAllTransportMessages = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(getAllTransportMessagesStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(getAllTransportMessagesSuccess(response.data));
      } else if (response.error) {
        dispatch(getAllTransportMessagesFailed(response.error));
      }
    } catch (error) {
      dispatch(getAllTransportMessagesFailed('An error occurred'));
    }
  };
};
