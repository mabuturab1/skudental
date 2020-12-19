import { StackActions } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { PostItem } from '../../components';
import { routes } from '../../constants/routes';
import { proceedForPostDeletion } from '../../store/actions';
const ImagePreviewScreen = ({ route, navigation }) => {
  const {
    postObj,
    currentRecordIndex,
    itemIndex,
    isCurrentReduxRecord,
    isServerRecord,
  } = route.params;
  const dispatch = useDispatch();
  const deletePost = () => {
    console.log(
      postObj._id,
      isCurrentReduxRecord,
      currentRecordIndex,
      itemIndex,
      isServerRecord
    );
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
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <PostItem
        itemIndex={0}
        postObj={{
          ...postObj,
          imageUrl: postObj.originalImageUrl || postObj.imageUrl,
        }}
        onDelete={deletePost}
        isEditAllowed={false}
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
