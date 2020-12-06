import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const RoundedImage = ({path}) => (
  <View style={styles.imageWrapper}>
    <Image style={styles.image} source={{ uri: path }} />
  </View>
);
export default RoundedImage;
const styles = StyleSheet.create({
  imageWrapper: {
    
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
