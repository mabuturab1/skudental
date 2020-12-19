import { API_URL } from '../../constants/apiRoutes';
import moment from 'moment';
export const getNewCopy = (uploadingData) =>
  uploadingData.map((el) => ({
    ...el,
    attachedPosts: el.attachedPosts.map((item) => ({ ...item })),
  }));
export const getUpdatedUploadingDataObj = (uploadingData, payload) => {
  const newUploadingData = getNewCopy(uploadingData);
  if (newUploadingData.length <= payload.recordIndex) {
    return newUploadingData;
  }
  const currentItem = newUploadingData[payload.recordIndex];
  if (payload.uploadComplete) {
    const serverResult = payload.serverResult || {};
    currentItem.attachedPosts[payload.attachedItemIndex].uploadComplete = true;
    currentItem.attachedPosts[
      payload.attachedItemIndex
    ].recordUpdateFailed = false;
    currentItem.attachedPosts[payload.attachedItemIndex] = {
      ...serverResult,
      ...currentItem.attachedItemIndex[payload.attachedItemIndex],
    };
  }
  if (payload.progress >= 0) {
    currentItem.attachedPosts[payload.attachedItemIndex].progress =
      payload.progress;
    currentItem.attachedPosts[
      payload.attachedItemIndex
    ].recordUpdateFailed = false;
  } else {
    currentItem.attachedPosts[payload.attachedItemIndex].progress = 0;
    currentItem.attachedPosts[
      payload.attachedItemIndex
    ].recordUpdateFailed = true;
  }
  newUploadingData[payload.recordIndex] = currentItem;
  return newUploadingData;
};

export const updateRecordObjInUploadingData = (uploadingData, payload) => {
  const newUploadingData = getNewCopy(uploadingData);
  if (newUploadingData.length <= payload.recordIndex) {
    return newUploadingData;
  }
  const currentItem = newUploadingData[payload.recordIndex];
  currentItem.recordData = payload.record;
  newUploadingData[payload.recordIndex] = currentItem;
  return newUploadingData;
};

export const removeItemFromUploadingArr = (uploadingArr, index) => {
  let updatedUploadingArr = getNewCopy(uploadingArr);
  if (updatedUploadingArr.length > index) {
    updatedUploadingArr.splice(index, 1);
  }
  return updatedUploadingArr;
};
export const removeAttachedPostFromRecordsArrItem = (recordsArr, payload) => {
  let updatedRecordsArr = getNewCopy(recordsArr);
  if (updatedRecordsArr.length > payload.index) {
    if (
      updatedRecordsArr[payload.index].attachedPosts.length >
      payload.attachedItemIndex
    ) {
      updatedRecordsArr[payload.index].attachedPosts.splice(
        payload.attachedItemIndex,
        1
      );
    }
  }
  return updatedRecordsArr;
};

export const addApiUrlInRecordArr = (record) => {
  let updatedRecordArr = [];
  if (record && record.length) {
    record.forEach((el) => {
      updatedRecordArr.push({
        ...el,
        createdAt: el.createdAt
          ? moment(el.createdAt).format('DD/MM/YYYY')
          : undefined,
        attachedPosts: el.attachedPosts?.map((item) => ({
          ...item,
          photo: {
            ...item.photo,
            photoUrl: API_URL + '/' + item.photo.photoUrl,
          },
          compressedPhoto: {
            ...item.compressedPhoto,
            photoUrl: API_URL + '/' + item.compressedPhoto.photoUrl,
          },
          imageUrl:
            API_URL +
            '/' +
            (item.compressedPhoto?.compressedPhotoUrl || item.photo?.photoUrl),
          originalImageUrl: API_URL + '/' + item.photo?.photoUrl,
          audioUrl: item.audioUrl ? API_URL + '/' + item.audioUrl : null,
          audioItem: item.audioUrl
            ? { uri: API_URL + '/' + item.audioUrl }
            : null,
        })),
      });
    });
  }
  return updatedRecordArr;
};
