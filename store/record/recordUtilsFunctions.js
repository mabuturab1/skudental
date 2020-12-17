import { API_URL } from '../../constants/apiRoutes';
import moment from 'moment';
export const getNewCopy = (uploadingData) =>
  uploadingData.map((el) => ({
    ...el,
    attachedItems: el.attachedItems.map((item) => ({ ...item })),
  }));
export const getUpdatedUploadingDataObj = (uploadingData, payload) => {
  const newUploadingData = getNewCopy(uploadingData);
  if (newUploadingData.length <= payload.recordIndex) {
    return newUploadingData;
  }
  const currentItem = newUploadingData[payload.recordIndex];
  if (payload.uploadComplete) {
    currentItem.attachedItems[payload.attachedItemIndex].uploadComplete = true;
    currentItem.attachedItems[
      payload.attachedItemIndex
    ].recordUpdateFailed = false;
  }
  if (payload.progress >= 0) {
    currentItem.attachedItems[payload.attachedItemIndex].progress =
      payload.progress;
    currentItem.attachedItems[
      payload.attachedItemIndex
    ].recordUpdateFailed = false;
  } else {
    currentItem.attachedItems[payload.attachedItemIndex].progress = 0;
    currentItem.attachedItems[
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
