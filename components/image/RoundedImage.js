import React from 'react';
import { View,  StyleSheet } from 'react-native';
import Image from 'react-native-fast-image'
const RoundedImage = ({imageUrl}) => (
  <View style={styles.imageWrapper}>
    <Image style={styles.image} source={{ uri: imageUrl }} />
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
