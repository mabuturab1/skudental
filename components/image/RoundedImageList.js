import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RounedImage from './RoundedImage';
const RoundedImageList = ({ imageList, maxImages }) => {
  let imageToBeShown = imageList;
  if (maxImages && maxImages < imageList?.length)
    imageToBeShown = imageToBeShown.slice(0, maxImages);
  const lengthDiff = imageList?.length - imageToBeShown?.length;
  imageToBeShown?.forEach((el) => console.log('uri is', el.path));
  return (
    <View style={styles.imageListWrapper}>
      {imageToBeShown.map((el) => (
        <View style={styles.imageTile}>
          <RounedImage path={el.path} />
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
