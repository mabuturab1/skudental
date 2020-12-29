import React, { useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { PostItem } from '../../components';
import Carousel from 'react-native-snap-carousel';

const UserSingleRecordPreviewScreen = ({ route, navigation }) => {
  const { record = {} } = route.params;
  const windowWidth = Dimensions.get('window').width;
  const { attachedPosts = [] } = record;

  const renderItem = ({ item, index }) => {
    return (
      <PostItem
        postObj={item}
        itemIndex={index}
        isLastItem={index + 1 === attachedPosts.length}
        isPreviewOnly={true}
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
          data={attachedPosts}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};
export default UserSingleRecordPreviewScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
  carouselWrapper: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
});
