import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, apiRoutes } from '../../constants/apiRoutes';
import { isSuccessDefault } from '../../constants/UIConstants';
import { getAxiosConfig } from '../../helpers/Utils';
import { auth } from '../../helpers/firebase/Firebase';
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

export const CONFIRM_PIN_START = 'CONFIRM_PIN_START';
export const CONFIRM_PIN_SUCCESS = 'CONFIRM_PIN_SUCCESS';
export const CONFIRM_PIN_FAILED = 'CONFIRM_PIN_FAILED';

export const VERIFY_USER_START = 'VERIFY_USER_START';
export const VERIFY_USER_SUCCESS = 'VERIFY_USER_SUCCESS';
export const VERIFY_USER_FAILED = 'VERIFY_USER_FAILED';
export const USER_LOGOUT = 'USER_LOGOUT';

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
const confirmPinStart = () => ({
  type: CONFIRM_PIN_START,
});
const confirmPinSuccess = (payload) => ({
  type: CONFIRM_PIN_SUCCESS,
  payload,
});
const confirmPinFailed = (error) => ({
  type: CONFIRM_PIN_FAILED,
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

export const userLogout = () => ({ type: USER_LOGOUT });
export const userSignup = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      console.log('signup user data', userData);
      dispatch(userSignupStart());

      const response = await axios.post(
        API_URL + apiRoutes.USER_SIGNUP,
        userData
      );
      if (response && response.data?.data) {
        const result = response?.data?.data;

        dispatch(userSignupSuccess(result));
        console.log('signup user data', result);

        isSuccess(true);
      } else if (response.error) {
        dispatch(userSignupFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      console.log('signup error', error);
      dispatch(userSignupFailed('An error occurred'));
    }
  };
};
export const sendEmail = () => {
  return async (dispatch) => {
    try {
      console.log('sending email');
      await auth.currentUser.sendEmailVerification();
      console.log('email sent');
    } catch (error) {
      console.log('error in sending email', error);
    }
  };
};
const firebaseLogin = async (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const userSignin = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      console.log('user signin', userData);
      dispatch(userSigninStart());
      const firebaseResponse = await firebaseLogin(
        userData.email,
        userData.password
      );
      const idToken = await firebaseResponse.user.getIdToken();
      const emailVerified = firebaseResponse.user.emailVerified;
      console.log('email verified is', emailVerified);
      const response = await axios.post(API_URL + apiRoutes.USER_SIGNIN, {
        ...userData,
        idToken,
        emailVerified,
      });

      if (response?.data?.data) {
        const result = response?.data?.data;
        dispatch(userSigninSuccess(result));

        const token = result.token;
        await AsyncStorage.setItem('token', token);
        isSuccess(true);
      } else if (response.error) {
        dispatch(userSigninFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      console.log('user signin failed', error, error.message);
      dispatch(userSigninFailed('An error occurred'));
      isSuccess(false);
    }
  };
};

export const updateUser = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateUserStart());
      const response = await axios.post(
        API_URL + apiRoutes.UPDATE_USER,
        userData,
        {
          ...getAxiosConfig(getState),
        }
      );
      if (response && response.data) {
        const result = response?.data?.data;
        dispatch(updateUserSuccess(result));
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

export const firebaseResetPassword = (
  userData,
  isSuccess = isSuccessDefault
) => {
  return async (dispatch) => {
    try {
      console.log('sending firebase reset password email');
      dispatch(forgotPasswordStart());
      await auth.sendPasswordResetEmail(userData.email);
      dispatch(forgotPasswordSuccess(userData.email));
      isSuccess(true);
      console.log('sending firebase reset password email sent');
    } catch (error) {
      dispatch(forgotPasswordFailed('An error occurred'));
      isSuccess(false);
    }
  };
};

export const verifyUser = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      dispatch(verifyUserStart());
      const response = await axios.post(
        API_URL + apiRoutes.VERIFY_ADMIN,
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
