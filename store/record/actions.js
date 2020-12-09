import axios from 'axios';
const CREATE_RECORD_START = 'CREATE_RECORD_START';
const CREATE_RECORD_SUCCESS = 'CREATE_RECORD_SUCCESS';
const CREATE_RECORD_FAILED = 'CREATE_RECORD_FAILED';

const UPDATE_RECORD_START = 'UPDATE_RECORD_START';
const UPDATE_RECORD_SUCCESS = 'UPDATE_RECORD_SUCCESS';
const UPDATE_RECORD_FAILED = 'UPDATE_RECORD_FAILED';

const GET_ALL_RECORDS_START = 'GET_ALL_RECORDS_START';
const GET_ALL_RECORDS_SUCCESS = 'GET_ALL_RECORDS_SUCCESS';
const GET_ALL_RECORDS_FAILED = 'GET_ALL_RECORDS_FAILED';

const GET_ALL_RECORDS_WITH_MESSAGES_START =
  'GET_ALL_RECORDS_WITH_MESSAGES_START';
const GET_ALL_RECORDS_WITH_MESSAGES_SUCCESS =
  'GET_ALL_RECORDS_WITH_MESSAGES_SUCCESS';
const GET_ALL_RECORDS_WITH_MESSAGES_FAILED =
  'GET_ALL_RECORDS_WITH_MESSAGES_FAILED';

const GET_ALL_MESSAGES_START = 'GET_ALL_MESSAGES_START';
const GET_ALL_MESSAGES_SUCCESS = 'GET_ALL_MESSAGES_SUCCESS';
const GET_ALL_MESSAGES_FAILED = 'GET_ALL_MESSAGES_FAILED';

const SEND_RECORD_MESSAGE_START = 'SEND_RECORD_MESSAGE_START';
const SEND_RECORD_MESSAGE_SUCCESS = 'SEND_RECORD_MESSAGE_SUCCESS';
const SEND_RECORD_MESSAGE_FAILED = 'SEND_RECORD_MESSAGE_FAILED';
const createRecordStart = () => ({ type: CREATE_RECORD_START });
const createRecordSuccess = (payload) => ({
  type: CREATE_RECORD_SUCCESS,
  payload,
});
const createRecordFailed = (error = '') => ({
  type: CREATE_RECORD_FAILED,
  error,
});
const updateRecordStart = () => ({ type: UPDATE_RECORD_START });
const updateRecordSuccess = (payload) => ({
  type: UPDATE_RECORD_SUCCESS,
  payload,
});
const updateRecordFailed = (error = '') => ({
  type: UPDATE_RECORD_FAILED,
  error,
});
const getAllRecordsStart = () => ({ type: GET_ALL_RECORDS_START });
const getAllRecordsSuccess = (payload) => ({
  type: GET_ALL_RECORDS_SUCCESS,
  payload,
});
const getAllRecordsFailed = (error = '') => ({
  type: GET_ALL_RECORDS_FAILED,
  error,
});
const getAllRecordsWithMessagesStart = () => ({
  type: GET_ALL_RECORDS_WITH_MESSAGES_START,
});
const getAllRecordsWithMessagesSuccess = (payload) => ({
  type: GET_ALL_RECORDS_WITH_MESSAGES_SUCCESS,
  payload,
});
const getAllRecordsWithMessagesFailed = (error) => ({
  type: GET_ALL_RECORDS_WITH_MESSAGES_FAILED,
  error,
});
const getAllMessagesStart = () => ({
  type: GET_ALL_MESSAGES_START,
});
const getAllMessagesSuccess = (payload) => ({
  type: GET_ALL_MESSAGES_SUCCESS,
  payload,
});
const getAllMessagesFailed = (error) => ({
  type: GET_ALL_MESSAGES_FAILED,
  error,
});

const sendMessageStart = () => ({
  type: SEND_RECORD_MESSAGE_START,
});
const sendMessageSuccess = (payload) => ({
  type: SEND_RECORD_MESSAGE_SUCCESS,
  payload,
});
const sendMessageFailed = (error) => ({
  type: SEND_RECORD_MESSAGE_FAILED,
  error,
});

export const createRecord = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(createRecordStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(createRecordSuccess(response.data));
      } else if (response.error) {
        dispatch(createRecordFailed(response.error));
      }
    } catch (error) {
      dispatch(createRecordFailed('An error occurred'));
    }
  };
};

export const updateRecord = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(updateRecordStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(updateRecordSuccess(response.data));
      } else if (response.error) {
        dispatch(updateRecordFailed(response.error));
      }
    } catch (error) {
      dispatch(updateRecordFailed('An error occurred'));
    }
  };
};

export const createTransportRequest = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(createTransportRequestStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(createTransportRequestSuccess(response.data));
      } else if (response.error) {
        dispatch(createTransportRequestFailed(response.error));
      }
    } catch (error) {
      dispatch(createTransportRequestFailed('An error occurred'));
    }
  };
};

export const getAllRecords = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(getAllRecordsStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(getAllRecordsSuccess(response.data));
      } else if (response.error) {
        dispatch(getAllRecordsFailed(response.error));
      }
    } catch (error) {
      dispatch(getAllRecordsFailed('An error occurred'));
    }
  };
};

export const getAllRecordsWithMessages = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(getAllRecordsWithMessagesStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(getAllRecordsWithMessagesSuccess(response.data));
      } else if (response.error) {
        dispatch(getAllRecordsWithMessagesFailed(response.error));
      }
    } catch (error) {
      dispatch(getAllRecordsWithMessagesFailed('An error occurred'));
    }
  };
};

export const getAllMessages = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(getAllMessagesStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(getAllMessagesSuccess(response.data));
      } else if (response.error) {
        dispatch(getAllMessagesFailed(response.error));
      }
    } catch (error) {
      dispatch(getAllMessagesFailed('An error occurred'));
    }
  };
};

export const sendMessages = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(sendMessagesStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData
      );
      if (response && response.data) {
        dispatch(sendMessagesSuccess(response.data));
      } else if (response.error) {
        dispatch(sendMessagesFailed(response.error));
      }
    } catch (error) {
      dispatch(sendMessagesFailed('An error occurred'));
    }
  };
};