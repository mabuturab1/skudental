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
      ...currentItem.attachedPosts[payload.attachedItemIndex],
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

export const updatePostObjInRecordsArr = (uploadingData, payload) => {
  const newUploadingData = getNewCopy(uploadingData);
  if (newUploadingData.length <= payload.currentRecordIndex) {
    return newUploadingData;
  }
  let attachedPosts = newUploadingData[payload.itemIndex].attachedPosts;
  if (attachedPosts.length <= payload.itemIndex) return newUploadingData;
  attachedPosts[payload.itemIndex] = getTransformedPost(payload.updatedPostObj);
  console.log('updated post is', attachedPosts[payload.itemIndex]);
  newUploadingData[payload.itemIndex].attachedPosts = attachedPosts;
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
const getTransformedPost = (item) => ({
  ...item,
  photo: {
    ...item.photo,
    photoUrl: processImageUrl(API_URL + '/', item.photo.photoUrl),
  },
  compressedPhoto: {
    ...item.compressedPhoto,
    photoUrl: processImageUrl(API_URL + '/', item.compressedPhoto.photoUrl),
  },
  imageUrl: item.compressedPhoto?.compressedPhotoUrl
    ? processImageUrl(API_URL + '/', item.compressedPhoto?.compressedPhotoUrl)
    : processImageUrl(API_URL + '/', item.photo?.photoUrl),
  originalImageUrl: processImageUrl(API_URL + '/' , item.photo?.photoUrl),
  audioUrl: item.audioUrl
    ? processImageUrl(API_URL + '/', item.audioUrl)
    : null,
  audioItem: item.audioUrl
    ? { uri: processImageUrl(API_URL + '/', item.audioUrl) }
    : null,
});
const getTransformedRecord = (serverPost) => {
  return {
    ...serverPost,
    recordOwner: {
      ...serverPost.recordOwner,
      profileImageUrl: serverPost.recordOwner?.profileImageUrl
        ? processImageUrl(
            API_URL + '/' , serverPost?.recordOwner?.profileImageUrl
          )
        : undefined,
    },
    createdAt: serverPost.createdAt
      ? moment(serverPost.createdAt).format('DD/MM/YYYY')
      : undefined,
    attachedPosts: serverPost.attachedPosts?.map((item) =>
      getTransformedPost(item)
    ),
  };
};
const processImageUrl = (path, url) => {
  return path + url.replace(/^\/+/g, '');
};
export const addApiUrlInRecordArr = (record) => {
  let updatedRecordArr = [];
  if (record && record.length) {
    record.forEach((el) => {
      updatedRecordArr.push(getTransformedRecord(el));
    });
  }
  return updatedRecordArr;
};
