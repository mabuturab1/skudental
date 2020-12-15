import React, { useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { PostItem } from '../../components';
import Carousel from 'react-native-snap-carousel';
import { routes } from '../../constants/routes';
import { StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { startUploadingData } from '../../store/record/actions';
const PreviewCarouselScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const uploadingDataArr = useSelector(({ record }) => record.uploadingDataArr);
  const windowWidth = Dimensions.get('window').width;
  const { carouselItems = [], recordData = {} } = route.params;
  const updatedCarouselItems = useRef(carouselItems);

  const updateComments = (index, text) => {
    updatedCarouselItems.current[index].additionalComments = text;
  };
  const updateAudio = (index, audioItem) => {
    updatedCarouselItems.current[index].audioItem = audioItem;
  };

  const sendImageData = () => {
    dispatch(
      startUploadingData(
        {
          recordData: recordData,
          attachedItems: updatedCarouselItems.current,
        },
        uploadingDataArr.length
      )
    );
    navigation.dispatch(
      StackActions.replace(routes.PreviewRecord, {
        currentRecordIndex: uploadingDataArr.length,
      })
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <PostItem
        postObj={item}
        itemIndex={index}
        isLastItem={index + 1 === carouselItems.length}
        onAddComments={updateComments}
        onAudioUpdate={updateAudio}
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