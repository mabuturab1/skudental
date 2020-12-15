import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PostItem } from '../../components';
const ImagePreviewScreen = ({ route, navigation }) => {
  const { postObj } = route.params;
  console.log('image preview', postObj)
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <PostItem itemIndex={0} postObj={postObj} isEditAllowed={false} />
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
