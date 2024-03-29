import {
  CREATE_RECORD_START,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAILED,
  DELETE_RECORD_START,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_FAILED,
  DELETE_RECORD_POST_START,
  DELETE_RECORD_POST_SUCCESS,
  DELETE_RECORD_POST_FAILED,
  UPDATE_RECORD_START,
  UPDATE_RECORD_SUCCESS,
  UPDATE_RECORD_FAILED,
  GET_ALL_RECORDS_START,
  GET_ALL_RECORDS_SUCCESS,
  GET_ALL_RECORDS_FAILED,
  GET_ALL_USER_RECORDS_START,
  GET_ALL_USER_RECORDS_SUCCESS,
  GET_ALL_USER_RECORDS_FAILED,
  GET_ALL_RECORD_WITH_MESSAGES_START,
  GET_ALL_RECORD_WITH_MESSAGES_SUCCESS,
  GET_ALL_RECORD_WITH_MESSAGES_FAILED,
  GET_ALL_MESSAGES_START,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAILED,
  SEND_RECORD_MESSAGE_START,
  SEND_RECORD_MESSAGE_SUCCESS,
  SEND_RECORD_MESSAGE_FAILED,
  DATA_UPLOAD,
  UPDATE_UPLOAD_PROGRESS,
  CLEAR_UPLOADING_RECORD,
  UPDATE_CURRENT_RECORD,
  CLEAR_RECORD_POST,
  UPDATE_RECORD_POST_START,
  UPDATE_RECORD_POST_SUCCESS,
  UPDATE_RECORD_POST_FAILED,
} from './actions';
import {
  addApiUrlInRecordArr,
  getUpdatedRecord,
  getUpdatedUploadingDataObj,
  removeAttachedPostFromRecordsArrItem,
  removeItemFromUploadingArr,
  updatePostObjInRecordsArr,
  updateRecordObjInUploadingData,
} from './recordUtilsFunctions';

