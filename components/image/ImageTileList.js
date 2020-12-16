import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { routes } from '../../constants/routes';
import ImageTile from './ImageTile';
const ImageTileList = ({
  attachedPosts=[],
  maxImages,
  currentRecordIndex,
  isServerRecord = true,
  navigation
}) => {
  let imageToBeShown = attachedPosts;
 
  if (maxImages && maxImages < attachedPosts?.length)
    imageToBeShown = imageToBeShown.slice(0, maxImages);
  const lengthDiff = attachedPosts?.length - imageToBeShown?.length;
  const showImagePreview = (postObj, showOverlayText) => {
    if (showOverlayText) {
      navigation.navigate(routes.PreviewRecord, {
        currentRecordIndex,
        isServerRecord,
      });
    } else
      navigation.navigate(routes.ImagePreview, {
        postObj,
      });
  };
  return (
    <View style={styles.imageListWrapper}>
      {imageToBeShown.map((el, index) => (
        <TouchableWithoutFeedback
        key={index}
          onPress={() =>
            showImagePreview(el, lengthDiff && index + 1 === maxImages)
          }
        >
          <View  style={styles.imageTile}>
            <ImageTile
              imageUrl={el.imageUrl}
              overlayText={lengthDiff}
              showOverlayText={lengthDiff && index + 1 === maxImages}
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};
export default ImageTileList;
const styles = StyleSheet.create({
  imageListWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  countText: {
    fontSize: 18,
  },
});
