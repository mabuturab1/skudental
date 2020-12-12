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

export const removeItemFromUploadingArr = (uploadingArr, index) => {
  let updatedUploadingArr = getNewCopy(uploadingArr);
  if (updatedUploadingArr.length > index) {
    updatedUploadingArr.splice(index, 1);
  }
  return updatedUploadingArr;
};
