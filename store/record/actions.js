import axios from 'axios';
import moment from 'moment';
import { apiRoutes } from '../../constants/apiRoutes';
import { isSuccessDefault } from '../../constants/UIConstants';
import { getAxiosConfig } from '../../helpers/Utils';
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

const DATA_UPLOAD = 'DATA_UPLOAD';
const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';
const CLEAR_UPLOADING_RECORD = 'CLEAR_UPLOADING_RECORD';

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

const clearUploadingRecord = (payload) => ({
  type: CLEAR_UPLOADING_RECORD,
  payload,
});

const updateUploadProgress = (payload) => ({
  type: UPDATE_UPLOAD_PROGRESS,
  payload,
});

const uploadData = (payload) => ({
  type: DATA_UPLOAD,
  payload,
});

export const createRecord = (userData, isSuccess = isSuccessDefault) => {
  return async (dispatch, getState) => {
    try {
      dispatch(createRecordStart());
      const response = await axios.post(
        apiUrl + apiRoutes.CREATE_TRANSPORT_REQUEST,
        userData,
        { ...getAxiosConfig(getState) }
      );
      if (response && response.data) {
        const result = response?.data?.data;
        dispatch(createRecordSuccess(result));
        isSuccess(true, result);
      } else if (response.error) {
        dispatch(createRecordFailed(response.error));
        isSuccess(false, null);
      }
    } catch (error) {
      dispatch(createRecordFailed('An error occurred'));
      isSuccess(false, null);
    }
  };
};
const getPhotoFormData = (fileInfo) => {
  let formData = new FormData();
  formData.append('photo', fileInfo.imageFile);
  formData.append('additionalComments', fileInfo.additionalComments);
  return formData;
};
const getProgress = (progressEvent) =>
  Math.round((progressEvent.loaded * 100) / progressEvent.total);

const updateProgress = (recordIndex, attachedItemIndex, progress, dispatch) => {
  console.log('update progress', recordIndex, attachedItemIndex, progress);
  dispatch(updateUploadProgress({ recordIndex, attachedItemIndex, progress }));
};
export const uploadRecordPhoto = (
  recordId,
  fileInfo,
  currentRecordIndex,
  itemIndex,
  isSuccess = isSuccessDefault
) => {
  return async (dispatch, getState) => {
    try {
      let formData = getPhotoFormData(fileInfo);
      let nextUpdateDue = 0;
      console.log(
        'UPLOADING FILE',
        recordId,
        fileInfo,
        currentRecordIndex,
        itemIndex
      );
      const fileHeader = { 'Content-Type': 'multipart/form-data' };
      await axios.post(
        API_URL + apiRoutes.UPLOAD_RECORD_FILE + `/${recordId}`,
        formData,
        {
          ...getAxiosConfig(getState, fileHeader),
          onUploadProgress: (progressEvent) => {
            var percentCompleted = getProgress(progressEvent);
            if (nextUpdateDue > moment().unix()) {
              return;
            }
            nextUpdateDue = moment().add(4, 'seconds').unix();
            updateProgress(
              currentRecordIndex,
              itemIndex,
              percentCompleted,
              dispatch
            );
          },
        }
      );
      updateProgress(currentRecordIndex, itemIndex, 100, dispatch);
      isSuccess(true);
      console.log(
        'UPLOADING SUCCESS',
        recordId,
        fileInfo,
        currentRecordIndex,
        itemIndex
      );
    } catch (error) {
      updateProgress(currentRecordIndex, itemIndex, -1, dispatch);
      console.log('An error occurred while uploading file', error);
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

export const startUploadingData = (record, newUploadDataIndex) => {
  return async (dispatch, getState) => {
    dispatch(uploadData(record));
    dispatch(
      createRecord(record.recordData, (isSuccess, newRecord) => {
        if (isSuccess) {
          console.log('record created successfully', newRecord);
          scheduleFileUpload(
            newRecord._id,
            record.attachedItems,
            newUploadDataIndex,
            dispatch
          );
        }
      })
    );
  };
};
const scheduleFileUpload = (
  recordId,
  attachedItems,
  currentRecordId,
  dispatch
) => {
  let allowedUploadLimit = 5;
  let allItems = [...Array(attachedItems.length).keys()];
  let unUploadedItems = [...Array(attachedItems.length).keys()];
  let uploadingItems = [];
  let uploadedItems = [];
  let uploadedSuccessful = [];
  startUploadingFile(
    recordId,
    attachedItems,
    currentRecordId,
    dispatch,
    allItems,
    unUploadedItems,
    uploadingItems,
    uploadedItems,
    uploadedSuccessful,
    allowedUploadLimit
  );
};
const startUploadingFile = (
  recordId,
  attachedItems,
  currentRecordId,
  dispatch,
  allItems,
  unUploadedItems,
  uploadingItems,
  uploadedItems,
  uploadedSuccessful,
  allowedUploadLimit
) => {
  unUploadedItems.forEach((el) => {
    if (uploadingItems.length < allowedUploadLimit) {
      let newIndex = unUploadedItems.find(
        (el) => !uploadingItems.includes(el) && !uploadedItems.included(el)
      );
      uploadingItems.push(newIndex);
      unUploadedItems = unUploadedItems.filter((el) => el !== newIndex);
      dispatch(
        uploadRecordPhoto(
          recordId,
          attachedItems[newIndex],
          currentRecordId,
          newIndex,
          (isSuccess) => {
            uploadingItems = uploadingItems.filter((el) => el !== newIndex);
            uploadedItems.push(newIndex);
            if (isSuccess) {
              uploadedSuccessful.push(newIndex);
            }
            const isAllUploaded = allFilesUploaded(
              allItems,
              uploadedItems,
              uploadedSuccessful,
              currentRecordId,
              dispatch
            );
            if (!isAllUploaded) {
              startUploadingFile(
                recordId,
                attachedItems,
                currentRecordId,
                dispatch,
                allItems,
                unUploadedItems,
                uploadingItems,
                uploadedItems,
                uploadedSuccessful,
                allowedUploadLimit
              );
            }
          }
        )
      );
    }
  });
};
const allFilesUploaded = (
  allItems,
  uploaded,
  success,
  recordIndex,
  dispatch
) => {
  const isAllSuccessful =
    allItems.filter((el) => !success.includes(el)).length == 0;
  if (isAllSuccessful) {
    dispatch(clearUploadingRecord(recordIndex));
    return true;
  }
  return allItems.filter((el) => !uploaded.includes(el)).length == 0;
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
