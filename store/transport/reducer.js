import {
  CREATE_TRANSPORT_REQUEST_START,
  CREATE_TRANSPORT_REQUEST_SUCCESS,
  CREATE_TRANSPORT_REQUEST_FAILED,
  UPDATE_TRANSPORT_REQUEST_START,
  UPDATE_TRANSPORT_REQUEST_SUCCESS,
  UPDATE_TRANSPORT_REQUEST_FAILED,
  SEND_TRANSPORT_MESSAGE_START,
  SEND_TRANSPORT_MESSAGE_SUCCESS,
  SEND_TRANSPORT_MESSAGE_FAILED,
  GET_ALL_TRANSPORT_REQUESTS_START,
  GET_ALL_TRANSPORT_REQUESTS_SUCCESS,
  GET_ALL_TRANSPORT_REQUESTS_FAILED,
  GET_ALL_TRANSPORT_MESSAGE_START,
  GET_ALL_TRANSPORT_MESSAGE_SUCCESS,
  GET_ALL_TRANSPORT_MESSAGE_FAILED,
} from './actions';

const initialState = {
  allTransportRequests: [],
  loading: {
    createTransportRequest: false,
    updateTransportRequest: false,
    sendTransportMessage: false,
    getAllTransportRequests: false,
    getAllTransportMessages: false,
  },
  error: {
    createTransportRequest: '',
    updateTransportRequest: '',
    sendTransportMessage: '',
    getAllTransportRequests: '',
    getAllTransportMessages: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRANSPORT_REQUEST_START:
      return {
        ...state,

        loading: { ...state.loading, createTransportRequest: true },
        error: { ...state.error, createTransportRequest: '' },
      };
    case CREATE_TRANSPORT_REQUEST_SUCCESS:
      return {
        ...state,
        allTransportRequests: state.allTransportRequests.concat(action.payload),
        loading: { ...state.loading, createTransportRequest: false },
      };
    case CREATE_TRANSPORT_REQUEST_FAILED:
      return {
        ...state,

        loading: { ...state.loading, createTransportRequest: false },
        error: { ...state.error, createTransportRequest: action.payload },
      };
    case UPDATE_TRANSPORT_REQUEST_START:
      return {
        ...state,
        loading: { ...state.loading, updateTransportRequest: true },
        error: { ...state.error, updateTransportRequest: '' },
      };
    case UPDATE_TRANSPORT_REQUEST_SUCCESS:
      return {
        ...state,
        allTransportRequests: state.allTransportRequests.map((el) => {
          if (el._id === action.payload._id) return { ...action.payload };
          return { ...el };
        }),
        loading: { ...state.loading, updateTransportRequest: false },
      };
    case UPDATE_TRANSPORT_REQUEST_FAILED:
      return {
        ...state,

        loading: { ...state.loading, updateTransportRequest: false },
        error: { ...state.error, updateTransportRequest: action.payload },
      };

    case SEND_TRANSPORT_MESSAGE_START:
      return {
        ...state,

        loading: { ...state.loading, sendTransportMessage: true },
        error: { ...state.error, sendTransportMessage: '' },
      };
    case SEND_TRANSPORT_MESSAGE_SUCCESS:
      return {
        ...state,

        loading: { ...state.loading, sendTransportMessage: false },
      };
    case SEND_TRANSPORT_MESSAGE_FAILED:
      return {
        ...state,

        loading: { ...state.loading, sendTransportMessage: false },
        error: { ...state.error, sendTransportMessage: action.payload },
      };
    case GET_ALL_TRANSPORT_REQUESTS_START:
      return {
        ...state,
        allTransportRequests: [],
        loading: { ...state.loading, getAllTransportRequests: true },
        error: { ...state.error, getAllTransportRequests: '' },
      };
    case GET_ALL_TRANSPORT_REQUESTS_SUCCESS:
      return {
        ...state,
        allTransportRequests: action.payload,
        loading: { ...state.loading, getAllTransportRequests: false },
      };
    case GET_ALL_TRANSPORT_REQUESTS_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllTransportRequests: false },
        error: { ...state.error, getAllTransportRequests: action.payload },
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
  return state;
};
