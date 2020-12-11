import React, { useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { UploadImageItem} from '../../components';
import Carousel from 'react-native-snap-carousel';
import { routes } from '../../constants/routes';
const SaveRecordScreen = ({ route, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { images = [], recordData = {} } = route.params;
  const comments = useRef(recordData?.additionalComments||{});
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const onAddComments = (item, text) => {
    comments.current[item] = text;
    console.log('text is', text);
  };
  const sendImageData = () => {
   
  };
  const renderItem = ({ item, index }) => {
    return (
      <UploadImageItem
        item={item}
        index={index}
        initTextValue={comments.current[index] || ''}
        isLastItem={index + 1 === images.length}
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
          data={images}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          sliderHeight={windowHeight}
          itemHeight={windowHeight-100}
          renderItem={renderItem}
          vertical={true}
          inactiveSlideScale={1}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
};
export default SaveRecordScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#e5e5ea',
  },
  carouselWrapper: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
});