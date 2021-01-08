import axios from 'axios';
import { apiRoutes, API_URL } from '../../constants/apiRoutes';
import {
  getAxiosConfig,
  getServerResponseData,
  isValidServerResponse,
} from '../../helpers/Utils';

export const GET_ALL_USERS_START = 'GET_ALL_USERS_START';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILED = 'GET_ALL_USERS_FAILED';
export const VERIFY_USER_START = 'VERIFY_USER_START';
export const VERIFY_USER_SUCCESS = 'VERIFY_USER_SUCCESS';
export const VERIFY_USER_FAILED = 'VERIFY_USER_FAILED';

const getAllUsersStart = () => ({
  type: GET_ALL_USERS_START,
});
const getAllUsersSuccess = (payload) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload,
});
const getAllUsersFailed = (error = '') => ({
  type: GET_ALL_USERS_FAILED,
  error,
});
const verifyUserStart = () => ({
  type: VERIFY_USER_START,
});
const verifyUserSuccess = (payload) => ({
  type: VERIFY_USER_SUCCESS,
  payload,
});
const verifyUserFailed = (error = '') => ({
  type: VERIFY_USER_FAILED,
  error,
});

export const getAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(getAllUsersStart());
      const response = await axios.get(API_URL + apiRoutes.GET_ALL_USERS, {
        ...getAxiosConfig(getState),
      });
      if (isValidServerResponse(response)) {
        dispatch(getAllUsersSuccess(getServerResponseData(response)));
      } else if (response.error) {
        dispatch(getAllUsersFailed(response.error));
      }
    } catch (error) {
      console.log('get all users failed', error);
      dispatch(getAllUsersFailed('An error occurred'));
    }
  };
};

export const verifyUser = (id, userData) => {
  return async (dispatch, getState) => {
    try {
     
      dispatch(verifyUserStart());
      const response = await axios.post(
        API_URL + apiRoutes.VERIFY_USER + '/' + id,
        userData,
        {
          ...getAxiosConfig(getState),
        }
      );
      if (isValidServerResponse(response)) {
        dispatch(verifyUserSuccess(getServerResponseData(response)));
      } else if (response.error) {
        dispatch(verifyUserFailed(response.error));
      }
    } catch (error) {
      console.log('user verification status', error, error.message);
      dispatch(verifyUserFailed('An error occurred'));
    }
  };
};
