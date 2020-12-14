import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PostItem } from '../../components';
const ImagePreviewScreen = ({ route, navigation }) => {
  const { imageObj } = route.params;
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <PostItem itemIndex={0} imageObj={imageObj} textEditable={false} />
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
