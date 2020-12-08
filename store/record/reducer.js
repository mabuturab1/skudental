import {
  CREATE_RECORD_START,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILED,
  UPDATE_RECORD_START,
  UPDATE_RECORD_SUCCESS,
  UPDATE_RECORD_FAILED,
  GET_ALL_RECORDS_START,
  GET_ALL_RECORDS_SUCCESS,
  GET_ALL_RECORDS_FAILED,
  GET_ALL_RECORD_WITH_MESSAGES_START,
  GET_ALL_RECORD_WITH_MESSAGES_SUCCESS,
  GET_ALL_RECORD_WITH_MESSAGES_FAILED,
  GET_ALL_MESSAGES_START,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAILED,
  SEND_RECORD_MESSAGE_START,
  SEND_RECORD_MESSAGE_SUCCESS,
  SEND_RECORD_MESSAGE_FAILED,
} from './actions';

const initialState = {
  user: {},
  loading: {
    createRecord: false,
    updateRecord: false,
    getAllRecords: false,
    getAllRecordWithMessages: false,
    getAllMessages: false,
    sendRecordMessage: false,
  },
  error: {
    createRecord: '',
    updateRecord: '',
    getAllRecords: '',
    getAllRecordWithMessages: '',
    getAllMessages: '',
    sendRecordMessage: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RECORD_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, createRecord: true },
        error: { ...state.error, createRecord: '' },
      };
    case CREATE_RECORD_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: { ...state.loading, createRecord: false },
      };
    case CREATE_RECORD_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, createRecord: false },
        error: { ...state.error, createRecord: action.payload },
      };
    case UPDATE_RECORD_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, updateRecord: true },
        error: { ...state.error, updateRecord: '' },
      };
    case UPDATE_RECORD_SUCCESS:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, updateRecord: false },
      };
    case UPDATE_RECORD_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, updateRecord: false },
        error: { ...state.error, updateRecord: action.payload },
      };
    case GET_ALL_RECORDS_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllRecords: true },
        error: { ...state.error, getAllRecords: '' },
      };
    case GET_ALL_RECORDS_SUCCESS:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllRecords: false },
      };
    case GET_ALL_RECORDS_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllRecords: false },
        error: { ...state.error, getAllRecords: action.payload },
      };

    case GET_ALL_RECORD_WITH_MESSAGES_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllRecordWithMessages: true },
        error: { ...state.error, getAllRecordWithMessages: '' },
      };
    case GET_ALL_RECORD_WITH_MESSAGES_SUCCESS:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllRecordWithMessages: false },
      };
    case GET_ALL_RECORD_WITH_MESSAGES_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllRecordWithMessages: false },
        error: { ...state.error, getAllRecordWithMessages: action.payload },
      };

    case GET_ALL_MESSAGES_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllMessages: true },
        error: { ...state.error, getAllMessages: '' },
      };
    case GET_ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: { ...state.loading, getAllMessages: false },
      };
    case GET_ALL_MESSAGES_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, getAllMessages: false },
        error: { ...state.error, getAllMessages: action.payload },
      };

    case SEND_RECORD_MESSAGE_START:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, sendRecordMessage: true },
        error: { ...state.error, sendRecordMessage: '' },
      };
    case SEND_RECORD_MESSAGE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: { ...state.loading, sendRecordMessage: false },
      };
    case SEND_RECORD_MESSAGE_FAILED:
      return {
        ...state,
        user: {},
        loading: { ...state.loading, sendRecordMessage: false },
        error: { ...state.error, sendRecordMessage: action.payload },
      };
  }
  return state;
};
