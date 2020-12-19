import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { routes } from '../../constants/routes';
import ImageTile from './ImageTile';
const ImageTileList = ({
  attachedPosts=[],
  maxImages,
  currentRecordIndex,
  isCurrentReduxRecord=false,
  isServerRecord = true,
  navigation
}) => {
  let imageToBeShown = attachedPosts;
 
  if (maxImages && maxImages < attachedPosts?.length)
    imageToBeShown = imageToBeShown.slice(0, maxImages);
  const lengthDiff = attachedPosts?.length - imageToBeShown?.length;
  const showImagePreview = (postObj,itemIndex, showOverlayText) => {
    if (showOverlayText) {
      navigation.navigate(routes.PreviewRecord, {
        currentRecordIndex,
        isServerRecord,
        isCurrentReduxRecord,
      });
    } else
      navigation.navigate(routes.ImagePreview, {
        postObj,
        currentRecordIndex,
        isServerRecord,
        itemIndex,
        isCurrentReduxRecord,
      });
  };
  return (
    <View style={styles.imageListWrapper}>
      {imageToBeShown.map((el, index) => (
        <TouchableWithoutFeedback
        key={index}
          onPress={() =>
            showImagePreview(el,index, lengthDiff && index + 1 === maxImages)
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