const initialState = {
  uploadingDataArr: [],
  currentUserRecordsArr: [],
  serverRecordsArr: [],
  currentRecord: {},
  loading: {
    createRecord: false,
    updateRecord: false,
    getAllRecords: false,
    getAllUserRecords: false,
    getAllRecordWithMessages: false,
    getAllMessages: false,
    sendRecordMessage: false,
    deletingRecord: false,
  },
  error: {
    createRecord: '',
    updateRecord: '',
    getAllRecords: '',
    getAllUserRecords: '',
    getAllRecordWithMessages: '',
    getAllMessages: '',
    sendRecordMessage: '',
    deletingRecord: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RECORD_START:
      return {
        ...state,

        loading: { ...state.loading, createRecord: true },
        error: { ...state.error, createRecord: '' },
      };
    case CREATE_RECORD_SUCCESS:
      return {
        ...state,
        uploadingDataArr: updateRecordObjInUploadingData(
          state.uploadingDataArr,
          action.payload
        ),
        loading: { ...state.loading, createRecord: false },
      };
    case CREATE_RECORD_FAILED:
      return {
        ...state,

        loading: { ...state.loading, createRecord: false },
        error: { ...state.error, createRecord: action.payload },
      };
    case UPDATE_RECORD_START:
      return {
        ...state,

        loading: { ...state.loading, updateRecord: true },
        error: { ...state.error, updateRecord: '' },
      };
    case UPDATE_RECORD_SUCCESS:
      return {
        ...state,
        serverRecordsArr: getUpdatedRecord(
          state.serverRecordsArr,
          action.payload
        ),
        loading: { ...state.loading, updateRecord: false },
      };
    case UPDATE_RECORD_FAILED:
      return {
        ...state,

        loading: { ...state.loading, updateRecord: false },
        error: { ...state.error, updateRecord: action.payload },
      };
    case GET_ALL_RECORDS_START:
      return {
        ...state,
        serverRecordsArr: [],
        loading: { ...state.loading, getAllRecords: true },
        error: { ...state.error, getAllRecords: '' },
      };
    case GET_ALL_RECORDS_SUCCESS:
      return {
        ...state,
        serverRecordsArr: addApiUrlInRecordArr(action.payload),
        loading: { ...state.loading, getAllRecords: false },
      };
    case GET_ALL_RECORDS_FAILED:
      return {
        ...state,
        loading: { ...state.loading, getAllRecords: false },
        error: { ...state.error, getAllRecords: action.payload },
      };

    case DELETE_RECORD_START:
      return {
        ...state,
        loading: { ...state.loading, deleteRecord: true },
        error: { ...state.error, deleteRecord: '' },
      };
    case DELETE_RECORD_SUCCESS:
      return {
        ...state,
        serverRecordsArr: state.serverRecordsArr.filter(
          (el) => el._id !== action.payload
        ),
        loading: { ...state.loading, deleteRecord: false },
      };
    case DELETE_RECORD_FAILED:
      return {
        ...state,
        loading: { ...state.loading, deleteRecord: false },
        error: { ...state.error, deleteRecord: action.payload },
      };

    case GET_ALL_USER_RECORDS_START:
      return {
        ...state,
        currentUserRecordsArr: [],
        loading: { ...state.loading, getAllUserRecords: true },
        error: { ...state.error, getAllUserRecords: '' },
      };
    case GET_ALL_USER_RECORDS_SUCCESS:
      return {
        ...state,
        currentUserRecordsArr: addApiUrlInRecordArr(action.payload),
        loading: { ...state.loading, getAllUserRecords: false },
      };
    case GET_ALL_USER_RECORDS_FAILED:
      return {
        ...state,
        loading: { ...state.loading, getAllUserRecords: false },
        error: { ...state.error, getAllUserRecords: action.payload },
      };

    case GET_ALL_RECORD_WITH_MESSAGES_START:
      return {
        ...state,

        loading: { ...state.loading, getAllRecordWithMessages: true },
        error: { ...state.error, getAllRecordWithMessages: '' },
      };
    case GET_ALL_RECORD_WITH_MESSAGES_SUCCESS:
      return {
        ...state,

        loading: { ...state.loading, getAllRecordWithMessages: false },
      };
    case GET_ALL_RECORD_WITH_MESSAGES_FAILED:
      return {
        ...state,

        loading: { ...state.loading, getAllRecordWithMessages: false },
        error: { ...state.error, getAllRecordWithMessages: action.payload },
      };

    case GET_ALL_MESSAGES_START:
      return {
        ...state,

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

        loading: { ...state.loading, getAllMessages: false },
        error: { ...state.error, getAllMessages: action.payload },
      };

    case SEND_RECORD_MESSAGE_START:
      return {
        ...state,

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

        loading: { ...state.loading, sendRecordMessage: false },
        error: { ...state.error, sendRecordMessage: action.payload },
      };
    case DATA_UPLOAD:
      return {
        ...state,
        uploadingDataArr: state.uploadingDataArr.concat(action.payload),
      };
    case UPDATE_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadingDataArr: getUpdatedUploadingDataObj(
          state.uploadingDataArr,
          action.payload
        ),
      };

    case CLEAR_UPLOADING_RECORD:
      return {
        ...state,
        uploadingDataArr: removeItemFromUploadingArr(
          state.uploadingDataArr,
          action.payload
        ),
      };
    case CLEAR_RECORD_POST:
      return {
        ...state,
        uploadingDataArr: !action.payload.isServerRecord
          ? removeAttachedPostFromRecordsArrItem(
              state.uploadingDataArr,
              action.payload
            )
          : state.uploadingDataArr,

        serverRecordsArr: action.payload.isServerRecord
          ? removeAttachedPostFromRecordsArrItem(
              state.serverRecordsArr,
              action.payload
            )
          : state.serverRecordsArr,
      };
    case UPDATE_RECORD_POST_SUCCESS:
      return {
        ...state,
        uploadingDataArr: !action.payload?.isServerRecord
          ? updatePostObjInRecordsArr(state.uploadingDataArr, action.payload)
          : state.uploadingDataArr,
        serverRecordsArr: action.payload.isServerRecord
          ? updatePostObjInRecordsArr(state.serverRecordsArr, action.payload)
          : state.serverRecordsArr,
      };
    case UPDATE_CURRENT_RECORD:
      return {
        ...state,
        currentRecord: {
          ...state.currentRecord,
          ...action.payload,
        },
      };
  }
  return state;
};
