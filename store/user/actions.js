import axios from 'axios';
import { apiRoutes } from '../../constants/apiRoutes';
import { isSuccessDefault } from '../../constants/UIConstants';
const apiUrl = process.env.API_URL;
export const USER_SIGNUP_START = 'USER_SIGNUP_START';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';

export const USER_SIGNIN_START = 'USER_SIGNIN_START';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAILED = 'USER_SIGNIN_FAILED';

export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const UPDATE_PASSWORD_START = 'UPDATE_PASSWORD_START';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILED = 'UPDATE_PASSWORD_FAILED';

export const VERIFY_USER_START = 'VERIFY_USER_START';
export const VERIFY_USER_SUCCESS = 'VERIFY_USER_SUCCESS';
export const VERIFY_USER_FAILED = 'VERIFY_USER_FAILED';

export const userSignupStart = () => ({ type: USER_SIGNUP_START });
export const userSignupSuccess = (payload) => ({
  type: USER_SIGNUP_SUCCESS,
  payload,
});
const userSignupFailed = (error = '') => ({
  type: USER_SIGNUP_FAILED,
  error,
});
const userSigninStart = () => ({ type: USER_SIGNIN_START });
const userSigninSuccess = (payload) => ({
  type: USER_SIGNIN_SUCCESS,
  payload,
});
const userSigninFailed = (error = '') => ({
  type: USER_SIGNIN_FAILED,
  error,
});
const updateUserStart = () => ({ type: UPDATE_USER_START });
const updateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});
const updateUserFailed = (error = '') => ({
  type: UPDATE_USER_FAILED,
  error,
});
const forgotPasswordStart = () => ({
  type: FORGOT_PASSWORD_START,
});
const forgotPasswordSuccess = (payload) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload,
});
const forgotPasswordFailed = (error) => ({
  type: FORGOT_PASSWORD_FAILED,
  error,
});
const updatePasswordStart = () => ({
  type: UPDATE_PASSWORD_START,
});
const updatePasswordSuccess = (payload) => ({
  type: UPDATE_PASSWORD_SUCCESS,
  payload,
});
const updatePasswordFailed = (error) => ({
  type: UPDATE_PASSWORD_FAILED,
  error,
});

const verifyUserStart = () => ({
  type: VERIFY_USER_START,
});
const verifyUserSuccess = (payload) => ({
  type: VERIFY_USER_SUCCESS,
  payload,
});
const verifyUserFailed = (error) => ({
  type: VERIFY_USER_FAILED,
  error,
});

export const userSignup = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      dispatch(userSignupStart());
      const response = await axios.post(
        apiUrl + apiRoutes.USER_SIGNUP,
        userData
      );
      if (response && response.data) {
        dispatch(userSignupSuccess(response.data));
        isSuccess(true);
      } else if (response.error) {
        dispatch(userSignupFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      dispatch(userSignupFailed('An error occurred'));
    }
  };
};

export const userSignin = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      dispatch(userSigninStart());
      const response = await axios.post(
        apiUrl + apiRoutes.USER_SIGNIN,
        userData
      );
      if (response && response.data) {
        dispatch(userSigninSuccess(response.data));
        isSuccess(true);
      } else if (response.error) {
        dispatch(userSigninFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      dispatch(userSigninFailed('An error occurred'));
      isSuccess(false);
    }
  };
};

export const updateUser = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      dispatch(updateUserStart());
      const response = await axios.post(
        apiUrl + apiRoutes.UPDATE_USER,
        userData
      );
      if (response && response.data) {
        dispatch(updateUserSuccess(response.data));
        isSuccess(true);
      } else if (response.error) {
        dispatch(updateUserFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      dispatch(updateUserFailed('An error occurred'));
      isSuccess(false);
    }
  };
};

export const forgotPassword = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordStart());
      const response = await axios.post(
        apiUrl + apiRoutes.FORGORT_PASSWORD,
        userData
      );
      if (response && response.data) {
        dispatch(forgotPasswordSuccess(response.data));
        isSuccess(true);
      } else if (response.error) {
        dispatch(forgotPasswordFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      dispatch(forgotPasswordFailed('An error occurred'));
      isSuccess(true);
    }
  };
};

export const updatePassword = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      dispatch(updatePasswordStart());
      const response = await axios.post(
        apiUrl + apiRoutes.UPDATE_PASSWORD,
        userData
      );
      if (response && response.data) {
        dispatch(updatePasswordSuccess(response.data));
        isSuccess(true);
      } else if (response.error) {
        dispatch(updatePasswordFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      dispatch(updatePasswordFailed('An error occurred'));
      isSuccess(false);
    }
  };
};

export const verifyUser = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      dispatch(verifyUserStart());
      const response = await axios.post(
        apiUrl + apiRoutes.VERIFY_ADMIN,
        userData
      );
      if (response && response.data) {
        dispatch(verifyUserSuccess(response.data));
        isSuccess(true);
      } else if (response.error) {
        dispatch(verifyUserFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      dispatch(verifyUserFailed('An error occurred'));
      isSuccess(false);
    }
  };
};
