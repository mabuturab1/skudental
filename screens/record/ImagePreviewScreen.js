import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { PostItem } from '../../components';
import { isValidValue } from '../../helpers/Utils';
import {
  proceedForPostDeletion,
  proceedForPostUpdate,
} from '../../store/actions';
const ImagePreviewScreen = ({ route, navigation }) => {
  const {
    postObj,
    currentRecordIndex,
    itemIndex,
    isCurrentReduxRecord,
    isServerRecord,
  } = route.params;
  const dispatch = useDispatch();
  const postItemObj = useRef(postObj);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isUploadComplete, setIsUploadComplete] = useState(true);
  const deletePost = () => {
    dispatch(
      proceedForPostDeletion(
        postObj._id,
        isCurrentReduxRecord,
        currentRecordIndex,
        itemIndex,
        isServerRecord,
        (isSuccess) => {
          if (isSuccess) navigation.goBack();
        }
      )
    );
  };
  const updateComments = (index, text) => {
    postItemObj.current.additionalComments = text;
  };
  const updateAudio = (index, audioItem) => {
    postItemObj.current.updateAudioItem = true;
    postItemObj.current.audioItem = audioItem;
  };
  const uploadProgressUpdate = (
    percentCompleted,
    uploadSuccessful,
    updatedRecord
  ) => {
    setUploadProgress(percentCompleted);
    if (isValidValue(uploadSuccessful)) updateSuccessfull(uploadSuccessful);
  };
  const updateSuccessfull = (isSuccess) => {
    if (isSuccess) {
      setUploadProgress(100);
      setIsUploadComplete(true);
    } else {
      setUploadProgress(-1);
      setIsUploadComplete(false);
    }
  };
  const onSavePost = () => {
    setIsUploadComplete(false);
    setUploadProgress(0);
    dispatch(
      proceedForPostUpdate(
        postObj._id,
        postItemObj.current,
        isCurrentReduxRecord,
        currentRecordIndex,
        itemIndex,
        isServerRecord,
        uploadProgressUpdate,
        updateSuccessfull
      )
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <PostItem
        itemIndex={0}
        postObj={{
          ...postObj,
          imageUrl: postObj.originalImageUrl || postObj.imageUrl,
        }}
        onAddComments={updateComments}
        onAudioUpdate={updateAudio}
        onDelete={deletePost}
        isEditAllowed={false}
        onSavePost={onSavePost}
        uploadProgress={uploadProgress}
        isUploadComplete={isUploadComplete}
        isCurrentReduxRecord={isCurrentReduxRecord}
      />
    </SafeAreaView>
  );
};
export default ImagePreviewScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
});
