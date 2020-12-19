import axios from 'axios';
import moment from 'moment';
import { apiRoutes, API_URL } from '../../constants/apiRoutes';
import { isSuccessDefault } from '../../constants/UIConstants';
import {
  getAxiosConfig,
  getErrorMessage,
  getServerResponseData,
  isValidServerResponse,
  isValidValue,
} from '../../helpers/Utils';
import { showAlert } from '../alert/actions';

export const CREATE_RECORD_START = 'CREATE_RECORD_START';
export const CREATE_RECORD_SUCCESS = 'CREATE_RECORD_SUCCESS';
export const CREATE_RECORD_FAILED = 'CREATE_RECORD_FAILED';
export const DELETE_RECORD_START = 'DELETE_RECORD_START';
export const DELETE_RECORD_SUCCESS = 'DELETE_RECORD_SUCCESS';
export const DELETE_RECORD_FAILED = 'DELETE_RECORD_FAILED';

export const DELETE_RECORD_POST_START = 'DELETE_RECORD_POST_START';
export const DELETE_RECORD_POST_SUCCESS = 'DELETE_RECORD_POST_SUCCESS';
export const DELETE_RECORD_POST_FAILED = 'DELETE_RECORD_POST_FAILED';

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
export const UPDATE_CURRENT_RECORD = 'UPDATE_CURRENT_RECORD';
export const CLEAR_UPLOADING_RECORD_POST = 'CLEAR_UPLOADING_RECORD_POST';

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

const deleteRecordStart = () => ({
  type: DELETE_RECORD_START,
});
const deleteRecordSuccess = (payload) => ({
  type: DELETE_RECORD_SUCCESS,
  payload,
});
const deleteRecordFailed = (error) => ({
  type: DELETE_RECORD_FAILED,
  error,
});

const deleteRecordPostStart = () => ({
  type: DELETE_RECORD_POST_START,
});
const deleteRecordPostSuccess = (payload) => ({
  type: DELETE_RECORD_POST_SUCCESS,
  payload,
});
const deleteRecordPostFailed = (error) => ({
  type: DELETE_RECORD_POST_FAILED,
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

export const clearUploadingRecordPost = (payload) => ({
  type: CLEAR_UPLOADING_RECORD_POST,
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

export const updateCurrentRecord = (payload) => ({
  type: UPDATE_CURRENT_RECORD,
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

      const response = await axios.post(
        API_URL + apiRoutes.CREATE_RECORD,
        recordData,
        { ...getAxiosConfig(getState) }
      );

      if (isValidServerResponse(response)) {
        const record = getServerResponseData(response);
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
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot create record' + getErrorMessage(error)
        )
      );
    }
  };
};

export const proceedForPostDeletion = (
  id,
  isCurrentReduxRecord,
  currentRecordIndex = null,
  itemIndex = null,
  isServerRecord = null,
  isSuccess = isSuccessDefault
) => {
  return async (dispatch, getState) => {
    const { record } = getState();
    if (isValidValue(isCurrentReduxRecord) && isValidValue(itemIndex)) {
      let attachedPosts = (
        record?.currentRecord?.attachedPosts || []
      ).map((el) => ({ ...el }));
      if (attachedPosts.length) {
        console.log('item index is', itemIndex)
        attachedPosts.splice(itemIndex, 1);
        dispatch(updateCurrentRecord({ attachedPosts }));
        return;
      }
    }
    if (
      isValidValue(id) &&
      isValidValue(currentRecordIndex) &&
      isValidValue(itemIndex) &&
      isValidValue(isServerRecord)
    ) {
      dispatch(
        deleteRecordPost(id, (recordDeleted) => {
          isSuccess(recordDeleted);

          if (recordDeleted) {
            dispatch(
              clearUploadingRecordPost({
                index: currentRecordIndex,
                attachedItemIndex: itemIndex,
                isServerRecord,
              })
            );
          }
        })
      );
    }
  };
};

export const deleteRecord = (id, isSuccess = isSuccessDefault) => {
  return async (dispatch, getState) => {
    try {
      dispatch(deleteRecordStart());
      const response = await axios.delete(
        API_URL + apiRoutes.DELETE_RECORD + '/' + id,

        { ...getAxiosConfig(getState) }
      );

      if (isValidServerResponse(response)) {
        const record = getServerResponseData(response);
        dispatch(deleteRecordSuccess(record));
        isSuccess(true);
      } else if (response.error) {
        console.log(response.error);
        isSuccess(false);
      }
    } catch (error) {
      console.log('create record failed', error, error.message);
      dispatch(deleteRecordFailed('An error occurred'));
      isSuccess(false);
      dispatch(deleteRecordFailed('An error occurred'));
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot delete record' + getErrorMessage(error)
        )
      );
    }
  };
};

export const deleteRecordPost = (id, isSuccess = isSuccessDefault) => {
  return async (dispatch, getState) => {
    try {
      dispatch(deleteRecordPostStart());
      const response = await axios.delete(
        API_URL + apiRoutes.DELETE_RECORD_POST + '/' + id,
        { ...getAxiosConfig(getState) }
      );

      if (isValidServerResponse(response)) {
        const record = getServerResponseData(response);
        dispatch(deleteRecordPostSuccess(record));
        isSuccess(true);
      } else if (response.error) {
        console.log(response.error);
        dispatch(deleteRecordPostFailed('An error occurred'));
        isSuccess(false);
      }
    } catch (error) {
      console.log('create record failed', error, error.message);
      isSuccess(false);
      dispatch(deleteRecordPostFailed('An error occurred'));
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot delete record post' + getErrorMessage(error)
        )
      );
    }
  };
};

