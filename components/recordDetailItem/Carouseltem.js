import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
const fullWidth = Dimensions.get('window').width;
const CarouselItem = ({ postObj }) => {
  const getNewHeight = (width, tempHeight) => {
    if (!width || !tempHeight) return tempHeight;
    return tempHeight * (fullWidth / width);
  };
  const [height, setHeight] = useState(
    getNewHeight(
      postObj?.compressedPhoto?.dimensions?.width,
      postObj?.compressedPhoto?.dimensions?.height
    )
  );
  const imageUrl = postObj.compressedPhoto?.photoUrl;
  useEffect(() => {
    if (height !== null) return;
    Image.getSize(imageUrl, (width, height) => {
      const newHeight = height * (fullWidth / width);
      setHeight(newHeight);
    });
  }, [height, imageUrl]);
  return (
    <View style={styles.imageWrapper}>
      <Image
        onError={(error) => console.log('Cannot load image')}
        style={{ ...styles.image, height }}
        source={{ uri: imageUrl }}
        // resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default CarouselItem;

const imageHeight = 500;
const styles = StyleSheet.create({
  imageWrapper: {
    width: fullWidth,
    position: 'relative',
  },
  image: {
    width: fullWidth,
    zIndex: 10,
  },
});
