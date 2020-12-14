import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
const ImageTile = ({ path, overlayText, showOverlayText }) => (
  <View style={styles.imageWrapper}>
    <Image style={styles.image} source={{ uri: path }} />
    <View style={styles.overlayTextWrapper}>
      {overlayText && showOverlayText ? (
        <Text style={styles.countText}>{` +${overlayText}`}</Text>
      ) : null}
    </View>
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
    height: singleImageDimension,
    width: singleImageDimension,
  },
  overlayTextWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  overlayTextStyles: {
    fontSize: 18,
    color: 'white',
  },
});
