import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import LoadingIndicator from '../loader/LoadingIndicator';
const fullWidth = Dimensions.get('window').width;
const CarouselItem = ({ postObj, heightReceived }) => {
  const getEstimatedHeight = (resizedWidth, originalDimesions) => {
    if (!resizedWidth || !originalDimesions) return null;
    if (!originalDimesions.width || !originalDimesions.height) return null;
    const estimatedHeight =
      resizedWidth * (originalDimesions.height / originalDimesions.width);
    const newHeight = estimatedHeight * (fullWidth / resizedWidth);
    return newHeight;
  };
  const [height, setHeight] = useState(
    getEstimatedHeight(
      postObj?.compressedPhoto?.dimensions?.width,
      postObj?.photo?.dimensions
    )
  );
  const [loading, setLoading] = useState(false);
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
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={{ ...styles.image, height: height || 300 }}
        source={{ uri: imageUrl }}
        // resizeMode={FastImage.resizeMode.contain}
      />
      {loading ? <LoadingIndicator /> : null}
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
