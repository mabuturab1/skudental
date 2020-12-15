import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RounedImage from './RoundedImage';
const RoundedImageList = ({ imageList, maxImages }) => {
  let imageToBeShown = imageList;
  if (maxImages && maxImages < imageList?.length)
    imageToBeShown = imageToBeShown.slice(0, maxImages);
  const lengthDiff = imageList?.length - imageToBeShown?.length;
  return (
    <View style={styles.imageListWrapper}>
      {imageToBeShown.map((el, index) => (
        <View key={index} style={styles.imageTile}>
          <RounedImage imageUrl={el.path} />
        </View>
      ))}
      {lengthDiff ? (
        <Text style={styles.countText}>{` +${lengthDiff}`}</Text>
      ) : null}
    </View>
  );
};
export default RoundedImageList;
const styles = StyleSheet.create({
  imageListWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageTile: {
    marginHorizontal: 3,
  },
  countText: {
    fontSize: 18,
  },
});
