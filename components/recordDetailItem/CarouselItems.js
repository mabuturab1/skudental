import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { routes } from '../../constants/routes';
import CarouselItem from './Carouseltem';
const CarouselItems = ({ route, navigation, carouselItems = [] }) => {
  const windowWidth = Dimensions.get('window').width;

  const showImagePreview = (postObj) => {
    navigation.navigate(routes.ImagePreview, {
      postObj,
    });
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => showImagePreview(item)}
      >
        <View>
          <CarouselItem postObj={item} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const carouselRef = useRef();
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.carouselWrapper}>
        <Carousel
          layout={'default'}
          ref={carouselRef}
          data={carouselItems}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};
export default CarouselItems;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    backgroundColor: 'white',
  },
  carouselWrapper: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
});
