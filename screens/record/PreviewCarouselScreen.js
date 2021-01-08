import React, { useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { PostItem } from '../../components';
import Carousel from 'react-native-snap-carousel';
import { routes } from '../../constants/routes';
import { StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  proceedForPostDeletion,
  startUploadingData,
  updateCurrentRecord,
} from '../../store/record/actions';
const PreviewCarouselScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  const { attachedPosts = [], recordData = {} } = useSelector(
    ({ record }) => record.currentRecord
  );
  const updatedAttachedPosts = useRef(attachedPosts);

  const updateComments = (index, text) => {
    updatedAttachedPosts.current[index].additionalComments = text;
  };
  const updateAudio = (index, audioItem) => {
    updatedAttachedPosts.current[index].audioItem = audioItem;
  };

  const sendImageData = () => {
    dispatch(
      updateCurrentRecord({
        recordData,
        attachedPosts: updatedAttachedPosts.current,
      })
    );
    navigation.goBack();
  };
  const deletePost = (item, index) => {
    updatedAttachedPosts.current.splice(index, 1);
    dispatch(proceedForPostDeletion(item._id, true, null, index, false));
  };

  const renderItem = ({ item, index }) => {
    return (
      <PostItem
        postObj={item}
        itemIndex={index}
        isLastItem={index + 1 === attachedPosts.length}
        onAddComments={updateComments}
        onAudioUpdate={updateAudio}
        sendImageData={sendImageData}
        onDelete={() => deletePost(item, index)}
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
export default PreviewCarouselScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
  carouselWrapper: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
});
