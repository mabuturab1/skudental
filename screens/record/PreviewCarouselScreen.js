import React, { useEffect, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { PostItem } from '../../components';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import {
  proceedForPostDeletion,
  updateCurrentRecord,
} from '../../store/record/actions';
import { getArrayCopy } from '../../helpers/Utils';
const PreviewCarouselScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  const { attachedPosts = [], recordData = {} } = useSelector(
    ({ record }) => record.currentRecord
  );
  const updatedAttachedPosts = useRef(getArrayCopy(attachedPosts));
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
    console.log(
      'updated attached posts length',
      updatedAttachedPosts.current.length
    );
    dispatch(
      proceedForPostDeletion(
        item._id,
        true,
        null,
        index,
        false,
        (isSuccess) => {
          if (isSuccess) {
            updatedAttachedPosts.current.splice(index, 1);
          }
        }
      )
    );
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
  console.log('attached posts are', attachedPosts);
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.carouselWrapper}>
        <Carousel
          layout={'default'}
          ref={carouselRef}
          data={updatedAttachedPosts.current}
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
