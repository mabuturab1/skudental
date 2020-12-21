import {
  GET_ALL_USERS_START,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILED,
  VERIFY_USER_START,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILED,
} from './actions';

const initialState = {
  allUsers: [],
  loading: {
    getAllUsers: false,
    verifyUser: false,
  },
  error: {
    getAllUsers: '',
    verifyUser: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_START:
      return {
        ...state,
        loading: { ...state.loading, getAllUsers: true },
        error: { ...state.error, getAllUsers: '' },
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.payload,
        loading: { ...state.loading, getAllUsers: false },
      };
    case GET_ALL_USERS_FAILED:
      return {
        ...state,
        loading: { ...state.loading, getAllUsers: false },
        error: { ...state.error, getAllUsers: action.payload },
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
        allUsers: state.allUsers.map((el) => {
          if (action.payload._id === el._id)
            return { ...action.payload };
          return { ...el };
        }),
        loading: { ...state.loading, verifyUser:false },
      };
    case VERIFY_USER_FAILED:
      return {
        ...state,
        loading: { ...state.loading, verifyUser: false },
        error: { ...state.error, getAllUsers: action.payload },
      };
  }
  return state;
};
