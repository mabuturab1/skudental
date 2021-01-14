import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UploadPostItem } from '../../components';
import { isSuccessDefault } from '../../constants/UIConstants';
import { proceedForPostDeletion } from '../../store/actions';
const PreviewRecordScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    currentRecordIndex,
    isServerRecord,
    isCurrentReduxRecord,
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
  if (isCurrentReduxRecord) {
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
    if (attachedPosts[itemIndex]._id) {
      Alert.alert(
        'Delete record post',
        'Are you sure you want to delete this post',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
          },
          {
            text: 'Confirm',
            onPress: () => deleteRecordItem(itemIndex),
          },
        ],
        { cancelable: false }
      );
    } else deleteRecordItem(itemIndex);
  };

  const deleteRecordItem = (itemIndex, isSuccess = isSuccessDefault) => {
    dispatch(
      proceedForPostDeletion(
        attachedPosts[itemIndex]._id,
        isCurrentReduxRecord,
        currentRecordIndex,
        itemIndex,
        isServerRecord,
        isSuccess
      )
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <UploadPostItem
        postObj={item}
        itemIndex={index}
        navigation={navigation}
        deleteItem={deleteRecordItem}
        isCurrentReduxRecord={isCurrentReduxRecord}
        isServerRecord={isServerRecord}
        currentRecordIndex={currentRecordIndex}
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