const getPhotoFormData = (fileInfo) => {
  let formData = new FormData();

  let photo = {
    ...fileInfo.imageFile,
    uri: fileInfo.imageFile.path,
    type: fileInfo.imageFile.mime,
    name: fileInfo.imageFile.path?.split('/').pop() || Date.now().toString(),
  };

  formData.append('photo', photo);
  if (fileInfo.audioItem) {
    formData.append('audio', fileInfo.audioItem);
  }
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
  uploadComplete = false,
  serverResult = null
) => {
  dispatch(
    updateUploadProgress({
      recordIndex,
      attachedItemIndex,
      progress,
      uploadComplete,
      serverResult,
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

      const fileHeader = { 'Content-Type': 'multipart/form-data' };
      const url = API_URL + apiRoutes.UPLOAD_RECORD_FILE + `/${recordId}`;

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
      const response = await axios.post(
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
      if (isValidServerResponse(response)) {
        const result = getServerResponseData(response);
        isSuccess(true);
        updateProgress(
          currentRecordIndex,
          itemIndex,
          100,
          dispatch,
          true,
          result
        );
      } else if (response.error) {
        updateProgress(currentRecordIndex, itemIndex, -1, dispatch);
        isSuccess(false);
      }
    } catch (error) {
      updateProgress(currentRecordIndex, itemIndex, -1, dispatch);
      isSuccess(false);
      console.log(
        'An error occurred while uploading file',
        error,
        error.message
      );

      // dispatch(clearUploadingRecord(currentRecordIndex));
    }
  };
};

export const clearUploadedRecord = () => {
  return async (dispatch, getState) => {
   
    const { record } = getState();
    const uploadingDataArr = record.uploadingDataArr;
    let itemIndex = [];
    uploadingDataArr.forEach((el, index) => {
      let isUploadComplete = true;
      el.attachedPosts.forEach((item) => {
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
      if (isValidServerResponse(response)) {
        dispatch(updateRecordSuccess(getServerResponseData(response)));
      } else if (response.error) {
        dispatch(updateRecordFailed(response.error));
      }
    } catch (error) {
      dispatch(updateRecordFailed('An error occurred'));
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot update record' + getErrorMessage(error)
        )
      );
    }
  };
};

export const startUploadingData = (record, currentRecordIndex) => {
  return async (dispatch, getState) => {
    dispatch(uploadData(record));
    dispatch(
      createRecord(
        record.recordData,
        currentRecordIndex,
        (isSuccess, newRecord) => {
          if (isSuccess) {
            scheduleFileUpload(
              newRecord._id,
              record.attachedPosts,
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
  attachedPosts,
  currentRecordIndex,
  dispatch
) => {
  let allowedUploadLimit = 5;
  let allItems = [...Array(attachedPosts.length).keys()];
  let unUploadedItems = [...Array(attachedPosts.length).keys()];
  let uploadingItems = [];
  let uploadedItems = [];
  let uploadedSuccessful = [];

  startUploadingFile(
    recordId,
    attachedPosts,
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
  attachedPosts,
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

      if (newIndex === null || newIndex === undefined) return;

      uploadingItems.push(newIndex);
      unUploadedItems = unUploadedItems.filter((el) => el !== newIndex);
      dispatch(
        uploadRecordPhoto(
          recordId,
          attachedPosts[newIndex],
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
                attachedPosts,
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
      if (isValidServerResponse(response)) {
        dispatch(
          createTransportRequestSuccess(getServerResponseData(response))
        );
      } else if (response.error) {
        dispatch(createTransportRequestFailed(response.error));
      }
    } catch (error) {
      dispatch(createTransportRequestFailed('An error occurred'));
    }
  };
};

export const getAllRecords = (recordData = {}) => {
  return async (dispatch) => {
    try {
      dispatch(getAllRecordsStart());
      const response = await axios.post(
        API_URL + apiRoutes.GET_ALL_RECORDS,
        recordData
      );
      if (isValidServerResponse(response)) {
        let record = getServerResponseData(response);

        dispatch(getAllRecordsSuccess(record));
      } else if (response.error) {
        dispatch(getAllRecordsFailed(response.error));
      }
    } catch (error) {
      console.log('error occurred', error);
      dispatch(getAllRecordsFailed('An error occurred'));
      dispatch(
        showAlert(
          'An error occurred',
          'Cannot get records' + getErrorMessage(error)
        )
      );
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
      if (isValidServerResponse(response)) {
        dispatch(
          getAllRecordsWithMessagesSuccess(getServerResponseData(response))
        );
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
      if (isValidServerResponse(response)) {
        dispatch(getAllMessagesSuccess(getServerResponseData(response)));
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
      if (isValidServerResponse(response)) {
        dispatch(sendMessagesSuccess(getServerResponseData(response)));
      } else if (response.error) {
        dispatch(sendMessagesFailed(response.error));
      }
    } catch (error) {
      dispatch(sendMessagesFailed('An error occurred'));
    }
  };
};
