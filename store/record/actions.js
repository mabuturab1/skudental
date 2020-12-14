import axios from 'axios';
import moment from 'moment';
import { apiRoutes, API_URL } from '../../constants/apiRoutes';
import { isSuccessDefault } from '../../constants/UIConstants';
import { getAxiosConfig } from '../../helpers/Utils';
export const CREATE_RECORD_START = 'CREATE_RECORD_START';
export const CREATE_RECORD_SUCCESS = 'CREATE_RECORD_SUCCESS';
export const CREATE_RECORD_FAILED = 'CREATE_RECORD_FAILED';

export const UPDATE_RECORD_START = 'UPDATE_RECORD_START';
export const UPDATE_RECORD_SUCCESS = 'UPDATE_RECORD_SUCCESS';
export const UPDATE_RECORD_FAILED = 'UPDATE_RECORD_FAILED';

export const GET_ALL_RECORDS_START = 'GET_ALL_RECORDS_START';
export const GET_ALL_RECORDS_SUCCESS = 'GET_ALL_RECORDS_SUCCESS';
export const GET_ALL_RECORDS_FAILED = 'GET_ALL_RECORDS_FAILED';

export const GET_ALL_RECORDS_WITH_MESSAGES_START =
  'GET_ALL_RECORDS_WITH_MESSAGES_START';
export const GET_ALL_RECORDS_WITH_MESSAGES_SUCCESS =
  'GET_ALL_RECORDS_WITH_MESSAGES_SUCCESS';
export const GET_ALL_RECORDS_WITH_MESSAGES_FAILED =
  'GET_ALL_RECORDS_WITH_MESSAGES_FAILED';

export const GET_ALL_MESSAGES_START = 'GET_ALL_MESSAGES_START';
export const GET_ALL_MESSAGES_SUCCESS = 'GET_ALL_MESSAGES_SUCCESS';
export const GET_ALL_MESSAGES_FAILED = 'GET_ALL_MESSAGES_FAILED';

export const SEND_RECORD_MESSAGE_START = 'SEND_RECORD_MESSAGE_START';
export const SEND_RECORD_MESSAGE_SUCCESS = 'SEND_RECORD_MESSAGE_SUCCESS';
export const SEND_RECORD_MESSAGE_FAILED = 'SEND_RECORD_MESSAGE_FAILED';

export const DATA_UPLOAD = 'DATA_UPLOAD';
export const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';

export const CLEAR_UPLOADING_RECORD = 'CLEAR_UPLOADING_RECORD';

const createRecordStart = () => ({ type: CREATE_RECORD_START });
const createRecordSuccess = (record, recordIndex) => ({
  type: CREATE_RECORD_SUCCESS,
  payload: { record, recordIndex },
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

export const createRecord = (
  recordData,
  currentRecordIndex,
  isSuccess = isSuccessDefault
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(createRecordStart());
      console.log('start creating record', API_URL + apiRoutes.CREATE_RECORD);
      const response = await axios.post(
        API_URL + apiRoutes.CREATE_RECORD,
        recordData,
        { ...getAxiosConfig(getState) }
      );
      console.log('start creating record success', response);
      if (response && response.data) {
        const record = response?.data?.data;
        dispatch(createRecordSuccess(record, currentRecordIndex));
        isSuccess(true, record);
      } else if (response.error) {
        console.log(response.error);
        dispatch(createRecordFailed(response.error));
        isSuccess(false, null);
      }
    } catch (error) {
      console.log('create record failed', error, error.message);
      dispatch(createRecordFailed('An error occurred'));
      isSuccess(false, null);
    }
  };
};
const getPhotoFormData = (fileInfo) => {
  let formData = new FormData();
  console.log('file upload', fileInfo.imageFile.originalFileName);
  let photo = {
    ...fileInfo.imageFile,
    uri: fileInfo.imageFile.path,
    type: fileInfo.imageFile.mime,
    name: fileInfo.imageFile.path?.split('/').pop() || Date.now().toString(),
  };
  console.log(fileInfo);
  formData.append('photo', photo);
  formData.append('additionalComments', fileInfo.additionalComments);
  return formData;
};
const getProgress = (progressEvent) =>
  Math.round((progressEvent.loaded * 100) / progressEvent.total);

