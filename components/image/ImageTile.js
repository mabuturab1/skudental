import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
const ImageTile = ({ imageUrl, overlayText, showOverlayText }) => (
  <View style={styles.imageWrapper}>
    <Image
      onError={(error) => console.log('Cannot load image')}
      style={styles.image}
      source={{ uri: imageUrl }}
      // resizeMode={FastImage.resizeMode.contain}
    />
    {overlayText && showOverlayText ? (
      <View style={styles.overlayTextWrapper}>
        <Text style={styles.overlayTextStyles}>{` +${overlayText}`}</Text>
      </View>
    ) : null}
  </View>
);
export default ImageTile;
const singleImageDimension = Dimensions.get('window').width / 3;
const styles = StyleSheet.create({
  imageWrapper: {
    height: singleImageDimension,
    width: singleImageDimension,
    position: 'relative',
  },
  image: {
    height: singleImageDimension - 1,
    width: singleImageDimension - 1,
    zIndex: 10,
  },
  overlayTextWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1000,
  },
  overlayTextStyles: {
    fontSize: 28,
    color: 'white',
  },
});
