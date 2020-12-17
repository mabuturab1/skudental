import {
  USER_SIGNIN_START,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILED,
  USER_SIGNUP_START,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  CONFIRM_PIN_START,
  CONFIRM_PIN_SUCCESS,
  CONFIRM_PIN_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  VERIFY_USER_START,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILED,
  USER_LOGOUT,
} from './actions';
import { addApiUrlInUserObj } from './userUtilsFunctions';

const initialState = {
  user: {},
  token: null,
  passwordResetToken: null,
  loading: {
    userSignin: false,
    userSignup: false,
    forgotPassword: false,
    updateUser: false,
    verifyUser: false,
  },
  error: {
    userSignin: '',
    userSignup: '',
    forgotPassword: '',
    updateUser: '',
    verifyUser: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, userSignup: true },
        error: { ...state.error, userSignup: '' },
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, userSignup: false },
      };
    case USER_SIGNUP_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, userSignup: false },
        error: { ...state.error, userSignup: action.payload },
      };

    case USER_SIGNIN_START:
      return {
        ...state,
        user: {},
        token: null,
        loading: { ...state.loading, userSignin: true },
        error: { ...state.error, userSignin: '' },
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        user: addApiUrlInUserObj(action.payload.user),
        token: action.payload.token,
        loading: { ...state.loading, userSignin: false },
      };
    case USER_SIGNIN_FAILED:
      return {
        ...state,
        user: {},
        token: null,
        loading: { ...state.loading, userSignin: false },
        error: { ...state.error, userSignin: action.payload },
      };

    case FORGOT_PASSWORD_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, forgotPassword: true },
        error: { ...state.error, forgotPassword: '' },
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        user: { email: action.payload },
        loading: { ...state.loading, forgotPassword: false },
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, forgotPassword: false },
        error: { ...state.error, forgotPassword: action.payload },
      };

    case CONFIRM_PIN_START:
      return {
        ...state,
        user: {},
        passwordResetToken: null,
        loading: { ...state.loading, updatePassword: true },
        error: { ...state.error, updatePassword: '' },
      };
    case CONFIRM_PIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        passwordResetToken: action.payload.token,
        loading: { ...state.loading, updatePassword: false },
      };
    case CONFIRM_PIN_FAILED:
      return {
        ...state,
        user: {},
        passwordResetToken: null,
        loading: { ...state.loading, updatePassword: false },
        error: { ...state.error, updatePassword: action.payload },
      };

    case UPDATE_USER_START:
      return {
        ...state,
        loading: { ...state.loading, updateUser: true },
        error: { ...state.error, updateUser: '' },
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: addApiUrlInUserObj(action.payload),
        loading: { ...state.loading, updateUser: false },
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: { ...state.loading, updateUser: false },
        error: { ...state.error, updateUser: action.payload },
      };

    case VERIFY_USER_START:
      return {
        ...state,
        loading: { ...state.loading, verifyUser: true },
        error: { ...state.error, verifyUser: '' },
      };
    case VERIFY_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: { ...state.loading, verifyUser: false },
      };
    case VERIFY_USER_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, verifyUser: false },
        error: { ...state.error, verifyUser: action.payload },
      };
    case USER_LOGOUT:
      return initialState;
  }
  return state;
};
