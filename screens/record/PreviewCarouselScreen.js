import React, { useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { ImageItem } from '../../components';
import Carousel from 'react-native-snap-carousel';
import { routes } from '../../constants/routes';
const PreviewCarouselScreen = ({ route, recordData={}, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { carouselItems = [] } = route.params;
  const comments = useRef({});
  const windowWidth = Dimensions.get('window').width;
  const onAddComments = (item, text) => {
    comments.current[item] = text;
    console.log('text is', text);
  };
  const sendImageData=()=>{
    navigation.navigate(routes.SaveRecord, {
      recordData: { ...recordData, additionalComments: comments.current },
      images: carouselItems,
    });
  }
  const renderItem = ({ item, index }) => {
   
    return (
      <ImageItem
        item={item}
        index={index}
        initTextValue={comments.current[item]||''}
        isLastItem={index + 1 === carouselItems.length}
        onAddComments={onAddComments}
        sendImageData={sendImageData}
      />
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
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
};
export default PreviewCarouselScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: 'black',
   
  },
  carouselWrapper: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
});
