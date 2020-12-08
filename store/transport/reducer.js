import {
  CREATE_TRANSPORT_REQUEST_START,
  CREATE_TRANSPORT_REQUEST_SUCCESS,
  CREATE_TRANSPORT_REQUEST_FAILED,
  SEND_TRANSPORT_MESSAGE_START,
  SEND_TRANSPORT_MESSAGE_SUCCESS,
  SEND_TRANSPORT_MESSAGE_FAILED,
  GET_ALL_TRANSPORTS_START,
  GET_ALL_TRANSPORTS_SUCCESS,
  GET_ALL_TRANSPORTS_FAILED,
  GET_ALL_TRANSPORT_MESSAGE_START,
  GET_ALL_TRANSPORT_MESSAGE_SUCCESS,
  GET_ALL_TRANSPORT_MESSAGE_FAILED,
} from './actions';

const initialState = {
  user: {},
  loading: {
    createTransportRequest: false,
    sendTransportMessage: false,
    getAllTransports: false,
    getAllTransportMessages: false,
    verifyUser: false,
  },
  error: {
    createTransportRequest: '',
    sendTransportMessage: '',
    getAllTransports: '',
    getAllTransportMessages: '',
    verifyUser: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRANSPORT_REQUEST_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, createTransportRequest: true },
        error: { ...state.error, createTransportRequest: '' },
      };
    case CREATE_TRANSPORT_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: { ...state.loading, createTransportRequest: false },
      };
    case CREATE_TRANSPORT_REQUEST_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, createTransportRequest: false },
        error: { ...state.error, createTransportRequest: action.payload },
      };
    case SEND_TRANSPORT_MESSAGE_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, sendTransportMessage: true },
        error: { ...state.error, sendTransportMessage: '' },
      };
    case SEND_TRANSPORT_MESSAGE_SUCCESS:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, sendTransportMessage: false },
      };
    case SEND_TRANSPORT_MESSAGE_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, sendTransportMessage: false },
        error: { ...state.error, sendTransportMessage: action.payload },
      };
    case GET_ALL_TRANSPORTS_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllTransports: true },
        error: { ...state.error, getAllTransports: '' },
      };
    case GET_ALL_TRANSPORTS_SUCCESS:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllTransports: false },
      };
    case GET_ALL_TRANSPORTS_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllTransports: false },
        error: { ...state.error, getAllTransports: action.payload },
      };

    case UPDATE_PASSWORD_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, updatePassword: true },
        error: { ...state.error, updatePassword: '' },
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, updatePassword: false },
      };
    case UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, updatePassword: false },
        error: { ...state.error, updatePassword: action.payload },
      };

    case GET_ALL_TRANSPORT_MESSAGE_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllTransportMessages: true },
        error: { ...state.error, getAllTransportMessages: '' },
      };
    case GET_ALL_TRANSPORT_MESSAGE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: { ...state.loading, getAllTransportMessages: false },
      };
    case GET_ALL_TRANSPORT_MESSAGE_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllTransportMessages: false },
        error: { ...state.error, getAllTransportMessages: action.payload },
      };
  }
};
