import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { routes } from '../../constants/routes';
import ImageTile from './ImageTile';
const ImageTileList = ({
  imageList,
  maxImages,
  currentRecordIndex,
  isServerRecord=true,
}) => {
  let imageToBeShown = imageList;
  if (maxImages && maxImages < imageList?.length)
    imageToBeShown = imageToBeShown.slice(0, maxImages);
  const lengthDiff = imageList?.length - imageToBeShown?.length;
  const showImagePreview = (imageObj, showOverlayText) => {
    if (showOverlayText) {
      navigation.navigate(routes.PreviewRecord, {
        currentRecordIndex,
        isServerRecord,
      });
    } else
      navigation.navigate(routes.ImagePreview, {
        imageObj,
      });
  };
  return (
    <View style={styles.imageListWrapper}>
      {imageToBeShown.map((el, index) => (
        <View key={index} style={styles.imageTile}>
          <TouchableWithoutFeedback
            onPress={() =>
              showImagePreview(el, lengthDiff && index + 1 === maxImages)
            }
          >
            <ImageTile
              path={el.path}
              overlayText={lengthDiff}
              showOverlayText={lengthDiff && index + 1 === maxImages}
            />
          </TouchableWithoutFeedback>
        </View>
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
  imageTile: {
    marginHorizontal: 3,
  },
  countText: {
    fontSize: 18,
  },
});
