import { API_URL } from '../../constants/apiRoutes';

export const getNewCopy = (uploadingData) =>
  uploadingData.map((el) => ({
    ...el,
    attachedItems: el.attachedItems.map((item) => ({ ...item })),
  }));
export const getUpdatedUploadingDataObj = (uploadingData, payload) => {
  console.log('payload update for progress', payload);
  const newUploadingData = getNewCopy(uploadingData);
  if (newUploadingData.length <= payload.recordIndex) {
    return newUploadingData;
  }
  const currentItem = newUploadingData[payload.recordIndex];
  if (payload.uploadComplete) {
    currentItem.attachedItems[payload.attachedItemIndex].uploadComplete = true;
  }
  if (payload.progress >= 0) {
    currentItem.attachedItems[payload.attachedItemIndex].progress =
      payload.progress;
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
  console.log('payload update for progress', payload);
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
          ? moment(el.createdAt).format('dd MM YYY')
          : undefined,
        attachedPosts: el.attachedPosts?.map((item) => ({
          ...item,
          imageUrl: API_URL + '/' + item.photoUrl,
          audioUrl: item.audioUrl ? API_URL + '/' + item.audioUrl : null,
        })),
      });
    });
  }
  return updatedRecordArr;
};