const updateProgress = (
  recordIndex,
  attachedItemIndex,
  progress,
  dispatch,
  uploadComplete = false
) => {
  console.log('update progress', recordIndex, attachedItemIndex, progress);
  dispatch(
    updateUploadProgress({
      recordIndex,
      attachedItemIndex,
      progress,
      uploadComplete,
    })
  );
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
      console.log('UPLOADING FILE', recordId, currentRecordIndex, itemIndex);
      const fileHeader = { 'Content-Type': 'multipart/form-data' };
      const url = API_URL + apiRoutes.UPLOAD_RECORD_FILE + `/${recordId}`;
      console.log(
        'sneding data to',
        API_URL + apiRoutes.UPLOAD_RECORD_FILE + `/${recordId}`
      );
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
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
      updateProgress(currentRecordIndex, itemIndex, 100, dispatch, true);
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
      console.log(
        'An error occurred while uploading file',
        error,
        error.message
      );
      // dispatch(clearUploadingRecord(currentRecordIndex));
    }
  };
};

export const clearUploadedRecord = (recordData) => {
  return async (dispatch, getState) => {
    const { record } = getState();
    const uploadingDataArr = record.uploadingDataArr;
    let itemIndex = [];
    uploadingDataArr.forEach((el, index) => {
      let isUploadComplete = true;
      el.attachedItems.forEach((item) => {
        isUploadComplete = item.uploadComplete && isUploadComplete;
      });
      if (isUploadComplete) itemIndex.push(index);
    });
    itemIndex.forEach((el) => dispatch(clearUploadingRecord(el)));
  };
};

export const updateRecord = (recordData) => {
  return async (dispatch) => {
    try {
      dispatch(updateRecordStart());
      const response = await axios.post(
        API_URL + apiRoutes.UPLOAD_RECORD_FILE,
        recordData
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

export const startUploadingData = (record, currentRecordIndex) => {
  return async (dispatch, getState) => {
    console.log('start uploading data called');
    dispatch(uploadData(record));
    dispatch(
      createRecord(
        record.recordData,
        currentRecordIndex,
        (isSuccess, newRecord) => {
          if (isSuccess) {
            console.log('record created successfully', newRecord);
            scheduleFileUpload(
              newRecord._id,
              record.attachedItems,
              currentRecordIndex,
              dispatch
            );
          } else dispatch(clearUploadingRecord(currentRecordIndex));
        }
      )
    );
  };
};
const scheduleFileUpload = (
  recordId,
  attachedItems,
  currentRecordIndex,
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
    currentRecordIndex,
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
  currentRecordIndex,
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
        (el) => !uploadingItems.includes(el) && !uploadedItems.includes(el)
      );
      uploadingItems.push(newIndex);
      unUploadedItems = unUploadedItems.filter((el) => el !== newIndex);
      dispatch(
        uploadRecordPhoto(
          recordId,
          attachedItems[newIndex],
          currentRecordIndex,
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
              currentRecordIndex,
              dispatch
            );
            if (!isAllUploaded) {
              startUploadingFile(
                recordId,
                attachedItems,
                currentRecordIndex,
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
    // dispatch(clearUploadingRecord(recordIndex));
    return true;
  }
  return allItems.filter((el) => !uploaded.includes(el)).length == 0;
};

export const createTransportRequest = (recordData) => {
  return async (dispatch) => {
    try {
      dispatch(createTransportRequestStart());
      const response = await axios.post(
        API_URL + apiRoutes.CREATE_TRANSPORT_REQUEST,
        recordData
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

export const getAllRecords = (recordData={}) => {
  return async (dispatch) => {
    console.log('getting all records');
    try {
      dispatch(getAllRecordsStart());
      const response = await axios.post(
        API_URL + apiRoutes.GET_ALL_RECORDS,
        recordData
      );
      if (response && response.data) {
        const record=response?.data?.data;
        dispatch(getAllRecordsSuccess(record));
      } else if (response.error) {
        dispatch(getAllRecordsFailed(response.error));
      }
    } catch (error) {
      console.log('error occurred', error);
      dispatch(getAllRecordsFailed('An error occurred'));
    }
  };
};

export const getAllRecordsWithMessages = (recordData) => {
  return async (dispatch) => {
    try {
      dispatch(getAllRecordsWithMessagesStart());
      const response = await axios.post(
        API_URL + apiRoutes.CREATE_TRANSPORT_REQUEST,
        recordData
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

export const getAllMessages = (recordData) => {
  return async (dispatch) => {
    try {
      dispatch(getAllMessagesStart());
      const response = await axios.post(
        API_URL + apiRoutes.CREATE_TRANSPORT_REQUEST,
        recordData
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

export const sendMessages = (recordData) => {
  return async (dispatch) => {
    try {
      dispatch(sendMessagesStart());
      const response = await axios.post(
        API_URL + apiRoutes.CREATE_TRANSPORT_REQUEST,
        recordData
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
