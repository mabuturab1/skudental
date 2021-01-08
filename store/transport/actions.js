import axios from 'axios';
import { apiRoutes, API_URL } from '../../constants/apiRoutes';
import { isSuccessDefault } from '../../constants/UIConstants';
import {
  getAxiosConfig,
  getErrorMessage,
  getServerResponseData,
  isValidServerResponse,
} from '../../helpers/Utils';
import { showAlert } from '../alert/actions';
export const CREATE_TRANSPORT_REQUEST_START = 'CREATE_TRANSPORT_REQUEST_START';
export const CREATE_TRANSPORT_REQUEST_SUCCESS =
  'CREATE_TRANSPORT_REQUEST_SUCCESS';
export const CREATE_TRANSPORT_REQUEST_FAILED =
  'CREATE_TRANSPORT_REQUEST_FAILED';

export const UPDATE_TRANSPORT_REQUEST_START = 'UPDATE_TRANSPORT_REQUEST_START';
export const UPDATE_TRANSPORT_REQUEST_SUCCESS =
  'UPDATE_TRANSPORT_REQUEST_SUCCESS';
export const UPDATE_TRANSPORT_REQUEST_FAILED =
  'UPDATE_TRANSPORT_REQUEST_FAILED';

export const SEND_TRANSPORT_MESSAGE_START = 'SEND_TRANSPORT_MESSAGE_START';
export const SEND_TRANSPORT_MESSAGE_SUCCESS = 'SEND_TRANSPORT_MESSAGE_SUCCESS';
export const SEND_TRANSPORT_MESSAGE_FAILED = 'SEND_TRANSPORT_MESSAGE_FAILED';

export const GET_ALL_TRANSPORT_REQUESTS_START =
  'GET_ALL_TRANSPORT_REQUESTS_START';
export const GET_ALL_TRANSPORT_REQUESTS_SUCCESS =
  'GET_ALL_TRANSPORT_REQUESTS_SUCCESS';
export const GET_ALL_TRANSPORT_REQUESTS_FAILED =
  'GET_ALL_TRANSPORT_REQUESTS_FAILED';

export const GET_ALL_TRANSPORT_MESSAGE_START =
  'GET_ALL_TRANSPORT_MESSAGE_START';
export const GET_ALL_TRANSPORT_MESSAGE_SUCCESS =
  'GET_ALL_TRANSPORT_MESSAGE_SUCCESS';
export const GET_ALL_TRANSPORT_MESSAGE_FAILED =
  'GET_ALL_TRANSPORT_MESSAGE_FAILED';

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
const updateTransportRequestStart = () => ({
  type: UPDATE_TRANSPORT_REQUEST_START,
});
const updateTransportRequestSuccess = (payload) => ({
  type: UPDATE_TRANSPORT_REQUEST_SUCCESS,
  payload,
});
const updateTransportRequestFailed = (error = '') => ({
  type: UPDATE_TRANSPORT_REQUEST_FAILED,
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
const getAllTransportRequestsStart = () => ({
  type: GET_ALL_TRANSPORT_REQUESTS_START,
});
const getAllTransportRequestsSuccess = (payload) => ({
  type: GET_ALL_TRANSPORT_REQUESTS_SUCCESS,
  payload,
});
const getAllTransportRequestsFailed = (error = '') => ({
  type: GET_ALL_TRANSPORT_REQUESTS_FAILED,
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

export const createTransportRequest = (
  userData,
  isSuccess = isSuccessDefault
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(createTransportRequestStart());
      const response = await axios.post(
        API_URL + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData,
        { ...getAxiosConfig(getState) }
      );
      if (isValidServerResponse(response)) {
        dispatch(
          createTransportRequestSuccess(getServerResponseData(response))
        );
        isSuccess(true);
      } else if (response.error) {
        dispatch(createTransportRequestFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      dispatch(createTransportRequestFailed('An error occurred'));
      isSuccess(false);
      dispatch(showAlert('An error occurred', getErrorMessage(error)));
    }
  };
};

export const updateTransportRequest = (
  id,
  updateData,
  isSuccess = isSuccessDefault
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateTransportRequestStart());
      const response = await axios.post(
        API_URL + apiRoutes.UPDATE_TRANSPORT_REQUEST + '/' + id,
        updateData,
        { ...getAxiosConfig(getState) }
      );
      if (isValidServerResponse(response)) {
        dispatch(
          updateTransportRequestSuccess(getServerResponseData(response))
        );
        isSuccess(true);
      } else if (response.error) {
        dispatch(updateTransportRequestFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      dispatch(updateTransportRequestFailed('An error occurred'));
      isSuccess(false);
      dispatch(showAlert('An error occurred', getErrorMessage(error)));
    }
  };
};

export const sendTransportMessage = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(sendTransportMessageStart());
      const response = await axios.post(
        API_URL + apiRoutes.SEND_TRANSPORT_MESSAGE,
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

export const getAllTransportRequests = (
  userData = {},
  isSuccess = isSuccessDefault
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(getAllTransportRequestsStart());
      const response = await axios.post(
        API_URL + apiRoutes.GET_ALL_TRANSPORT_REQUESTS,
        userData,
        { ...getAxiosConfig(getState) }
      );
      if (isValidServerResponse(response)) {
        dispatch(
          getAllTransportRequestsSuccess(getServerResponseData(response))
        );
        isSuccess(true);
      } else if (response.error) {
        dispatch(getAllTransportRequestsFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      dispatch(getAllTransportRequestsFailed('An error occurred'));
      isSuccess(false);
      dispatch(showAlert('An error occurred', getErrorMessage(error)));
    }
  };
};

export const getAllTransportMessages = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(getAllTransportMessagesStart());
      const response = await axios.post(
        API_URL + apiRoutes.CREATE_TRANSPORT_REQUEST,
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
