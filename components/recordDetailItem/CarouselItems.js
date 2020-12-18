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
const CarouselItems = ({
  route,
  navigation,
  carouselItems = [],
  onSnapToItem,
}) => {
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
        <View style={{ justifyContent: 'center' }}>
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
          onSnapToItem={onSnapToItem}
          slideStyle={{ flexDirection: 'column', justifyContent: 'center' }}
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
  carouselWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center'
  },
});
