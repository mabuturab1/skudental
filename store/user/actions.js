import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, apiRoutes } from '../../constants/apiRoutes';
import {
  EmailSendingStatus,
  isSuccessDefault,
} from '../../constants/UIConstants';
import {
  getAxiosConfig,
  getErrorMessage,
  getServerResponseData,
  isValidServerResponse,
} from '../../helpers/Utils';
import { auth, messaging } from '../../helpers/firebase/Firebase';
import { showAlert } from '../alert/actions';
import { connectSocketIo } from '../chatRoom/actions';
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

export const userLogout = () => ({ type: USER_LOGOUT });
export const userSignup = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch) => {
    try {
      dispatch(userSignupStart());

      const response = await axios.post(
        API_URL + apiRoutes.USER_SIGNUP,
        userData
      );
      if (response && response.data?.data) {
        const result = response?.data?.data;

        dispatch(userSignupSuccess(result));

        isSuccess(true);
      } else if (response.error) {
        dispatch(userSignupFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      console.log('signup error', error);
      dispatch(userSignupFailed('An error occurred'));
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot Sign up' + getErrorMessage(error)
        )
      );
    }
  };
};
export const sendEmail = () => {
  return async (dispatch) => {
    try {
      console.log('sending email');
      await auth.currentUser.sendEmailVerification();
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
      const idToken = await firebaseResponse.user.getIdToken(true);
      const emailVerified = firebaseResponse.user.emailVerified;
      const firebaseMessagingToken = await messaging.getToken();
      console.log('email verified is', emailVerified);
      const response = await axios.post(API_URL + apiRoutes.USER_SIGNIN, {
        ...userData,
        idToken,
        emailVerified,
        firebaseMessagingToken,
      });

      if (isValidServerResponse(response)) {
        const result = getServerResponseData(response);
        if (
          result.sendVerificationEmailToUser ===
            EmailSendingStatus.SendRequired &&
          !emailVerified
        ) {
          dispatch(sendEmail());
        }
        dispatch(userSigninSuccess(result));

        const token = result.token;

        await AsyncStorage.setItem('token', token);

        connectSocketIo(token);
        isSuccess(true, result?.user);
      } else if (response.error) {
        dispatch(userSigninFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      console.log('user signin failed', error, error.message);
      dispatch(userSigninFailed('An error occurred'));
      isSuccess(false);
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot Sign in' + getErrorMessage(error)
        )
      );
    }
  };
};

export const userRefreshToken = (isSuccess=isSuccessDefault) => {
  return async (dispatch) => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const email = auth.currentUser.email;
      const response = await axios.post(
        API_URL + apiRoutes.USER_REFRESH_TOKEN,
        { email, idToken }
      );
      if (isValidServerResponse(response)) {
        const result = getServerResponseData(response);
        dispatch(userSigninSuccess(result));
        const token = result.token;
        await AsyncStorage.setItem('token', token);
        isSuccess(true, result?.user);
      } else if (response.error) {
        dispatch(userSigninFailed(response.error));
        isSuccess(false);
      }
    } catch (error) {
      console.log('user refresh token failed', error, error.message);
      dispatch(userSigninFailed('An error occurred'));
      isSuccess(false);
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot re authenticate user' + getErrorMessage(error)
        )
      );
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
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot update user' + getErrorMessage(error)
        )
      );
    }
  };
};
const getUserImageFormData = (image, fields = {}) => {
  let formData = new FormData();
  Object.keys(fields).forEach((el) => {
    formData.append(el, fields[el]);
  });
  let photo = {
    ...image,
    uri: image.path,
    type: image.mime,
    name: image.path?.split('/')?.pop() || Date.now().toString() + image.mime,
  };
  // formData.append('photo', photo);
  formData.append('file', photo);
  return formData;
};
export const updateUserPhoto = (
  image,
  isSuccess = isSuccessDefault,
  uploadProgressUpdate = () => {}
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateUserStart());
      const responseUrl = await axios.post(
        API_URL + apiRoutes.UPLOAD_RECORD_SIGNED_URL,
        { isUserPhoto: true, fileName: image.name },
        { ...getAxiosConfig(getState) }
      );
      if (!isValidServerResponse(responseUrl)) {
        throw Error('Cannot upload photo');
      }
      const { url, fields = {} } = getServerResponseData(responseUrl);
      console.log('url is', url, fields);
      await axios.post(
        // API_URL + apiRoutes.UPLOAD_PHOTO,
        url,
        getUserImageFormData(image, fields),
        {
          // ...getAxiosConfig(getState),
          onUploadProgress: uploadProgressUpdate,
        }
      );
      const response = await axios.post(
        API_URL + apiRoutes.UPLOAD_PHOTO_STATUS,
        {
          fileName: image.name,
        },
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
      console.log(
        'error uploading photo',
        error,
        error?.msg,
        error?.errorMessage,
        error?.message
      );
      dispatch(updateUserFailed('An error occurred'));
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot update user profile photo' + getErrorMessage(error)
        )
      );
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
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot reset password' + getErrorMessage(error)
        )
      );
    }
  };
};
