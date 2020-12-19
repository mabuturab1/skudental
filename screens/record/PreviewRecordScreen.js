import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UploadPostItem } from '../../components';
import { updateCurrentRecord } from '../../store/actions';
const PreviewRecordScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    currentRecordIndex,
    isServerRecord,
    showCurrentReduxRecord,
    editMode,
  } = route.params;
  const {
    uploadingDataArr = [],
    serverRecordsArr = [],
    currentRecord,
  } = useSelector(({ record }) => ({
    uploadingDataArr: record.uploadingDataArr,
    serverRecordsArr: record.serverRecordsArr,
    currentRecord: record.currentRecord,
  }));
  let attachedPosts = [];
  if (showCurrentReduxRecord) {
    attachedPosts = currentRecord.attachedPosts || [];
  } else if (
    uploadingDataArr?.length >= currentRecordIndex + 1 &&
    !isServerRecord
  ) {
    attachedPosts = uploadingDataArr[currentRecordIndex].attachedPosts;
  } else if (
    serverRecordsArr?.length >= currentRecordIndex + 1 &&
    isServerRecord
  ) {
    attachedPosts = serverRecordsArr[currentRecordIndex].attachedPosts;
  }
  const carouselItemsList = attachedPosts.map((el, index) => ({
    id: index.toString(),
    ...el,
  }));
  const deleteRecord = (itemIndex) => {
    if (showCurrentReduxRecord) {
      attachedPosts = attachedPosts.map((el) => ({ ...el }));
      attachedPosts.splice(index, 1);
      dispatch(updateCurrentRecord({ attachedPosts }));
    } else if (attachedPost[itemIndex]._id && !isServerRecord) {
      console.log(
        'deleting server record',
        isServerRecord,
        attachedPosts[itemIndex]._id
      );
      dispatch(deleteRecordPost(attachedPost[itemIndex]._id), (isSuccess) => {
        if (isSuccess) {
          clearUploadingRecordPost({
            index: currentRecordIndex,
            attachedItemIndex: itemIndex,
          });
        }
      });
    } else if (attachedPost[itemIndex]._id && isServerRecord) {
      console.log(
        'deleting server record',
        isServerRecord,
        attachedPosts[itemIndex]._id
      );
      dispatch(deleteRecordPost(attachedPost[itemIndex]._id), (isSuccess) => {
        if (isSuccess) {
          clearUploadingRecordPost({
            index: currentRecordIndex,
            attachedItemIndex: itemIndex,
            isServerRecord: true,
          });
        }
      });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <UploadPostItem
        currentRecordIndex={currentRecordIndex}
        postObj={item}
        itemIndex={index}
        navigation={navigation}
        deleteItem={deleteRecord}
      />
    );
  };
  const carouselRef = useRef();

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <FlatList
        data={carouselItemsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
export default PreviewRecordScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#e5e5ea',
  },

  carouselWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
